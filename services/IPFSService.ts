import all from 'it-all';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { IPFS_INFURA_PROJECT_ID, IPFS_INFURA_SECRET_KEY } from '~/constants';
import { INFTCreateParams } from '~/types/nft-form';

export class IPFSService {
  api!: IPFSHTTPClient;

  constructor() {
    this.init();
  }

  init = async () => {
    const auth =
      'Basic ' +
      Buffer.from(
        IPFS_INFURA_PROJECT_ID + ':' + IPFS_INFURA_SECRET_KEY,
      ).toString('base64');

    this.api = await create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });
  };

  saveFile = async (file: File): Promise<string> => {
    const data = await this.api.add(file);
    await this.api.pin.add(data.path);
    return data.path;
  };

  saveNFT = async (nft: INFTCreateParams): Promise<string> => {
    const data = await this.api.add(JSON.stringify(nft));
    await this.api.pin.add(data.path);
    return data.path;
  };

  saveComment = async (text: string): Promise<string> => {
    const data = await this.api.add(text);
    await this.api.pin.add(data.path);
    return data.path;
  };

  getComment = async (ipfsHash: string): Promise<string> => {
    const response = uint8ArrayConcat(await all(this.api.cat(ipfsHash)));
    const text = uint8ArrayToString(response);

    return text;
  };
}
