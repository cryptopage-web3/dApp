import Web3 from 'web3';
import { defaultAbiCoder, formatBytes32String } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import { IWriteCommentParams } from '~/types/comment-form';
import {
  IBurnPostParams,
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
    //   nftTokenId: '80001000000000020',
    // });

    // console.log(postInfo);
    // debugger;

    // this.writeComment({
    //   params: {
    //     communityAddress,
    //     authChainSlug,
    //     authAddress,
    //     nftTokenId: '80001000000000015',
    //     ipfsHash: 'test hash',
    //     isUp: true,
    //     isDown: false,
    //   },
    //   callbacks,
    // });
    // return;

    // this.burnPost({
    //   params: {
    //     authChainSlug,
    //     authAddress,
    //     nftTokenId: '80001000000000014',
    //     communityAddress,
    //   },
    //   callbacks,
    // });
    // return;
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
        // accessPrice,
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
          0, // paymentType
          0, // payAmount
          isEncrypted, // isEncrypted
          true, // isView
          true, // isSensitive
          true, // isCommented
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
      const {
        authAddress,
        authChainSlug,
        nftTokenId,
        ipfsHash,
        isUp,
        isDown,
        communityAddress,
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

      const transactionCommentId = formatBytes32String(String(timeNow + 2));
      const dataComment = defaultAbiCoder.encode(
        [
          'address',
          'uint256',
          'address',
          'string',
          'bool',
          'bool',
          'bool',
          'bool',
        ],
        [
          communityAddress, // communityAddress
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
        .run(transactionCommentId, contractPlugins.writeComment, 1, dataComment)
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
      const { authAddress, authChainSlug, nftTokenId, communityAddress } =
        params;

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

      /** добавление адреса в модераторы */

      const isModerator = await contractAccount.methods
        .isModerator(communityAddress, authAddress)
        .call();

      if (!isModerator) {
        /** true - добавление, false - удаление */
        const dataEditModerators = defaultAbiCoder.encode(
          ['address', 'address', 'bool'],
          [communityAddress, authAddress, true],
        );

        const transactionEditId = formatBytes32String(String(timeNow + 1));

        await contractExecutor.methods
          .run(
            transactionEditId,
            contractPlugins.editModerators,
            1,
            dataEditModerators,
          )
          .send({
            from: authAddress,
          });
      }

      /** удаление поста */

      const transactionBurnId = formatBytes32String(String(timeNow + 2));
      const dataBurn = defaultAbiCoder.encode(
        ['uint256'],
        [BigNumber.from(nftTokenId)],
      );

      contractExecutor.methods
        .run(transactionBurnId, contractPlugins.burnPost, 1, dataBurn)
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

    const postInfo = await contractPlugin.methods.read(nftTokenId, 0).call();

    return postInfo;
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
