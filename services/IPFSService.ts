import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { INFTCreateParams } from '~/types/nft-form';

export class IPFSService {
  api!: IPFSHTTPClient;

  constructor() {
    this.init();
  }

  init = async () => {
    this.api = await create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
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
}
