import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { alertModule } from '.';
import { NftService, TokensService, TransactionsService } from '~/services';
import { IAddressInfo, INft, IToken, ITransactionsPagination } from '~/types';
import { networkHelper } from '~/utils/networkHelper';
import { uniqueHashConcat } from '~/utils/array';

type TAddressInfo = IAddressInfo;
type TTransactionsPagination = ITransactionsPagination;

const tokensService = new TokensService();
const nftService = new NftService();
const transactionsService = new TransactionsService();

const defaultTransactions: TTransactionsPagination = {
  transactions: [],
  count: 0,
  pageSize: 10,
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

  nfts: INft[] = [];

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

  @Mutation
  public setInfo(info: TAddressInfo) {
    this.info = info;
  }

  @Mutation
  public setTokens(tokens: IToken[]) {
    this.tokens = [...tokens];
  }

  @Mutation
  public setNfts(nfts: INft[]) {
    this.nfts = [...nfts];
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
  public async fetchNfts() {
    try {
      const nfts = await nftService.getList({
        chainSlug: this.chainSlug,
        address: this.address,
      });

      this.setNfts(nfts);
    } catch {
      alertModule.error('Error getting nfts data');

      this.setNfts([]);
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

    this.setNfts([]);

    /** удаляем транзакции */

    this.setTransactions({
      ...defaultTransactions,
      transactions: [],
    });
  }
}
