import Vue from 'vue';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { defaultNormalizer } from './address/tx-normalizer/default-normalizer';
import { normalizeEth } from './address/tx-normalizer/eth-normalizer';
import { alertModule } from '.';
import { NftsService, TokensService, TransactionsService } from '~/services';
import {
  EChainSlug,
  EChainType,
  IAddressInfo,
  INftsPagination,
  INftTransaction,
  INftTransactionsPagination,
  IToken,
  ITransaction,
  ITransactionsPagination,
} from '~/types';
import { networkHelper } from '~/utils/networkHelper';
import {
  uniqueHashConcat,
  uniqueNftConcat,
  uniqueNftTransactionConcat,
} from '~/utils/array';

type TAddressInfo = IAddressInfo;
type TTransactionsPagination = ITransactionsPagination;
type TNftsPagination = INftsPagination;
type TNftTransactionsPagination = INftTransactionsPagination;
type TNftTransactionDetailsParams = {
  index: number;
  nft: INftTransaction;
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

  transactions: TTransactionsPagination = { ...defaultTransactions };

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
  public setTransactions(transactions: TTransactionsPagination) {
    this.transactions = transactions;
  }

  @Mutation
  public setSyncNftTransactionsLoading(loading: boolean) {
    this.syncNftTransactionsLoading = loading;
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
    } catch {
      alertModule.error('Error getting nfts data');

      this.setNftTransactions({
        ...this.nftTransactions,
        hasAllPages: true,
      });
    }
  }

  @Action
  public async fetchNftTransactionDetails(nft: INftTransaction) {
    const { nfts } = this.nftTransactions;
    const index = nfts.findIndex((item) => item === nft);

    try {
      const data = await nftsService.getTransactionDetails({
        chainSlug: this.chainSlug,
        contractAddress: nft.contract_address,
        tokenId: nft.tokenId,
        blockNumber: nft.blockNumber,
      });

      this.setNftTransactionDetails({
        index,
        nft: {
          ...nft,
          ...data,
          hasDetails: true,
        },
      });
    } catch {
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
    } catch {
      alertModule.error('Error getting own nfts data');

      this.setOwnNfts({
        ...this.ownNfts,
        hasAllPages: true,
      });
    }
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
  public deleteNft(nft: INftTransaction): void {
    const { nfts } = this.nftTransactions;

    this.setNftTransactions({
      ...this.nftTransactions,
      nfts: nfts.filter((item) => item !== nft),
    });
  }

  @Action
  public async syncAddressTransactions(targetTxHash: string | null) {
    await this.syncNftTransactions(targetTxHash);
    // await this.syncTransactions(targetTxHash);
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

        const newNfts = uniqueNftTransactionConcat(list, oldNfts);

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
    } catch {
      alertModule.error('Failed to load created NFT');
    } finally {
      this.setSyncNftTransactionsLoading(false);
    }
  }

  // @Action
  // public syncTransactions(targetTxHash: string | null): void {}

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
