import Web3 from 'web3';
import { defaultAbiCoder, formatBytes32String } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import { IWriteCommentParams } from '~/types/comment-form';
import { IBurnPostParams, IWritePostParams } from '~/types/nft-form';
import { alertModule, authModule } from '~/utils/storeAccessor';
import { contractPlugins, zeroAddress } from '~/contracts';

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
        ipfsHash,
        communityAddress,
        isEncrypted,
        // accessPrice,
        // accessDuration,
      } = params;

      const CONTRACT_EXECUTOR = await import(
        `../contracts/${authChainSlug}/executor.json`
      );

      const contractExecutor = new this.web3.eth.Contract(
        CONTRACT_EXECUTOR.abi,
        CONTRACT_EXECUTOR.address,
      );

      const CONTRACT_ACCOUNT = await import(
        `../contracts/${authChainSlug}/account.json`
      );

      const contractAccount = new this.web3.eth.Contract(
        CONTRACT_ACCOUNT.abi,
        CONTRACT_ACCOUNT.address,
      );

      const timeNow = Date.now();

      /** добавление адреса к сообществу по умолчанию */

      const isCommunityUser = await contractAccount.methods
        .isCommunityUser(communityAddress, authAddress)
        .call();

      if (!isCommunityUser) {
        const transactionJoinId = formatBytes32String(String(timeNow + 1));
        const dataJoin = defaultAbiCoder.encode(
          ['address', 'uint256'],
          [communityAddress, 0],
        );

        await contractExecutor.methods
          .run(transactionJoinId, contractPlugins.communityJoin, 1, dataJoin)
          .send({
            from: authAddress,
          });
      }

      /** создание поста */

      const transactionPostId = formatBytes32String(String(timeNow + 2));
      const dataPost = defaultAbiCoder.encode(
        [
          'address',
          'address',
          'address',
          'string',
          'uint256',
          'string[]',
          'bool',
          'bool',
          'uint256',
        ],
        [
          communityAddress, // communityAddress
          zeroAddress, // repostFromCommunityAddress
          ownerAddress, // userAddress
          ipfsHash, // postHash
          0, // encodingType
          [], // tags
          isEncrypted, // isEncrypted
          true, // isView
          0, // writeNftId
        ],
      );

      contractExecutor.methods
        .run(transactionPostId, contractPlugins.writePost, 1, dataPost)
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

      const transactionId = formatBytes32String(String(Date.now()));
      const dataBurn = defaultAbiCoder.encode(
        ['uint256'],
        [BigNumber.from(nftTokenId)],
      );

      contract.methods
        .run(transactionId, contractPlugins.burnPost, 1, dataBurn)
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
