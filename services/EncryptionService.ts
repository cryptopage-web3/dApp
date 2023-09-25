import axios from 'axios';
import { ENCRYPTION_SERVICE_URL, DECRYPTION_SERVICE_URL } from '~/constants';
import { Web3Service } from '~/services/Web3Service';
import { EAttachmentType, INftAttachment } from '~/types';
import { IAttributesServer, IPublishNFTParams } from '~/types/nft-form';
import { authModule } from '~/utils/storeAccessor';

export class EncryptionService {
  axios = axios.create({
    baseURL: ENCRYPTION_SERVICE_URL,
    withCredentials: false,
  });

  getUserSignature = (() => {
    let userWeb3SignatureResolver: (value: string) => void;
    let userWeb3SignatureRejecter: (reason?: any) => void;

    let userWeb3SignatureRequested = false;

    let userWeb3SignaturePromise: Promise<string>;

    const reinitializeSignaturePromise = () => {
      userWeb3SignaturePromise = new Promise((resolve, reject) => {
        userWeb3SignatureResolver = resolve;
        userWeb3SignatureRejecter = reject;
      });
    };

    reinitializeSignaturePromise();

    return async () => {
      if (!userWeb3SignatureRequested) {
        userWeb3SignatureRequested = true;
        await new Promise<string>((resolve, reject) => {
          const web3Service = new Web3Service(authModule.provider);

          // do not change message content (it should match message value in lambda)
          const message = 'View encoded post';
          const account = authModule.address;

          web3Service.web3.eth.personal.sign(
            message,
            account,
            'password',
            (error, signature) => {
              if (error) {
                reject(error);
                userWeb3SignatureRequested = false;
                userWeb3SignatureRejecter(error);
                reinitializeSignaturePromise();
              } else {
                resolve(signature);
                userWeb3SignatureResolver(signature);
              }
            },
          );
        });
      }

      return userWeb3SignaturePromise;
    };
  })();

  async uploadNft({
    file,
    isEncrypted,
    name,
    description,
    unlockableDescription,
    externalUrl,
    attributes,
  }: {
    file: File | null;
    isEncrypted: boolean;
    name: string;
    description?: string;
    unlockableDescription?: string;
    externalUrl?: string;
    attributes?: IAttributesServer[];
  }) {
    const params: IPublishNFTParams = {
      metadata: {
        name,
        description,
        external_url: externalUrl,
        attributes,
      },
      encrypt: isEncrypted,
    };

    /** загружаем файл */
    if (file) {
      const fileType = file.type.split('/')[0];
      const type =
        fileType === 'video'
          ? 'Video'
          : fileType === 'audio'
          ? 'Audio'
          : 'Image';

      const {
        data: { url: signedUrl, fileId },
      } = await this.axios.get('/upload/get_signed_url', {
        params: {
          content_type: file.type,
        },
      });

      await axios.put(signedUrl, file, {
        headers: { 'Content-Type': file.type },
      });

      params.attachments = [{ type, fileId }];
    }

    /** добавляем зашифрованный текст */
    if (isEncrypted) {
      if (params.metadata.description) {
        const description = params.metadata.description;
        params.attachments = [
          ...(params.attachments || []),
          { type: 'Text', textContent: description },
        ];
      }

      params.metadata.description = unlockableDescription;
    }

    /** загружаем мета-данные */
    const {
      data: { id: nftHash },
    } = await this.axios.post('/upload/publish_nft', params);

    return nftHash;
  }

  async getDecryptedNft(postId: string, attachments?: INftAttachment[]) {
    const signature = await this.getUserSignature();
    const getUrl = (attachmentId: string) =>
      DECRYPTION_SERVICE_URL +
      `decrypt?postId=${postId}&signature=${signature}&attachmentId=${attachmentId}`;

    const result = {
      text: '',
      image: '',
    };

    const encryptedImage = (attachments || []).find(
      ({ type }) => type === EAttachmentType.encryptedImage,
    );
    const encryptedText = (attachments || []).find(
      ({ type }) => type === EAttachmentType.encryptedText,
    );

    if (encryptedImage) {
      result.image = getUrl(encryptedImage.id);
    }

    if (encryptedText) {
      const { data } = await this.axios.get(getUrl(encryptedText.id));
      result.text = data;
    }

    return result;
  }
}
