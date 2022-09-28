import Web3 from 'web3';
import { IWriteCommentParams } from '~/types/comment-form';
import { IBurnPostParams, IWritePostParams } from '~/types/nft-form';

export class Web3Service {
  web3!: Web3;

  constructor(provider: any = null) {
    this.web3 = new Web3(provider || Web3.givenProvider);
  }

  public writePost = async ({ params, callbacks }: IWritePostParams) => {
    try {
      const {
        authChainSlug,
        authAddress,
        ownerAddress,
        communityId,
        ipfsHash,
      } = params;

      const CONTRACT = await import(
        `../contracts/${authChainSlug}/proxy_community.json`
      );

      const contract = new this.web3.eth.Contract(
        CONTRACT.abi,
        CONTRACT.address,
      );

      contract.methods
        .writePost(communityId, ipfsHash, ownerAddress)
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

  public writeComment = async ({ params, callbacks }: IWriteCommentParams) => {
    try {
      const { authAddress, authChainSlug, nftTokenId, ipfsHash, isUp, isDown } =
        params;

      const CONTRACT = await import(
        `../contracts/${authChainSlug}/proxy_community.json`
      );

      const contract = new this.web3.eth.Contract(
        CONTRACT.abi,
        CONTRACT.address,
      );

      contract.methods
        .writeComment(nftTokenId, ipfsHash, isUp, isDown, authAddress)
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

  public burnPost = async ({ params, callbacks }: IBurnPostParams) => {
    try {
      const { authAddress, authChainSlug, nftTokenId } = params;

      const CONTRACT = await import(
        `../contracts/${authChainSlug}/proxy_community.json`
      );

      const contract = new this.web3.eth.Contract(
        CONTRACT.abi,
        CONTRACT.address,
      );

      contract.methods
        .burnPost(nftTokenId)
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
