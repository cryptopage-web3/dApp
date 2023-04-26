import Web3 from 'web3';
import { IWriteCommentParams } from '~/types/comment-form';
import { IBurnPostParams, IWritePostParams } from '~/types/nft-form';
import { alertModule, authModule } from '~/utils/storeAccessor';

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
        isEncrypted,
        accessPrice,
        accessDuration,
      } = params;

      const CONTRACT = await import(
        `../contracts/${authChainSlug}/executor.json`
      );

      const contract = new this.web3.eth.Contract(
        CONTRACT.abi,
        CONTRACT.address,
      );

      contract.methods
        .writePost(
          communityId,
          ipfsHash,
          ownerAddress,
          isEncrypted,
          accessPrice.toString(),
          accessDuration,
        )
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
        `../contracts/${authChainSlug}/executor.json`
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
        `../contracts/${authChainSlug}/executor.json`
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

  public checkIfHaveAccessToEncryptedPost = async (
    postId: string,
    authChainSlug: string,
  ) => {
    const CONTRACT = await import(
      `../contracts/${authChainSlug}/executor.json`
    );

    const contract = new this.web3.eth.Contract(CONTRACT.abi, CONTRACT.address);

    return await contract.methods
      .hasAccessToPost(parseInt(postId), authModule.address)
      .call();
  };

  public buyPostAccess = async (
    authAddress: string,
    postId: string,
    authChainSlug: string,
  ): Promise<void> => {
    const CONTRACT = await import(
      `../contracts/${authChainSlug}/executor.json`
    );

    const contract = new this.web3.eth.Contract(CONTRACT.abi, CONTRACT.address);

    return await new Promise((resolve, reject) => {
      contract.methods
        .buyPostAccess(postId)
        .send({
          from: authAddress,
        })
        .on('transactionHash', (hash: string) => {
          alertModule.info(`${hash}: Transaction on pending`);
        })
        .on('receipt', (receipt: any) => {
          console.log('receipt', receipt);
          alertModule.success('Transaction completed');
          resolve();
        })
        .on('error', (error: any) => {
          console.log('error', error);
          alertModule.error('Transaction has some error');
          reject(error);
        });
    });
  };
}
