import axios from 'axios';
import { ENCRYPTION_SERVICE_URL } from '~/constants';
import { Web3Service } from '~/services/Web3Service';
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
    // unlockableDescription,
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

    if (file) {
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

      params.attachments = [{ type: 'Image', fileId }];
    } else {
      params.attachments = [{ type: 'Text', textContent: name }];
    }

    const {
      data: { id: nftHash },
    } = await this.axios.post('/upload/publish_nft', params);

    return nftHash;
  }

  async getDecryptedNftImage(postId: string) {
    const signature = await this.getUserSignature();

    return (
      this.axios.defaults.baseURL +
      `decrypt?postId=${postId}&signature=${signature}`
    );
  }
}
