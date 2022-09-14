import Web3 from 'web3';
import { IWritePostParams } from '~/types/nft-form';

export class Web3Service {
  web3!: Web3;

  constructor(provider: any = null) {
    this.web3 = new Web3(provider || Web3.givenProvider);
  }

  public writePost = async ({ params, callbacks }: IWritePostParams) => {
    try {
      const { authChainSlug, authAddress, communityId, ipfsHash } = params;

      const CONTRACT = await import(
        `../contracts/${authChainSlug}/proxy_community.json`
      );

      const contract = new this.web3.eth.Contract(
        CONTRACT.abi,
        CONTRACT.address,
      );

      contract.methods
        .writePost(communityId, ipfsHash, authAddress)
        .send({
          from: authAddress,
        })
        .on('transactionHash', callbacks.onTransactionHash)
        .on('receipt', callbacks.onReceipt)
        .on('error', callbacks.onError);
    } catch {
      callbacks.onError();
    }
  };
}
