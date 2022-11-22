import axios from 'axios';
import { BaseService } from '~/services/BaseService';
import { Web3Service } from '~/services/Web3Service';
import { authModule } from '~/utils/storeAccessor';

const metaDataAxios = axios.create();
metaDataAxios.defaults.baseURL =
  'https://xcp9so0072.execute-api.us-east-1.amazonaws.com';

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

export class MetadataService extends BaseService {
  protected apiV2 = (() => {
    const _axios = axios.create();
    _axios.defaults.baseURL =
      'https://xcp9so0072.execute-api.us-east-1.amazonaws.com';
    return _axios;
  })();

  protected apiV1 = (() => {
    const _axios = axios.create();
    _axios.defaults.baseURL =
      'https://ws8rh1blld.execute-api.us-east-1.amazonaws.com/dev';
    return _axios;
  })();

  getUserSignature = async () => {
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
              console.error(error);
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

  uploadFileToIPFS = async (
    file: File,
    isEncrypted: boolean,
  ): Promise<string> => {
    const formData = new FormData();
    formData.set('file', file);

    const response = await this.apiV1.post('uploadIpfsObject', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        encrypted: JSON.stringify(isEncrypted),
      },
    });

    return response.data as string;
  };

  // for now works only with images
  decryptIpfsFile = async (postId: string): Promise<string> => {
    const signature = await this.getUserSignature();

    return new Promise((resolve, reject) =>
      this.apiV2
        .get('decryptIpfsObject', {
          params: {
            postId,
            signature,
          },
          responseType: 'blob',
        })
        .then((response) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);

          reader.readAsDataURL(response.data as Blob);
        })
        .catch(reject),
    );
  };
}
