import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { normalizeEth } from './address/tx-normalizer/eth-normalizer';
import { defaultNormalizer } from './address/tx-normalizer/default-normalizer';
import { alertModule } from '.';
import { AuthService, TokensService, TransactionsService } from '~/services';
import {
  EChainType,
  EMainChain,
  IConnectChangeParams,
  IConnectToProviderParams,
  IConnectToProviderResponse,
  EProvider,
  IConnectData,
  IToken,
  ITransaction,
  EChainSlug,
} from '~/types';
import { networkHelper } from '~/utils/networkHelper';

type TConnectData = IConnectData;
type TConnectToProviderParams = IConnectToProviderParams;
type TConnectChangeParams = IConnectChangeParams;

const authService = new AuthService();
const tokensService = new TokensService();
const transactionsService = new TransactionsService();
let authProvider: any = null;

@Module({
  name: 'auth',
  namespaced: true,
  stateFactory: true,
})
export default class AuthModule extends VuexModule {
  isAuth = false;
  initLoading = true;
  dataLoaded = false;

  connect: IConnectData = {
    address: '',
    chainId: 1,
    providerSlug: null,
    /** не храним authProvider в сторе, т.к. ошибка при прокcировании объекта vue */
    // provider: null,
  };

  tokens: IToken[] = [];

  transactions: ITransaction[] = [];

  get address(): string {
    return this.connect.address;
  }

  get chainId(): string | number {
    return this.connect.chainId;
  }

  get chainName(): string {
    return networkHelper.getNetworkName(this.chainId);
  }

  get chainSlug(): string {
    return networkHelper.getNetworkSlug(this.chainId);
  }

  get chainType(): EChainType {
    return networkHelper.getNetworkType(this.chainId);
  }

  get providerSlug(): EProvider | null {
    return this.connect.providerSlug;
  }

  get provider(): any {
    return authProvider;
  }

  get inputs(): number {
    return new Set(
      this.transactions
        .filter(
          (tx: ITransaction) =>
            tx.to.toLowerCase() === this.address.toLowerCase(),
        )
        .map((tx: ITransaction) => tx.from),
    ).size;
  }

  get outputs(): number {
    return new Set(
      this.transactions
        .filter(
          (tx: ITransaction) =>
            tx.from.toLowerCase() === this.address.toLowerCase(),
        )
        .map((tx: ITransaction) => tx.to),
    ).size;
  }

  @Mutation
  public setAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  @Mutation
  public setInitLoading(loading: boolean) {
    this.initLoading = loading;
  }

  @Mutation
  public setChainId(chainId: string | number) {
    this.connect.chainId = chainId;
  }

  @Mutation
  public setConnect(connect: TConnectData) {
    this.connect = connect;
  }

  @Mutation
  public setDataLoaded(loaded: boolean) {
    this.dataLoaded = loaded;
  }

  @Mutation
  public setTokens(tokens: IToken[]) {
    this.tokens = [...tokens];
  }

  @Mutation
  public setTransactions(transactions: ITransaction[]) {
    this.transactions = transactions;
  }

  @Action
  public async init() {
    const auth = localStorage.getItem('auth');

    if (!auth) {
      setTimeout(() => {
        this.setInitLoading(false);
      });
      return;
    }

    try {
      const { providerSlug, chainId }: IConnectData = JSON.parse(auth);

      if (!providerSlug || !chainId) {
        await this.logout();
        this.setInitLoading(false);
        return;
      }

      /** узнаем текущие данные провайдера  */

      const providerResponse = await authService.connectToProvider(
        providerSlug,
        this.onConnectChange,
      );

      const { connectData } = providerResponse;

      /** если сети не совпадают, то не авторизуем */

      if (!connectData || connectData.chainId !== chainId) {
        await this.logout();
        this.setInitLoading(false);
        return;
      }

      /** сохраняем данные connect */

      window.localStorage.setItem(
        'auth',
        JSON.stringify({
          address: connectData.address,
          chainId: connectData.chainId,
          providerSlug: connectData.providerSlug,
        }),
      );

      authProvider = connectData.provider;
      connectData.provider = null;

      this.setConnect(connectData);
      this.setAuth(true);
      this.setInitLoading(false);
    } catch {
      await this.logout();
      this.setInitLoading(false);
    }
  }

  @Action
  public selectMainChain(chain: EMainChain) {
    const data = networkHelper.getChainData(chain);

    this.setChainId(
      [EMainChain.tron, EMainChain.solana].includes(chain)
        ? data.chainId
        : Number(data.chainId),
    );
  }

  @Action
  public async connectToProvider({
    chain,
    provider,
  }: TConnectToProviderParams): Promise<IConnectToProviderResponse> {
    /** подключаемся к провайдеру */

    const providerResponse = await authService.connectToProvider(
      provider,
      this.onConnectChange,
    );

    if (providerResponse.status === 'error') {
      await this.logout();

      return providerResponse;
    }

    const { connectData: providerConnectData } = providerResponse;

    if (!providerConnectData) {
      await this.logout();

      return {
        status: 'error',
        message: {
          title: 'No connection to wallet',
          text: 'Please try again',
        },
      };
    }

    /** меняем сеть в провайдере */

    const chainResponse = await authService.connectToChain(
      providerConnectData,
      chain,
    );

    if (chainResponse.status === 'error') {
      await this.logout();

      return chainResponse;
    }

    const { connectData } = chainResponse;

    if (!connectData) {
      await this.logout();

      return {
        status: 'error',
        message: {
          title: 'No connection to wallet',
          text: 'Please try again',
        },
      };
    }

    /** проверяем поддержку провайдером выбранной сети */

    if (
      !networkHelper.isSupportedByProvider(
        connectData?.chainId,
        connectData.providerSlug,
      )
    ) {
      await this.logout();

      return {
        status: 'error',
        message: {
          title: 'Wallet not connected',
          text: 'Please choose supported chain in the wallet<br>and accept connect',
        },
      };
    }

    /** подключение прошло успешно */

    window.localStorage.setItem(
      'auth',
      JSON.stringify({
        address: connectData.address,
        chainId: connectData.chainId,
        providerSlug: connectData.providerSlug,
      }),
    );

    authProvider = connectData.provider;
    connectData.provider = null;

    this.setConnect(connectData);
    this.setAuth(true);

    return chainResponse;
  }

  @Action
  public onConnectChange(params: TConnectChangeParams) {
    /** TODO: на проде всегда делаем logout,
     * но для тестирования мы должны пропускать rinkeby */

    const { chainId, address } = params;
    const providerSlug = this.providerSlug;
    const isChainChange = chainId !== this.chainId;
    const isAddressChange = address !== this.address;

    /** если не авторизованы, то никак не реагируем */

    if (!this.isAuth) {
      return;
    }

    /** если нет данных по адресу или сети, то сбрасываем авторизацию */

    if (!chainId || !address) {
      alertModule.error(
        `${networkHelper.getProviderTitle(providerSlug)} is disconnected`,
      );
      this.logout();
      return;
    }

    /** если нет изменений, то ничего не делаем */

    if (!isChainChange && !isAddressChange) {
      return;
    }

    /** если сеть не поддерживается провайдером, то сбрасываем авторизацию */

    if (!networkHelper.isSupportedByProvider(chainId, providerSlug)) {
      alertModule.error(
        `${networkHelper.getProviderTitle(
          providerSlug,
        )}: set unsupported chain`,
      );

      this.logout();
      return;
    }

    /** меняем данные connect */

    const connectData: IConnectData = {
      address,
      chainId,
      providerSlug,
    };

    window.localStorage.setItem('auth', JSON.stringify(connectData));

    this.setConnect(connectData);

    alertModule.success(
      `${networkHelper.getProviderTitle(providerSlug)}: ${
        isChainChange ? 'chain' : 'account'
      } is change`,
    );
  }

  @Action
  public async logout() {
    await authService.logout();

    window.localStorage.removeItem('auth');

    authProvider = null;

    this.setConnect({
      ...this.connect,
      address: '',
      providerSlug: null,
      provider: null,
    });

    this.setAuth(false);
  }

  @Action
  public async fetchData() {
    await this.fetchTokens();
    await this.fetchTransactions();

    this.setDataLoaded(true);
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
      alertModule.error('Error getting AUTH tokens data');

      this.setTokens([]);
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
      alertModule.error('Error getting AUTH transactions data');

      this.setTransactions([]);
    }
  }

  @Action
  public async fetchEthTransactions() {
    const { transactions } = await transactionsService.getEthList({
      chainSlug: this.chainSlug,
      address: this.address,
      pageSize: 200,
    });

    this.setTransactions(
      transactions.map((t) => normalizeEth(t, this.chainId)),
    );
  }

  @Action
  public async fetchDefaultTransactions() {
    const { transactions } = await transactionsService.getList({
      chainSlug: this.chainSlug,
      address: this.address,
      pageSize: 200,
    });

    this.setTransactions(
      transactions.map((t) => defaultNormalizer(t, this.address, this.chainId)),
    );
  }
}
