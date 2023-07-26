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
import { alertModule } from '~/utils/storeAccessor';
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
      authAddress,
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

    // const CONTRACT_NFT = await import(`../contracts/${authChainSlug}/nft.json`);

    // const contractNft = new this.web3.eth.Contract(
    //   CONTRACT_NFT.abi,
    //   CONTRACT_NFT.address,
    // );

    // debugger;

    // const postIds = await contractNft.methods
    //   .tokensOfOwner(ownerAddress)
    //   .call();

    // console.log(postIds);
    // debugger;

    // const postInfo = await this.readPost({
    //   authChainSlug,
    //   nftTokenId: '80001000000000046',
    // });

    // console.log(postInfo);
    // debugger;

    // const comments = await this.readPostComments({
    //   authChainSlug,
    //   nftTokenId: '80001000000000046',
    // });

    // console.log(comments);
    // debugger;

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

    // await this.faucetTestMint(authAddress, 200, authChainSlug);
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
        accessDuration,
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
      const normalizePrice = accessPrice * 10 ** 18;
      const dataPost = defaultAbiCoder.encode(
        [
          'address',
          'string',
          'uint256',
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
          normalizePrice, // payAmount
          accessDuration, // minimalPeriod
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

    // console.log(pluginAddress);

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
    authAddress: string,
    postId: string,
    authChainSlug: string,
  ) => {
    const CONTRACT_MAIN = await import(
      `../contracts/${authChainSlug}/main.json`
    );

    const contractMain = new this.web3.eth.Contract(
      CONTRACT_MAIN.abi,
      CONTRACT_MAIN.address,
    );

    const CONTRACT_HAS_ACCESS = await import(
      `../contracts/${authChainSlug}/singleHasPaymentForAccess.json`
    );

    /** получаем адрес плагина */

    const pluginAddress = await contractMain.methods
      .getPluginContract(contractPlugins.singleHasPaymentForAccess, 1)
      .call();

    // console.log(pluginAddress);

    const contractPlugin = new this.web3.eth.Contract(
      CONTRACT_HAS_ACCESS.abi,
      pluginAddress,
    );

    /** получаем данные о доступе */

    return await contractPlugin.methods.read(authAddress, postId).call();
  };

  public buyPostAccess = async (
    authAddress: string,
    postId: string,
    amount: number,
    authChainSlug: string,
  ): Promise<void> => {
    const CONTRACT_EXECUTOR = await import(
      `../contracts/${authChainSlug}/executor.json`
    );

    const contractExecutor = new this.web3.eth.Contract(
      CONTRACT_EXECUTOR.abi,
      CONTRACT_EXECUTOR.address,
    );

    const CONTRACT_MAIN = await import(
      `../contracts/${authChainSlug}/main.json`
    );

    const contractMain = new this.web3.eth.Contract(
      CONTRACT_MAIN.abi,
      CONTRACT_MAIN.address,
    );

    const CONTRACT_TOKEN = await import(
      `../contracts/${authChainSlug}/token.json`
    );

    const contractToken = new this.web3.eth.Contract(
      CONTRACT_TOKEN.abi,
      CONTRACT_TOKEN.address,
    );

    const timeNow = Date.now();

    /** approve с кошелька пользователя на адрес плагина */

    const normalizeAmount = amount * 10 ** 18;

    const buyPlugin = await contractMain.methods
      .getPlugin(contractPlugins.subscriptionBuyForSinglePost, 1)
      .call();

    await contractToken.methods.approve(buyPlugin[1], normalizeAmount).send({
      from: authAddress,
    });

    /** покупка подписки */

    const transactionId = formatBytes32String(String(timeNow));
    const data = defaultAbiCoder.encode(
      ['address', 'uint256', 'uint256', 'uint256'],
      [
        authAddress, // access address
        BigNumber.from(postId), // postId
        normalizeAmount, // amount
        0, // count days before start
      ],
    );

    return await new Promise((resolve, reject) => {
      contractExecutor.methods
        .run(
          transactionId,
          contractPlugins.subscriptionBuyForSinglePost,
          1,
          data,
        )
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

  public faucetTestMint = async (
    authAddress: string,
    amount: number,
    authChainSlug: string,
  ): Promise<void> => {
    const CONTRACT_EXECUTOR = await import(
      `../contracts/${authChainSlug}/executor.json`
    );

    const contractExecutor = new this.web3.eth.Contract(
      CONTRACT_EXECUTOR.abi,
      CONTRACT_EXECUTOR.address,
    );

    const timeNow = Date.now();

    // await this.tokenBalance(authAddress, authChainSlug);

    /** добавление баланса */

    const transactionId = formatBytes32String(String(timeNow));
    const normalizeAmount = amount * 10 ** 18;
    const data = defaultAbiCoder.encode(['uint256'], [normalizeAmount]);

    return new Promise((resolve, reject) => {
      contractExecutor.methods
        .run(transactionId, contractPlugins.faucetTestMint, 1, data)
        .send({
          from: authAddress,
        })
        .on('transactionHash', (hash: string) => {
          alertModule.info(`${hash}: Transaction on pending`);
        })
        .on('receipt', () => {
          alertModule.success('Transaction completed');
          resolve();
        })
        .on('error', (error: any) => {
          alertModule.error('Transaction has some error');
          reject(error);
        });
    });
  };

  public tokenBalance = async (
    authAddress: string,
    authChainSlug: string,
  ): Promise<void> => {
    const CONTRACT_TOKEN = await import(
      `../contracts/${authChainSlug}/token.json`
    );

    const contractToken = new this.web3.eth.Contract(
      CONTRACT_TOKEN.abi,
      CONTRACT_TOKEN.address,
    );

    const balance = await contractToken.methods.balanceOf(authAddress).call();

    console.log(balance);
  };
}
