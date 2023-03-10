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
  IVerifiedStatus,
  ISaveVerifiedStatusParams,
  EVerifiedStatus,
  EMessengerStatus,
  EConsentStatus,
} from '~/types';
import { networkHelper } from '~/utils/networkHelper';
import {
  FRACTAL_APPLICATION_NAME,
  FRACTAL_CLIENT_ID,
  FRACTAL_LEVEL,
  FRACTAL_URL,
} from '~/constants';

type TConnectData = IConnectData;
type TConnectToProviderParams = IConnectToProviderParams;
type TConnectChangeParams = IConnectChangeParams;
type TVerifiedStatus = IVerifiedStatus;
type TSaveVerifiedStatusParams = ISaveVerifiedStatusParams;
type TMessengerStatus = EMessengerStatus | null;
type TConsentStatus = EConsentStatus | null;

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
  showSignupModal = false;
  showBuyPageModal = false;

  connect: IConnectData = {
    address: '',
    chainId: 1,
    providerSlug: null,
    /** не храним authProvider в сторе, т.к. ошибка при прокcировании объекта vue */
    // provider: null,
  };

  verifiedStatus: TVerifiedStatus = {
    status: EVerifiedStatus.unverified,
    isChecked: false,
  };

  messengerStatus: TMessengerStatus = null;

  consentStatus: TConsentStatus = null;

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

  get isSignupCompleted(): boolean {
    return (
      this.isAuth &&
      this.verifiedStatus.isChecked &&
      this.messengerStatus === EMessengerStatus.success &&
      this.consentStatus === EConsentStatus.success
    );
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

  @Mutation
  public setVerifiedStatus(status: TVerifiedStatus) {
    this.verifiedStatus = status;
  }

  @Mutation
  public setMessengerStatus(status: TMessengerStatus) {
    this.messengerStatus = status;
  }

  @Mutation
  public setConsentStatus(status: TConsentStatus) {
    this.consentStatus = status;
  }

  @Mutation
  public setShowSignupModal(show: boolean) {
    this.showSignupModal = show;
  }

  @Mutation
  public setShowBuyPageModal(show: boolean) {
    this.showBuyPageModal = show;
  }

  @Action
  public async init() {
    const auth = localStorage.getItem('cp-auth');

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
        'cp-auth',
        JSON.stringify({
          address: connectData.address,
          chainId: connectData.chainId,
          providerSlug: connectData.providerSlug,
        }),
      );

      /** получаем данные verifiedStatus */

      const verifiedStatus = await this.getVerifiedStatus(connectData.address);

      /** получаем данные messengerStatus */

      const messengerStatus = await this.getMessengerStatus();

      /** получаем данные consentStatus */

      const consentStatus = await this.getConsentStatus();

      authProvider = connectData.provider;
      connectData.provider = null;

      this.setConnect(connectData);
      this.setVerifiedStatus(verifiedStatus);
      this.setMessengerStatus(messengerStatus);
      this.setConsentStatus(consentStatus);
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
      'cp-auth',
      JSON.stringify({
        address: connectData.address,
        chainId: connectData.chainId,
        providerSlug: connectData.providerSlug,
      }),
    );

    /** получаем данные verifiedStatus */

    const verifiedStatus = await this.getVerifiedStatus(connectData.address);

    /** получаем данные messengerStatus */

    const messengerStatus = await this.getMessengerStatus();

    /** получаем данные consentStatus */

    const consentStatus = await this.getConsentStatus();

    authProvider = connectData.provider;
    connectData.provider = null;

    this.setVerifiedStatus(verifiedStatus);
    this.setMessengerStatus(messengerStatus);
    this.setConsentStatus(consentStatus);
    this.setConnect(connectData);
    this.setAuth(true);

    return chainResponse;
  }

  @Action
  public async onConnectChange(params: TConnectChangeParams) {
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

    window.localStorage.setItem('cp-auth', JSON.stringify(connectData));

    /** получаем данные verifiedStatus */

    const verifiedStatus = await this.getVerifiedStatus(connectData.address);

    /** получаем данные messengerStatus */

    const messengerStatus = await this.getMessengerStatus();

    /** получаем данные consentStatus */

    const consentStatus = await this.getConsentStatus();

    this.setVerifiedStatus(verifiedStatus);
    this.setMessengerStatus(messengerStatus);
    this.setConsentStatus(consentStatus);
    this.setConnect(connectData);
    this.cleanData();

    alertModule.success(
      `${networkHelper.getProviderTitle(providerSlug)}: ${
        isChainChange ? 'chain' : 'account'
      } is change`,
    );
  }

  @Action
  public async fractalSign() {
    const lines = [
      `I authorize ${FRACTAL_APPLICATION_NAME} (${FRACTAL_CLIENT_ID}) to get a proof from Fractal that:`,
      `- I passed KYC level ${FRACTAL_LEVEL}`,
    ];

    const message = lines.join('\n');
    const account = this.address;
    let signature = '';

    /** получаем подпись с метамаска */

    try {
      signature = await this.provider.request({
        method: 'personal_sign',
        params: [message, account],
      });
    } catch {
      const verifiedStatus = {
        status: EVerifiedStatus.unverified,
        isChecked: false,
      };

      this.setVerifiedStatus(verifiedStatus);
      this.saveVerifiedStatus({ address: account, status: verifiedStatus });

      return false;
    }

    /** проверяем подпись в fractal */

    const encMessage = encodeURIComponent(message);
    const verifiedStatus = {
      status: EVerifiedStatus.unverified,
      isChecked: true,
    };

    try {
      const res = await fetch(
        `${FRACTAL_URL}?message=${encMessage}&signature=${signature}`,
      );
      const proof = await res.json();

      if (res.status === 200) {
        verifiedStatus.status = EVerifiedStatus.verified;
      } else if (res.status === 404 && proof?.error === 'user_pending') {
        verifiedStatus.status = EVerifiedStatus.pending;
      }
    } catch {}

    this.setVerifiedStatus(verifiedStatus);
    this.saveVerifiedStatus({ address: account, status: verifiedStatus });

    return true;
  }

  @Action
  public updateMessengerStatus(status: TMessengerStatus) {
    this.setMessengerStatus(status);
    this.saveMessengerStatus(status);

    return true;
  }

  @Action
  public updateConsentStatus(status: TConsentStatus) {
    this.setConsentStatus(status);
    this.saveConsentStatus(status);

    return true;
  }

  @Action
  public getVerifiedStatus(address: string): TVerifiedStatus {
    const str = window.localStorage.getItem('cp-signup-verified-status');
    const verifiedStatus = (str ? JSON.parse(str) : {}) as Record<
      string,
      TVerifiedStatus
    >;

    return (
      verifiedStatus[address] || {
        status: EVerifiedStatus.unverified,
        isChecked: false,
      }
    );
  }

  @Action
  public getMessengerStatus(): TMessengerStatus {
    const str = window.localStorage.getItem('cp-signup-messenger-status');

    return str as TMessengerStatus;
  }

  @Action
  public getConsentStatus(): TConsentStatus {
    const str = window.localStorage.getItem('cp-signup-consent-status');

    return str as TConsentStatus;
  }

  @Action
  public saveVerifiedStatus({ address, status }: TSaveVerifiedStatusParams) {
    const str = window.localStorage.getItem('cp-signup-verified-status');
    const verifiedStatus = (str ? JSON.parse(str) : {}) as Record<
      string,
      TVerifiedStatus
    >;
    verifiedStatus[address] = status;

    window.localStorage.setItem(
      'cp-signup-verified-status',
      JSON.stringify(verifiedStatus),
    );
  }

  @Action
  public saveMessengerStatus(status: TMessengerStatus) {
    if (!status) {
      window.localStorage.removeItem('cp-signup-messenger-status');
      return;
    }

    window.localStorage.setItem('cp-signup-messenger-status', status);
  }

  @Action
  public saveConsentStatus(status: TConsentStatus) {
    if (!status) {
      window.localStorage.removeItem('cp-signup-consent-status');
      return;
    }

    window.localStorage.setItem('cp-signup-consent-status', status);
  }

  @Action
  public async logout() {
    await authService.logout();

    window.localStorage.removeItem('cp-auth');

    authProvider = null;

    this.setConnect({
      ...this.connect,
      address: '',
      providerSlug: null,
      provider: null,
    });

    this.setVerifiedStatus({
      status: EVerifiedStatus.unverified,
      isChecked: false,
    });
    this.setMessengerStatus(null);
    this.setConsentStatus(null);
    this.setAuth(false);
    this.cleanData();
  }

  @Action
  public async fetchData() {
    if (!this.isAuth) {
      return;
    }

    await this.fetchTokens();
    await this.fetchTransactions();

    this.setDataLoaded(true);
  }

  @Action
  public cleanData() {
    this.setDataLoaded(false);
    this.setTokens([]);
    this.setTransactions([]);
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
