import Web3 from 'web3';
import { defaultAbiCoder, formatBytes32String } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import { IWriteCommentParams } from '~/types/comment-form';
import {
  IBurnPostParams,
  IReadPostCommentsParams,
  IReadPostParams,
  IWritePostParams,
} from '~/types/nft-form';
import { alertModule, authModule } from '~/utils/storeAccessor';
import { contractPlugins } from '~/contracts';

export class Web3Service {
  web3!: Web3;

  constructor(provider: any = null) {
    this.web3 = new Web3(provider || Web3.givenProvider);
  }

  /*
  public testRequest = async ({
    params,
  }: // callbacks,
  IWritePostParams) => {
    const {
      authChainSlug,
      // authAddress,
      ownerAddress,
      // ipfsHash,
      // communityAddress,
      // isEncrypted,
      // accessPrice,
      // accessDuration,
    } = params;

    // const CONTRACT_ACCOUNT = await import(
    //   `../contracts/${authChainSlug}/account.json`
    // );

    // const contractAccount = new this.web3.eth.Contract(
    //   CONTRACT_ACCOUNT.abi,
    //   CONTRACT_ACCOUNT.address,
    // );

    const CONTRACT_NFT = await import(`../contracts/${authChainSlug}/nft.json`);

    const contractNft = new this.web3.eth.Contract(
      CONTRACT_NFT.abi,
      CONTRACT_NFT.address,
    );

    debugger;

    const postIds = await contractNft.methods
      .tokensOfOwner(ownerAddress)
      .call();

    console.log(postIds);
    debugger;

    const postInfo = await this.readPost({
      authChainSlug,
      nftTokenId: '80001000000000035',
    });

    console.log(postInfo);
    debugger;

    const comments = await this.readPostComments({
      authChainSlug,
      nftTokenId: '80001000000000035',
    });

    console.log(comments);
    debugger;

    // this.writeComment({
    //   params: {
    //     authChainSlug,
    //     authAddress,
    //     nftTokenId: '80001000000000028',
    //     ipfsHash: 'test hash',
    //     isUp: true,
    //     isDown: false,
    //   },
    //   callbacks,
    // });

    // this.burnPost({
    //   params: {
    //     authChainSlug,
    //     authAddress,
    //     nftTokenId: '80001000000000023',
    //   },
    //   callbacks,
    // });
  };
  */

  public writePost = async ({ params, callbacks }: IWritePostParams) => {
    try {
      const {
        authChainSlug,
        authAddress,
        ownerAddress,
        ipfsHash,
        isEncrypted,
        isSensitive,
        isCommented,
        accessPrice,
        accessType,
        // accessDuration,
      } = params;

      // this.testRequest({ params, callbacks });
      // return;

      const CONTRACT_EXECUTOR = await import(
        `../contracts/${authChainSlug}/executor.json`
      );

      const contractExecutor = new this.web3.eth.Contract(
        CONTRACT_EXECUTOR.abi,
        CONTRACT_EXECUTOR.address,
      );

      const timeNow = Date.now();

      /** добавление поста */

      const transactionPostId = formatBytes32String(String(timeNow));
      const dataPost = defaultAbiCoder.encode(
        [
          'address',
          'string',
          'uint256',
          'uint256',
          'uint256',
          'bool',
          'bool',
          'bool',
          'bool',
        ],
        [
          ownerAddress, // owner
          ipfsHash, // postHash
          0, // encodingType
          accessType, // paymentType
          accessPrice, // payAmount
          isEncrypted, // isEncrypted
          true, // isView
          isSensitive, // isSensitive
          isCommented, // isCommented
        ],
      );

      contractExecutor.methods
        .run(transactionPostId, contractPlugins.singleWritePost, 1, dataPost)
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

      const CONTRACT_EXECUTOR = await import(
        `../contracts/${authChainSlug}/executor.json`
      );

      const contractExecutor = new this.web3.eth.Contract(
        CONTRACT_EXECUTOR.abi,
        CONTRACT_EXECUTOR.address,
      );

      const timeNow = Date.now();

      /** создание комментария */

      const transactionCommentId = formatBytes32String(String(timeNow));
      const dataComment = defaultAbiCoder.encode(
        ['uint256', 'address', 'string', 'bool', 'bool', 'bool', 'bool'],
        [
          BigNumber.from(nftTokenId), // postId
          authAddress, // userAddress
          ipfsHash, // commentHash
          isUp, // up
          isDown, // down
          false, // isEncrypted
          true, // isView
        ],
      );

      contractExecutor.methods
        .run(
          transactionCommentId,
          contractPlugins.singleWriteComment,
          1,
          dataComment,
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

  public burnPost = async ({ params, callbacks }: IBurnPostParams) => {
    try {
      const { authAddress, authChainSlug, nftTokenId } = params;

      const CONTRACT_EXECUTOR = await import(
        `../contracts/${authChainSlug}/executor.json`
      );

      const contractExecutor = new this.web3.eth.Contract(
        CONTRACT_EXECUTOR.abi,
        CONTRACT_EXECUTOR.address,
      );

      const timeNow = Date.now();

      /** удаление поста */

      const transactionBurnId = formatBytes32String(String(timeNow));
      const dataBurn = defaultAbiCoder.encode(
        ['uint256'],
        [BigNumber.from(nftTokenId)],
      );

      contractExecutor.methods
        .run(transactionBurnId, contractPlugins.singleBurnPost, 1, dataBurn)
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

  public readPost = async ({ authChainSlug, nftTokenId }: IReadPostParams) => {
    const CONTRACT_MAIN = await import(
      `../contracts/${authChainSlug}/main.json`
    );

    const contractMain = new this.web3.eth.Contract(
      CONTRACT_MAIN.abi,
      CONTRACT_MAIN.address,
    );

    const CONTRACT_POST_INFO = await import(
      `../contracts/${authChainSlug}/singlePostInfo.json`
    );

    /** получаем адрес плагина */

    const pluginAddress = await contractMain.methods
      .getPluginContract(contractPlugins.singleReadPost, 1)
      .call();

    const contractPlugin = new this.web3.eth.Contract(
      CONTRACT_POST_INFO.abi,
      pluginAddress,
    );

    /** получаем данные поста */

    const postInfo = await contractPlugin.methods.read(nftTokenId).call();

    return postInfo;
  };

  public readPostComments = async ({
    authChainSlug,
    nftTokenId,
  }: IReadPostCommentsParams) => {
    const CONTRACT_MAIN = await import(
      `../contracts/${authChainSlug}/main.json`
    );

    const contractMain = new this.web3.eth.Contract(
      CONTRACT_MAIN.abi,
      CONTRACT_MAIN.address,
    );

    const CONTRACT_ALL_COMMENTS = await import(
      `../contracts/${authChainSlug}/singleAllComments.json`
    );

    /** получаем адрес плагина */

    const pluginAddress = await contractMain.methods
      .getPluginContract(contractPlugins.singleReadAllComment, 1)
      .call();

    const contractPlugin = new this.web3.eth.Contract(
      CONTRACT_ALL_COMMENTS.abi,
      pluginAddress,
    );

    /** получаем комментарии поста */

    const comments = await contractPlugin.methods.read(nftTokenId).call();

    return comments;
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
