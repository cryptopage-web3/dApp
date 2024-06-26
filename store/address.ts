import Vue from 'vue';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { AxiosError } from 'axios';

import { alertModule, authModule } from '.';
import { NftsService, TransactionsService, UserService } from '~/services';
import {
  EChainType,
  ETypeNft,
  IAddressInfo,
  INft,
  INftsPagination,
  INftTransaction,
  ENftTransactionAccessType,
  INftTransactionsPagination,
  ITransaction,
  ITransactionsPagination,
  EAttachmentType,
  EErrorType,
  IUserToken,
} from '~/types';
import { networkHelper } from '~/utils/networkHelper';
import {
  getNftTransactionUniqueKey,
  getNftUniqueKey,
  getUniqueKey,
  uniqueHashConcat,
  uniqueNftConcat,
  uniqueNftTransactionConcat,
} from '~/utils/array';
import {
  nftResAdapter,
  nftTransactionDetailsResAdapter,
  nftTransactionResAdapter,
  transactionResAdapter,
} from '~/adapters';
import { nftContractAddress } from '~/contracts';
import { saveError } from '~/utils/saveError';

type TAddressInfo = IAddressInfo;
type TTransactionsPagination = ITransactionsPagination;
type TNftsPagination = INftsPagination;
type TNftTransactionsPagination = INftTransactionsPagination;
type TNftTransaction = INftTransaction;
type TNft = INft;
type TNftTransactionDetailsParams = {
  index: number;
  nft: INftTransaction;
};
type TOwnNftDetailsParams = {
  index: number;
  nft: TNft;
};

const userService = new UserService();
const nftsService = new NftsService();
const transactionsService = new TransactionsService();

const defaultTransactions: TTransactionsPagination = {
  transactions: [],
  count: 0,
  pageSize: 100,
  sort: 'desc',
  page: 0,
  hasAllPages: false,
};

const defaultNftTransactions: TNftTransactionsPagination = {
  nfts: [],
  count: 0,
  pageSize: 100,
  sort: 'desc',
  page: 0,
  hasAllPages: false,
};

const defaultOwnNfts: TNftsPagination = {
  nfts: [],
  count: 0,
  pageSize: 20,
  sort: 'desc',
  page: 0,
  hasAllPages: false,
};

@Module({
  name: 'address',
  namespaced: true,
  stateFactory: true,
})
export default class AddressModule extends VuexModule {
  info: TAddressInfo = {
    address: '',
    chainId: 1,
  };

  tokens: IUserToken[] = [];

  nftTransactions: TNftTransactionsPagination = { ...defaultNftTransactions };

  syncNftTransactionsLoading = false;

  ownNfts: TNftsPagination = { ...defaultOwnNfts };

  syncOwnNftsLoading = false;

  transactions: TTransactionsPagination = { ...defaultTransactions };

  syncTransactionsLoading = false;

  get address(): string {
    return this.info.address;
  }

  get chainId(): string | number {
    return this.info.chainId;
  }

  get chainSlug(): string {
    return networkHelper.getNetworkSlug(this.chainId);
  }

  get chainType(): EChainType {
    return networkHelper.getNetworkType(this.chainId);
  }

  get chainName(): string {
    return networkHelper.getNetworkName(this.chainId);
  }

  get chainSymbol(): string {
    return networkHelper.getNetworkSymbol(this.chainId);
  }

  get inputs(): number {
    return new Set(
      this.transactions.transactions
        .filter(
          (tx: ITransaction) =>
            tx.to.toLowerCase() === this.address.toLowerCase(),
        )
        .map((tx: ITransaction) => tx.from),
    ).size;
  }

  get outputs(): number {
    return new Set(
      this.transactions.transactions
        .filter(
          (tx: ITransaction) =>
            tx.from.toLowerCase() === this.address.toLowerCase(),
        )
        .map((tx: ITransaction) => tx.to),
    ).size;
  }

  @Mutation
  public setInfo(info: TAddressInfo) {
    this.info = info;
  }

  @Mutation
  public setTokens(tokens: IUserToken[]) {
    this.tokens = [...tokens];
  }

  @Mutation
  public setNftTransactions(transactions: TNftTransactionsPagination) {
    this.nftTransactions = transactions;
  }

  @Mutation
  public setNftTransactionDetails({
    index,
    nft,
  }: TNftTransactionDetailsParams) {
    const { nfts } = this.nftTransactions;

    Vue.set(nfts, index, nft);
  }

  @Mutation
  public setOwnNfts(nfts: TNftsPagination) {
    this.ownNfts = nfts;
  }

  @Mutation
  public setOwnNftDetails({ index, nft }: TOwnNftDetailsParams) {
    const { nfts } = this.ownNfts;

    Vue.set(nfts, index, nft);
  }

  @Mutation
  public setTransactions(transactions: TTransactionsPagination) {
    this.transactions = transactions;
  }

  @Mutation
  public setSyncNftTransactionsLoading(loading: boolean) {
    this.syncNftTransactionsLoading = loading;
  }

  @Mutation
  public setSyncTransactionsLoading(loading: boolean) {
    this.syncTransactionsLoading = loading;
  }

  @Mutation
  public setSyncOwnNftsLoading(loading: boolean) {
    this.syncOwnNftsLoading = loading;
  }

  @Action
  public async fetchTokens() {
    try {
      const data = await userService.getTokens(this.address);

      this.setTokens(data.tokens);
    } catch {
      saveError(EErrorType.fetchTokens, 'Error getting tokens data', {
        chainSlug: this.chainSlug,
        address: this.address,
      });

      alertModule.error('Error getting tokens data');

      this.setTokens([]);
    }
  }

  @Action
  public async fetchNftTransactions() {
    try {
      const { page, pageSize, continue: oldContinue } = this.nftTransactions;
      const nextPage = page + 1;

      const { transactions, continue: newContinue } =
        await nftsService.getTransactionsList({
          chainSlug: this.chainSlug,
          address: this.address,
          pageSize,
          continue: oldContinue,
        });

      /** текущие NFTs достаем только перед объединением
       * за время запроса уже могли получить детали и обновить старые NFT
       */
      const { nfts: oldNfts } = this.nftTransactions;
      const newNfts = uniqueNftTransactionConcat(
        oldNfts,
        transactions.map((t) => nftTransactionResAdapter(t)),
      );

      this.setNftTransactions({
        ...this.nftTransactions,
        nfts: newNfts,
        count: newNfts.length,
        continue: newContinue,
        page: nextPage,
        /** получили все страницы, если continue: {} */
        hasAllPages: !newContinue?.pageKey,
      });
    } catch (error) {
      const errorMessage =
        (error as AxiosError)?.response?.status === 429
          ? 'Content Transactions: Too Many Requests. Rate limit 30 per second'
          : 'Error getting content data';

      alertModule.error(errorMessage);

      saveError(EErrorType.fetchNftTransactions, errorMessage, {
        chainSlug: this.chainSlug,
        address: this.address,
        pageSize: this.nftTransactions.pageSize,
        continue: this.nftTransactions.continue,
      });

      this.setNftTransactions({
        ...this.nftTransactions,
        hasAllPages: true,
      });
    }
  }

  @Action
  public updateNftDetails({
    nft,
    updatedDetails,
  }: {
    nft: TNftTransaction;
    updatedDetails: Record<string, any>;
  }) {
    const { nfts } = this.nftTransactions;
    const index = nfts.findIndex((item) => item === nft);

    this.setNftTransactionDetails({
      index,
      nft: {
        ...nft,
        ...updatedDetails,
      },
    });
  }

  @Action
  public async fetchNftTransactionDetails(nft: TNftTransaction) {
    const { nfts } = this.nftTransactions;
    const index = nfts.findIndex((item) => item === nft);

    try {
      const data = await nftsService.getTransactionDetails({
        chainSlug: this.chainSlug,
        contractAddress: nft.contractAddress,
        tokenId: nft.tokenId,
        blockNumber: nft.blockNumber,
      });

      const nftWithDetails = nftTransactionDetailsResAdapter(nft, data);
      const { contentUrl, isEncrypted, attachments, contractAddress } =
        nftWithDetails;

      const isCryptoPageNft =
        contractAddress === nftContractAddress[this.chainId];

      const videoAttach = attachments?.find(
        (item) => item.type === EAttachmentType.video,
      );
      const audioAttach = attachments?.find(
        (item) => item.type === EAttachmentType.audio,
      );

      /** если NFT наша и attachments пустой, то значит это текстовое NFT */
      if (isCryptoPageNft && !attachments?.length) {
        nftWithDetails.type = ETypeNft.text;
      } else if (videoAttach) {
        /** в наших NFT в contentUrl для видео содержится картинка - нет изображения
         * поэтому достаем ссылки на видео из attachments
         */
        nftWithDetails.type = ETypeNft.video;
        nftWithDetails.contentUrl = videoAttach.data as string;
      } else if (audioAttach) {
        nftWithDetails.type = ETypeNft.audio;
        nftWithDetails.contentUrl = audioAttach.data as string;
      } else if (contentUrl) {
        const mimeType = await nftsService.getMimeType(contentUrl);

        if (/audio/.test(mimeType)) {
          nftWithDetails.type = ETypeNft.audio;
        }

        if (/video/.test(mimeType)) {
          nftWithDetails.type = ETypeNft.video;
        }

        /** если есть урл и не удалось определить mimeType,
         * то по умолчанию указываем картинку */
        if (/image/.test(mimeType) || !mimeType) {
          nftWithDetails.type = ETypeNft.image;
        }
      }

      if (isEncrypted) {
        if (
          this.address.toLocaleLowerCase() ===
          authModule.address.toLocaleLowerCase()
        ) {
          nftWithDetails.accessType = ENftTransactionAccessType.has_access;
        } else {
          nftWithDetails.accessType = ENftTransactionAccessType.not_requested;
        }
      } else {
        nftWithDetails.accessType = ENftTransactionAccessType.has_access;
      }

      this.setNftTransactionDetails({
        index,
        nft: nftWithDetails,
      });
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 429) {
        alertModule.error(
          'Content Details: Too Many Requests. Rate limit 30 per second',
        );
      }

      saveError(EErrorType.fetchNftTransactionDetails, '', {
        chainSlug: this.chainSlug,
        contractAddress: nft.contractAddress,
        tokenId: nft.tokenId,
        blockNumber: nft.blockNumber,
      });

      this.setNftTransactionDetails({
        index,
        nft: {
          ...nft,
          hasDetails: true,
        },
      });
    }
  }

  @Action
  public async fetchOwnNfts() {
    try {
      const { page, pageSize, continue: oldContinue } = this.ownNfts;
      const nextPage = page + 1;

      const { list, continue: newContinue } = await nftsService.getList({
        chainSlug: this.chainSlug,
        address: this.address,
        pageSize,
        continue: oldContinue,
      });

      /** текущие NFTs достаем только перед объединением
       * за время запроса уже могли получить детали и обновить старые NFT
       */
      const { nfts: oldNfts } = this.ownNfts;
      const newNfts = uniqueNftConcat(
        oldNfts,
        list.map((t) => nftResAdapter(t)),
      );

      this.setOwnNfts({
        ...this.ownNfts,
        nfts: newNfts,
        count: newNfts.length,
        continue: newContinue,
        page: nextPage,
        /** получили все страницы, если continue: {} */
        hasAllPages: !newContinue?.pageKey,
      });
    } catch (error) {
      const errorMessage =
        (error as AxiosError)?.response?.status === 429
          ? 'My Content: Too Many Requests. Rate limit 30 per second'
          : 'Error getting own content';

      alertModule.error(errorMessage);

      saveError(EErrorType.fetchOwnNfts, errorMessage, {
        chainSlug: this.chainSlug,
        address: this.address,
        pageSize: this.ownNfts.pageSize,
        continue: this.ownNfts.continue,
      });

      this.setOwnNfts({
        ...this.ownNfts,
        hasAllPages: true,
      });
    }
  }

  @Action
  public updateOwnNftDetails({
    nft,
    updatedDetails,
  }: {
    nft: TNft;
    updatedDetails: Record<string, any>;
  }) {
    const { nfts } = this.ownNfts;
    const index = nfts.findIndex((item) => item === nft);

    this.setOwnNftDetails({
      index,
      nft: {
        ...nft,
        ...updatedDetails,
      },
    });
  }

  @Action
  public async fetchOwnNftDetails(nft: TNft) {
    const { nfts } = this.ownNfts;
    const index = nfts.findIndex((item) => item === nft);
    let nftType = nft.type;
    const nftTemp = { ...nft };

    try {
      const isCryptoPageNft =
        nftTemp.contractAddress === nftContractAddress[this.chainId];

      const videoAttach = nftTemp.attachments?.find(
        (item) => item.type === EAttachmentType.video,
      );
      const audioAttach = nftTemp.attachments?.find(
        (item) => item.type === EAttachmentType.audio,
      );

      /** если NFT наша и attachments пустой, то значит это текстовое NFT */
      if (isCryptoPageNft && !nftTemp.attachments?.length) {
        nftType = ETypeNft.text;
      } else if (videoAttach) {
        /** в наших NFT в contentUrl для видео содержится картинка - нет изображения
         * поэтому достаем ссылки на видео из attachments
         */
        nftType = ETypeNft.video;
        nftTemp.contentUrl = videoAttach.data as string;
      } else if (audioAttach) {
        nftType = ETypeNft.audio;
        nftTemp.contentUrl = audioAttach.data as string;
      } else if (nftTemp.contentUrl) {
        const mimeType = await nftsService.getMimeType(nftTemp.contentUrl);

        if (/audio/.test(mimeType)) {
          nftType = ETypeNft.audio;
        }

        if (/video/.test(mimeType)) {
          nftType = ETypeNft.video;
        }

        /** если есть урл и не удалось определить mimeType,
         * то по умолчанию указываем картинку */
        if (/image/.test(mimeType) || !mimeType) {
          nftType = ETypeNft.image;
        }
      }

      let accessType: ENftTransactionAccessType;

      if (nftTemp.isEncrypted) {
        if (
          this.address.toLocaleLowerCase() ===
          authModule.address.toLocaleLowerCase()
        ) {
          accessType = ENftTransactionAccessType.has_access;
        } else {
          accessType = ENftTransactionAccessType.not_requested;
        }
      } else {
        accessType = ENftTransactionAccessType.has_access;
      }

      this.setOwnNftDetails({
        index,
        nft: {
          ...nftTemp,
          accessType,
          type: nftType,
          hasDetails: true,
        },
      });
    } catch {
      this.setOwnNftDetails({
        index,
        nft: {
          ...nft,
          hasDetails: true,
        },
      });
    }
  }

  @Action
  public async fetchOwnNftComments(nft: TNft) {
    const { nfts } = this.ownNfts;
    const index = nfts.findIndex((item) => item === nft);

    try {
      const data = await nftsService.getOwnDetails({
        chainSlug: this.chainSlug,
        contractAddress: nft.contractAddress,
        tokenId: nft.tokenId,
      });

      this.setOwnNftDetails({
        index,
        nft: {
          ...nft,
          comments: data?.comments || [],
        },
      });
    } catch {}
  }

  @Action
  public async fetchTransactions() {
    try {
      const { page, pageSize, continue: oldContinue } = this.transactions;
      const nextPage = page + 1;

      const { transactions, continue: newContinue } =
        await transactionsService.getList({
          chainSlug: this.chainSlug,
          address: this.address,
          pageSize,
          continue: oldContinue,
        });

      const { transactions: oldTransactions } = this.transactions;
      const newTransactions = uniqueHashConcat(
        oldTransactions,
        transactions.map((t) =>
          transactionResAdapter(t, this.address, this.chainId),
        ),
      );

      this.setTransactions({
        ...this.transactions,
        transactions: newTransactions,
        count: newTransactions.length,
        continue: newContinue,
        page: nextPage,
        /** получили все страницы, если continue: {} */
        hasAllPages: !newContinue?.pageKey,
      });
    } catch {
      alertModule.error('Error getting transactions data');

      saveError(
        EErrorType.fetchTransactions,
        'Error getting transactions data',
        {
          chainSlug: this.chainSlug,
          address: this.address,
          pageSize: this.transactions.pageSize,
          continue: this.transactions.continue,
        },
      );

      this.setTransactions({
        ...this.transactions,
        hasAllPages: true,
      });
    }
  }

  @Action
  public deleteNft(nft: TNftTransaction): void {
    const { nfts } = this.nftTransactions;

    this.setNftTransactions({
      ...this.nftTransactions,
      nfts: nfts.filter((item) => item !== nft),
    });
  }

  @Action
  public syncAddressTransactions(targetTxHash: string | null) {
    /** запускаем параллельную синхронизацию, без async/await */

    this.syncNftTransactions(targetTxHash);
    // this.syncTransactions(targetTxHash);
    // this.syncOwnNfts(targetTxHash);
  }

  @Action
  public async syncNftTransactions(targetTxHash: string | null) {
    try {
      /**
       * Получаем первые 10 записей, и добавляем те, которых у нас еще нет
       * Процесс происходит каждые 3 секунды до 5-ти раз пока не получим targetTxHash
       */

      this.setSyncNftTransactionsLoading(true);

      /** метод обновления списка NFT, возвращает флаг наличия целевой NFT */

      const fetchNftTransactions = async () => {
        const { transactions } = await nftsService.getTransactionsList({
          chainSlug: this.chainSlug,
          address: this.address,
          pageSize: 10,
        });

        /** отбираем уникальные значения */

        const { nfts: oldNfts } = this.nftTransactions;
        const uniqueList: TNftTransaction[] = [];

        transactions
          .map((t) => nftTransactionResAdapter(t))
          .forEach((item) => {
            const same = oldNfts.find(
              (tx) =>
                getNftTransactionUniqueKey(tx) ===
                getNftTransactionUniqueKey(item),
            );

            if (!same) {
              uniqueList.push(item);
            }
          });

        if (!uniqueList.length) {
          return false;
        }

        /** обновляем стор */

        const newNfts = [...uniqueList, ...oldNfts];

        this.setNftTransactions({
          ...this.nftTransactions,
          nfts: newNfts,
          count: newNfts.length,
        });

        const hasTargetTx = newNfts.some(
          (item) =>
            item.txHash?.toLowerCase() === (targetTxHash || '').toLowerCase(),
        );

        return hasTargetTx;
      };

      /** запуск цикла обновления NFT */

      let targetLoaded = false;

      for (let i = 0; i < 5; i++) {
        const hasTargetTx = await new Promise((resolve) => {
          setTimeout(async () => {
            resolve(await fetchNftTransactions());
          }, 3000);
        });

        if (hasTargetTx) {
          targetLoaded = true;
          break;
        }
      }

      if (!targetLoaded) {
        alertModule.info('Created Content not loaded');
      }
    } catch (error) {
      const errorMessage =
        (error as AxiosError)?.response?.status === 429
          ? 'Load created Content: Too Many Requests. Rate limit 30 per second'
          : 'Failed to load created Content';

      alertModule.error(errorMessage);

      saveError(EErrorType.syncNftTransactions, errorMessage, {
        chainSlug: this.chainSlug,
        address: this.address,
        pageSize: 10,
      });
    } finally {
      this.setSyncNftTransactionsLoading(false);
    }
  }

  @Action
  public async syncTransactions(targetTxHash: string | null) {
    try {
      /**
       * Получаем первые 10 записей, и добавляем те, которых у нас еще нет
       * Процесс происходит каждые 3 секунды до 5-ти раз пока не получим targetTxHash
       */

      this.setSyncTransactionsLoading(true);

      /** метод обновления списка транзакций, возвращает флаг наличия целевой транзакции */

      const fetchTransactions = async () => {
        const { transactions } = await transactionsService.getList({
          chainSlug: this.chainSlug,
          address: this.address,
          pageSize: 10,
        });

        /** отбираем уникальные значения */

        const { transactions: oldTransactions } = this.transactions;
        const uniqueList: ITransaction[] = [];

        transactions
          .map((t) => transactionResAdapter(t, this.address, this.chainId))
          .forEach((item) => {
            const same = oldTransactions.find(
              (tx) => getUniqueKey(tx) === getUniqueKey(item),
            );

            if (!same) {
              uniqueList.push(item);
            }
          });

        if (!uniqueList.length) {
          return false;
        }

        /** обновляем стор */

        const newTransactions = [...uniqueList, ...oldTransactions];

        this.setTransactions({
          ...this.transactions,
          transactions: newTransactions,
          count: newTransactions.length,
        });

        const hasTargetTx = newTransactions.some(
          (item) =>
            item.hash?.toLowerCase() === (targetTxHash || '').toLowerCase(),
        );

        return hasTargetTx;
      };

      /** запуск цикла обновления транзакций */

      let targetLoaded = false;

      for (let i = 0; i < 5; i++) {
        const hasTargetTx = await new Promise((resolve) => {
          setTimeout(async () => {
            resolve(await fetchTransactions());
          }, 3000);
        });

        if (hasTargetTx) {
          targetLoaded = true;
          break;
        }
      }

      if (!targetLoaded) {
        alertModule.info('Created transaction not loaded');
      }
    } catch {
      alertModule.error('Failed to load created transaction');

      saveError(
        EErrorType.syncTransactions,
        'Failed to load created transaction',
        {
          chainSlug: this.chainSlug,
          address: this.address,
          pageSize: 10,
        },
      );
    } finally {
      this.setSyncTransactionsLoading(false);
    }
  }

  @Action
  public async syncOwnNfts(targetTxHash: string | null) {
    try {
      /**
       * Получаем первые 10 записей, и добавляем те, которых у нас еще нет
       * Процесс происходит каждые 3 секунды до 5-ти раз пока не получим targetTxHash
       */

      this.setSyncOwnNftsLoading(true);

      /** метод обновления списка NFT, возвращает флаг наличия целевой транзакции */

      const fetchOwnNfts = async () => {
        const { list } = await nftsService.getList({
          chainSlug: this.chainSlug,
          address: this.address,
          pageSize: 10,
        });

        /** отбираем уникальные значения */

        const { nfts: oldNfts } = this.ownNfts;
        const uniqueList: INft[] = [];

        list
          .map((t) => nftResAdapter(t))
          .forEach((item) => {
            const same = oldNfts.find(
              (tx) => getNftUniqueKey(tx) === getNftUniqueKey(item),
            );

            if (!same) {
              uniqueList.push(item);
            }
          });

        if (!uniqueList.length) {
          return false;
        }

        /** обновляем стор */

        const newNfts = [...uniqueList, ...oldNfts];

        this.setOwnNfts({
          ...this.ownNfts,
          nfts: newNfts,
          count: newNfts.length,
        });

        /** TODO: с бэка не приходит hash по моим NFT, в результате данное условие всегда будет false */
        return false;
      };

      /** запуск цикла обновления транзакций */

      let targetLoaded = false;

      for (let i = 0; i < 5; i++) {
        const hasTargetTx = await new Promise((resolve) => {
          setTimeout(async () => {
            resolve(await fetchOwnNfts());
          }, 3000);
        });

        if (hasTargetTx) {
          targetLoaded = true;
          break;
        }
      }

      /** Не отображаем сообщение, т.к. пользователь его не ждет и не нужен этот спам */

      if (!targetLoaded) {
        // alertModule.info('Created Content not loaded');
      }
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 429) {
        alertModule.error(
          'My Content: Too Many Requests. Rate limit 30 per second',
        );
      }

      saveError(EErrorType.syncOwnNfts, '', {
        chainSlug: this.chainSlug,
        address: this.address,
        pageSize: 10,
      });
    } finally {
      this.setSyncTransactionsLoading(false);
    }
  }

  @Action
  public clear(): void {
    /** удаляем баланс по токенам */

    this.setTokens([]);

    /** удаляем nfts */

    this.setNftTransactions({
      ...defaultNftTransactions,
      nfts: [],
    });

    /** удаляем мои nfts */

    this.setOwnNfts({
      ...defaultOwnNfts,
      nfts: [],
    });

    /** удаляем транзакции */

    this.setTransactions({
      ...defaultTransactions,
      transactions: [],
    });
  }
}
