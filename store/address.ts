import Vue from 'vue';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { AxiosError } from 'axios';
import { defaultNormalizer } from './address/tx-normalizer/default-normalizer';
import { normalizeEth } from './address/tx-normalizer/eth-normalizer';
import { alertModule, authModule } from '.';
import { NftsService, TokensService, TransactionsService } from '~/services';
import {
  EChainSlug,
  EChainType,
  ETypeNft,
  IAddressInfo,
  INft,
  INftsPagination,
  INftTransaction,
  ENftTransactionAccessType,
  INftTransactionsPagination,
  IToken,
  ITransaction,
  ITransactionsPagination,
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

const tokensService = new TokensService();
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
  pageSize: 100,
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

  tokens: IToken[] = [];

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
  public setTokens(tokens: IToken[]) {
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
      const tokens = await tokensService.getList({
        chainSlug: this.chainSlug,
        address: this.address,
      });

      this.setTokens(tokens);
    } catch {
      alertModule.error('Error getting tokens data');

      this.setTokens([]);
    }
  }

  @Action
  public async fetchNftTransactions() {
    try {
      const { page, pageSize, nfts: oldNfts } = this.nftTransactions;
      const nextPage = page + 1;

      const { list, count } = await nftsService.getTransactionsList({
        chainSlug: this.chainSlug,
        address: this.address,
        page: nextPage,
        pageSize,
      });

      const newNfts = uniqueNftTransactionConcat(oldNfts, list);

      this.setNftTransactions({
        ...this.nftTransactions,
        nfts: newNfts,
        count: count === undefined ? newNfts.length : count,
        page: nextPage,
        hasAllPages: list.length === 0,
      });
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 429) {
        alertModule.error(
          'NFT Transactions: Too Many Requests. Rate limit 30 per second',
        );
      } else {
        alertModule.error('Error getting nfts data');
      }

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
        contractAddress: nft.contract_address,
        tokenId: nft.tokenId,
        blockNumber: nft.blockNumber,
      });

      if (data.contentUrl) {
        const mimeType = await nftsService.getMimeType(data.contentUrl);

        if (/audio/.test(mimeType)) {
          data.type = ETypeNft.audio;
        }

        if (/video/.test(mimeType)) {
          data.type = ETypeNft.video;
        }

        /** если есть урл и не удалось определить mimeType,
         * то по умолчанию указываем картинку */
        if (/image/.test(mimeType) || !mimeType) {
          data.type = ETypeNft.image;
        }
      }

      let accessType: ENftTransactionAccessType;

      if (data.isEncrypted) {
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

      this.setNftTransactionDetails({
        index,
        nft: {
          ...nft,
          ...data,
          accessType,
          hasDetails: true,
        },
      });
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 429) {
        alertModule.error(
          'NFT Details: Too Many Requests. Rate limit 30 per second',
        );
      }

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
      const { page, pageSize, nfts: oldNfts } = this.ownNfts;
      const nextPage = page + 1;

      const { list, count } = await nftsService.getList({
        chainSlug: this.chainSlug,
        address: this.address,
        page: nextPage,
        pageSize,
      });

      const newNfts = uniqueNftConcat(oldNfts, list);

      this.setOwnNfts({
        ...this.ownNfts,
        nfts: newNfts,
        count: count === undefined ? newNfts.length : count,
        page: nextPage,
        hasAllPages: list.length === 0,
      });
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 429) {
        alertModule.error(
          'My NFTs: Too Many Requests. Rate limit 30 per second',
        );
      } else {
        alertModule.error('Error getting own nfts data');
      }

      this.setOwnNfts({
        ...this.ownNfts,
        hasAllPages: true,
      });
    }
  }

  @Action
  public async fetchOwnNftDetails(nft: TNft) {
    const { nfts } = this.ownNfts;
    const index = nfts.findIndex((item) => item === nft);
    let nftType = nft.type;
    const nftTemp = { ...nft };

    try {
      /** если нет contentUrl, то скорее всего это зашифрованное NFT
       * получаем датели только для пустых contentUrl
       */
      if (!nft.contentUrl) {
        const data = await nftsService.getOwnDetails({
          chainSlug: this.chainSlug,
          contractAddress: nft.contract_address,
          tokenId: nft.tokenId,
        });

        let accessType: ENftTransactionAccessType;

        if (data.isEncrypted) {
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

        Object.assign(nftTemp, {
          contentUrl: data.contentUrl || '',
          isEncrypted: data.isEncrypted,
          accessPrice: data.accessPrice,
          accessDuration: data.accessDuration,
          accessType,
        });
      }

      if (nftTemp.contentUrl) {
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

      this.setOwnNftDetails({
        index,
        nft: {
          ...nft,
          ...nftTemp,
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
        contractAddress: nft.contract_address,
        tokenId: nft.tokenId,
      });

      this.setOwnNftDetails({
        index,
        nft: {
          ...nft,
          comments: data.comments,
        },
      });
    } catch {}
  }

  @Action
  public async fetchTransactions() {
    try {
      if (this.chainSlug === EChainSlug.eth) {
        await this.fetchEthTransactions();
      } else {
        await this.fetchDefaultTransactions();
      }
    } catch {
      alertModule.error('Error getting transactions data');

      this.setTransactions({
        ...this.transactions,
        hasAllPages: true,
      });
    }
  }

  @Action
  public async fetchEthTransactions() {
    const {
      page,
      pageSize,
      transactions: oldTransactions,
      continue: oldContinue,
    } = this.transactions;

    const { transactions, continue: newContinue } =
      await transactionsService.getEthList({
        chainSlug: this.chainSlug,
        address: this.address,
        continue: oldContinue,
        pageSize,
      });

    const newTransactions = uniqueHashConcat(
      oldTransactions,
      transactions.map((t) => normalizeEth(t, this.chainId)),
    );

    this.setTransactions({
      ...this.transactions,
      transactions: newTransactions,
      count: newTransactions.length,
      continue: newContinue,
      page: page + 1,
      hasAllPages: transactions.length === 0,
    });
  }

  @Action
  public async fetchDefaultTransactions() {
    const {
      page,
      pageSize,
      transactions: oldTransactions,
      continue: oldContinue,
    } = this.transactions;
    const nextPage = page + 1;

    const {
      transactions,
      count,
      continue: newContinue,
    } = await transactionsService.getList({
      chainSlug: this.chainSlug,
      address: this.address,
      page: nextPage,
      pageSize,
      continue: oldContinue,
    });

    const newTransactions = uniqueHashConcat(
      oldTransactions,
      transactions.map((t) => defaultNormalizer(t, this.address, this.chainId)),
    );

    this.setTransactions({
      ...this.transactions,
      transactions: newTransactions,
      count: count === undefined ? newTransactions.length : count,
      continue: newContinue,
      page: nextPage,
      hasAllPages: transactions.length === 0,
    });
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
    this.syncTransactions(targetTxHash);
    this.syncOwnNfts(targetTxHash);
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
        const { nfts: oldNfts } = this.nftTransactions;

        const { list, count } = await nftsService.getTransactionsList({
          chainSlug: this.chainSlug,
          address: this.address,
          page: 1,
          pageSize: 10,
        });

        /** отбираем уникальные значения */

        const uniqueList: TNftTransaction[] = [];

        list.forEach((item) => {
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
          count: count === undefined ? newNfts.length : count,
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
        alertModule.info('Created NFT not loaded');
      }
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 429) {
        alertModule.error(
          'Load created NFT: Too Many Requests. Rate limit 30 per second',
        );
      } else {
        alertModule.error('Failed to load created NFT');
      }
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
        const { transactions: oldTransactions } = this.transactions;

        const { transactions, count } = await transactionsService.getList({
          chainSlug: this.chainSlug,
          address: this.address,
          page: 1,
          pageSize: 10,
        });

        /** отбираем уникальные значения */

        const uniqueList: ITransaction[] = [];

        transactions
          .map((t) => defaultNormalizer(t, this.address, this.chainId))
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
          count: count === undefined ? newTransactions.length : count,
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
        const { nfts: oldNfts } = this.ownNfts;

        const { list, count } = await nftsService.getList({
          chainSlug: this.chainSlug,
          address: this.address,
          page: 1,
          pageSize: 10,
        });

        /** отбираем уникальные значения */

        const uniqueList: INft[] = [];

        list.forEach((item) => {
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
          count: count === undefined ? newNfts.length : count,
        });

        /** TODO: с бэка не приходит hash по моим NFT, в результате данное условие всегда будет false */
        const hasTargetTx = newNfts.some(
          (item) =>
            item.from?.toLowerCase() === (targetTxHash || '').toLowerCase(),
        );

        return hasTargetTx;
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
        // alertModule.info('Created NFT not loaded');
      }
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 429) {
        alertModule.error(
          'My NFTs: Too Many Requests. Rate limit 30 per second',
        );
      }
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
