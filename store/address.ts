import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { alertModule } from '.';
import { NftsService, TokensService, TransactionsService } from '~/services';
import {
  IAddressInfo,
  INftsPagination,
  INftTransactionsPagination,
  IToken,
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

const tokensService = new TokensService();
const nftsService = new NftsService();
const transactionsService = new TransactionsService();

const defaultTransactions: TTransactionsPagination = {
  transactions: [],
  count: 0,
  pageSize: 10,
  sort: 'desc',
  page: 0,
  hasAllPages: false,
};

const defaultNftTransactions: TNftTransactionsPagination = {
  nfts: [],
  count: 0,
  pageSize: 10,
  sort: 'desc',
  page: 0,
  hasAllPages: false,
};

const defaultOwnNfts: TNftsPagination = {
  nfts: [],
  count: 0,
  pageSize: 9,
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

  get chainName(): string {
    return networkHelper.getNetworkName(this.chainId);
  }

  get chainSymbol(): string {
    return networkHelper.getNetworkSymbol(this.chainId);
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
  public setOwnNfts(nfts: TNftsPagination) {
    this.ownNfts = nfts;
  }

  @Mutation
  public setTransactions(transactions: TTransactionsPagination) {
    this.transactions = transactions;
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
        skip: page,
        limit: pageSize,
      });

      this.setNftTransactions({
        ...this.nftTransactions,
        nfts: uniqueNftTransactionConcat(oldNfts, list),
        count,
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
  public async fetchOwnNfts() {
    try {
      const { page, pageSize, nfts: oldNfts } = this.ownNfts;
      const nextPage = page + 1;

      const { list, count } = await nftsService.getList({
        chainSlug: this.chainSlug,
        address: this.address,
        skip: page,
        limit: pageSize,
      });

      this.setOwnNfts({
        ...this.ownNfts,
        nfts: uniqueNftConcat(oldNfts, list),
        count,
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
      const {
        page,
        pageSize,
        transactions: oldTransactions,
      } = this.transactions;
      const nextPage = page + 1;

      const { transactions, count } = await transactionsService.getList({
        chainSlug: this.chainSlug,
        address: this.address,
        skip: page,
        limit: pageSize,
      });

      this.setTransactions({
        ...this.transactions,
        transactions: uniqueHashConcat(oldTransactions, transactions),
        count,
        page: nextPage,
        hasAllPages: transactions.length === 0,
      });
    } catch {
      alertModule.error('Error getting transactions data');

      this.setTransactions({
        ...this.transactions,
        hasAllPages: true,
      });
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
