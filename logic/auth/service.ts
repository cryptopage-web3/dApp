import Vue from 'vue'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { BscConnector } from '@binance-chain/bsc-connector'
import Web3 from 'web3'
import { Service, Container, Inject } from 'vue-typedi'
import { Component } from 'nuxt-property-decorator'
import {
  ConnectResponseType,
  TronRequestAccountsResponseType
} from '~/logic/auth/types'
import TokenService from '~/logic/tokens/services'
import tokens from '~/logic/tokens'

declare const window: Window &
  typeof globalThis & {
    ethereum: any
    BinanceChain: any
    okexchain: any
    tronLink: any
    solana: any
  }

const [ETHEREUM, BSC, POLYGON, TRON, SOLANA] = [
  'ETHEREUM',
  'BSC',
  'POLYGON',
  'TRON',
  'SOLANA'
]
const [METAMASK, WALLET_CONNECT, COIN98, BSC_WALLET, OKEX, TRON_LINK, PHANTOM] =
  [
    'metamask',
    'walletConnect',
    'coin98',
    'bscWallet',
    'okex',
    'tron',
    'phantom'
  ]

const bsc = new BscConnector({
  supportedChainIds: [56, 97]
})

@Service(tokens.AUTH_SERVICE)
@Component
export default class AuthService extends Vue {
  @Inject(tokens.TOKEN_SERVICE)
  public tokenService!: TokenService

  constructor() {
    super()

    /** получаем localStorage, где хранится статус авторизации и последний провайдер */

    const localStorage = typeof window !== 'undefined' && window.localStorage

    if (!localStorage) {
      return
    }

    /** если пользователь не авторизован, то не подключаемся к провайдеру */

    const auth = localStorage.getItem('auth')
    const { authenticated }: Record<string, any> = auth ? JSON.parse(auth) : {}

    if (!authenticated) {
      return
    }

    /** получаем провайдера и пробуем подключиться */

    const lastUsedProvider = localStorage.getItem('lastProvider')

    if (!lastUsedProvider) {
      this.logout()
      return
    }

    this.init(lastUsedProvider)
  }

  protected _PROVIDERS = [
    {
      value: METAMASK,
      name: 'Metamask'
    },
    {
      value: WALLET_CONNECT,
      name: 'Wallet Connect'
    },
    {
      value: COIN98,
      name: 'Coin98'
    }
  ]

  protected networksByChain: any = {
    1: { network: 'ethereum', name: 'Ethereum', slug: 'eth' },
    3: { network: 'ethereum', name: 'Ropsten TestNet', slug: 'ropsten' },
    4: { network: 'ethereum', name: 'Rinkeby TestNet', slug: 'rinkeby' },
    5: { network: 'ethereum', name: 'Goerly TestNet', slug: 'goerly' },
    42: { network: 'ethereum', name: 'Kovan TestNet', slug: 'kovan' },
    56: { network: 'bsc', name: 'BSC Network', slug: 'bsc' },
    97: { network: 'bsc', name: 'BSC TestNet', slug: 'bsc-testnet' },
    137: {
      network: 'polygon',
      name: 'Polygon',
      slug: 'polygon'
    },
    80001: {
      network: 'polygon',
      name: 'Polygon TestNet',
      slug: 'polygon-testnet'
    },
    tron: { network: 'tron', name: 'Tron', slug: 'tron' },
    solana: { network: 'solana', name: 'Solana', slug: 'solana' }
  }

  // chainid type is hexadecimal nubers
  protected _CHAINS = {
    [BSC]: {
      chainId: '0x38',
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      chainName: 'Binance Smart Chain',
      nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
      blockExplorerUrls: ['https://bscscan.com/']
    },
    [POLYGON]: {
      chainId: '0x89',
      rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
      chainName: 'Matic Mainnet',
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
      blockExplorerUrls: [
        'https://explorer.matic.network/',
        'https://polygonscan.com/'
      ]
    },
    [ETHEREUM]: {
      chainId: '0x1'
    },
    [TRON]: {
      chainId: 'tron'
    },
    [SOLANA]: {
      chainId: 'solana'
    }
  }

  /*
   * This is hack for reacive selectedAddress and selectedChainId
   */
  data: any = {
    address: '',
    chainId: 1
  }

  protected get metamaskInstalled(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window?.ethereum?.on === 'function'
    )
  }

  protected get bscInstalled(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window?.BinanceChain?.on === 'function'
    )
  }

  protected get okexInstalled(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window?.okexchain?.on === 'function'
    )
  }

  protected get tronInstalled(): boolean {
    return typeof window !== 'undefined' && typeof window?.tronLink === 'object'
  }

  protected get solanaInstalled(): boolean {
    return typeof window !== 'undefined' && typeof window?.solana === 'object'
  }

  private providerName = METAMASK
  private provider: WalletConnectProvider | undefined
  private metamaskConnected = false
  private okexConnected = false
  private bscConnected = false
  private walletConnectConnected = false
  private tronLinkConnected = false
  private phantomConnected = false
  protected get $web3(): any {
    return Container.get(tokens.WEB3)
  }

  protected get $sea(): any {
    return Container.get(tokens.SEA)
  }

  /**
   * Just reacive proxy for simple access
   */
  public get selectedAddress(): string {
    return this.data.address
  }

  /**
   * Just reacive proxy for simple access
   */
  public get selectedProviderName(): string {
    return this.providerName
  }

  /*
   * Just reacive proxy for simple access
   */
  public get selectedChainId(): any {
    return this.data.chainId
  }

  public changeWeb3(web3: Web3): void {
    Container.set(tokens.WEB3, web3)
  }

  /*
   * Just reacive proxy for simple access
   */
  public get selectedNetworkName(): string {
    return (
      (this.networksByChain[this.selectedChainId] &&
        this.networksByChain[this.selectedChainId].name) ||
      'unknown network'
    )
  }

  /*
   * Just reacive proxy for simple access
   */
  public get selectedNetworkSlug(): string {
    return (
      (this.networksByChain[this.selectedChainId] &&
        this.networksByChain[this.selectedChainId].slug) ||
      'unknown'
    )
  }

  /*
   * Just reacive proxy for simple access
   */
  public get selectedNetworkType(): string {
    return (
      (this.networksByChain[this.selectedChainId] &&
        this.networksByChain[this.selectedChainId].network) ||
      'ethereum'
    )
  }

  /**
   * Set or Change web3 data into instance.
   * @param {String} address - address of current wallet
   * @param {Number} chainId - chainId of current network
   * @returns {Void}
   */
  public setOrChangeWeb3Data(address: string, chainId: number | string): void {
    /** даже если значение пустое, то мы должны установить,
     * иначе будет показываться корректно предыдущий адрес */
    Vue.set(this.data, 'address', address || '')
    this.data.address = address || ''

    /** даже если значение пустое, то мы должны установить,
     * иначе будет показываться корректно предыдущая сеть */
    Vue.set(this.data, 'chainId', chainId || 0)
    this.data.chainId = chainId || 0
  }

  /**
   * Change current providerName
   * @param {String} providerName - value of providerName
   * @returns {String} - result of action
   */
  public switchProvider = async (
    providerName: string
  ): Promise<ConnectResponseType> => {
    /** подключение к metamask */

    if (providerName === METAMASK) {
      return await this.connectToMetamask()
    }

    /** подключение к walletConnect */

    if (providerName === 'walletConnect') {
      return await this.connectToWalletConnect()
    }

    /** подключение к bsc_wallet */

    if (providerName === BSC_WALLET) {
      return await this.connectToBscWallet()
    }

    /** подключение к okex */

    if (providerName === OKEX) {
      return await this.connectToOkex()
    }

    /** подключение к tron_link */

    if (providerName === TRON_LINK) {
      return await this.connectToTronLink()
    }

    /** подключение к phantom */

    if (providerName === PHANTOM) {
      return await this.connectToPhantom()
    }

    /** остальное не поддерживаем */

    return {
      status: 'error',
      message: {
        title: 'This provider is not available',
        text: 'Please try another provider'
      }
    }
  }

  /**
   * Change current network
   * @param {String} networkName - name of the network blockchain, example ethereum, bsc, polygon
   */
  switchChain = async (networkName: string): Promise<ConnectResponseType> => {
    /** проверяем поддерживаем ли данную сеть */

    const chain = this._CHAINS[networkName]

    if (!chain) {
      return {
        status: 'error',
        message: {
          title: 'Network is not allowed',
          text: 'Please try another network'
        }
      }
    }

    /** проверяем наличие активного провайдера
     * т.к. подключение к провайдеру должно быть раньше, чем к сети
     */

    if (!this.provider) {
      return {
        status: 'error',
        message: {
          title: 'Provider is not connected',
          text: 'Please reload page and try again'
        }
      }
    }

    /** TRON поддерживается только провайдером TRON_LINK */

    if (networkName === TRON) {
      if (this.providerName === TRON_LINK) {
        return {
          status: 'success'
        }
      }

      return {
        status: 'error',
        message: {
          title: 'Wrong provider for Tron',
          text: 'Please install and connect TronLink Ext.'
        }
      }
    }

    /** SOLANA поддерживается только провайдером PHANTOM */

    if (networkName === SOLANA) {
      if (this.providerName === PHANTOM) {
        return {
          status: 'success'
        }
      }

      return {
        status: 'error',
        message: {
          title: 'Wrong provider for Solana',
          text: 'Please install and connect Phantom Ext.'
        }
      }
    }

    /** Провайдер BSC_WALLET поддерживает только сеть BSC */

    if (this.providerName === BSC_WALLET) {
      if (networkName !== BSC) {
        return {
          status: 'error',
          message: {
            title: `Wrong provider for ${networkName}`,
            text: 'Please connect to another provider'
          }
        }
      }

      try {
        /** в провайдере BSC_WALLET пытаемся переключить сеть на BSC
         * т.к. в расширении можно выбрать другие сети
         */
        await this.provider.switchNetwork('bsc-mainnet')

        return {
          status: 'success'
        }
      } catch {
        return {
          status: 'error',
          message: {
            title: `Not connected to ${networkName}`,
            text: 'Please accept connect in the Binance Wallet Ext.'
          }
        }
      }
    }

    /** В metamask пробуем выставить выбранную сеть, какой бы она не была  */

    if (this.providerName === METAMASK) {
      try {
        /** пробуем переключиться на сеть */

        await this.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chain.chainId }]
        })

        return {
          status: 'success'
        }
      } catch (switchError: any) {
        const CHAIN_NOT_FOUND_CODE = 4902

        /** если это не ошибка отсутствия сети, то возвращаем ошибку */

        if (switchError.code !== CHAIN_NOT_FOUND_CODE) {
          return {
            status: 'error',
            message: {
              title: `Not connected to ${networkName}`,
              text: 'Please accept connect in the MetaMask Ext.'
            }
          }
        }

        /** пробуем добавить сеть */

        try {
          await this.provider.request({
            method: 'wallet_addEthereumChain',
            params: [chain]
          })

          return {
            status: 'success'
          }
        } catch {
          return {
            status: 'error',
            message: {
              title: `Not connected to ${networkName}`,
              text: 'Please accept connect in the MetaMask Ext.'
            }
          }
        }
      }
    }

    /** в остальных случаях показываем ошибку */

    return {
      status: 'error',
      message: {
        title: `Not connected to ${networkName}`,
        text: 'Please try with another network or provider'
      }
    }
  }

  /**
   * Если изменили сеть через клиент, то выполняем logout и запоминаем выбранную сеть
   * логика из https://openocean.finance/
   **/
  clientSwitchChain = (network: string): void => {
    /** указываем chainId от network */
    const chain = this._CHAINS[network]
    this.setOrChangeWeb3Data(
      '',
      [TRON, SOLANA].includes(network) ? chain.chainId : Number(chain.chainId)
    )
  }

  /**
   * ======== METAMASK ========
   *
   * подключение к metamask
   */
  public connectToMetamask = async (): Promise<ConnectResponseType> => {
    if (!this.metamaskInstalled) {
      return {
        status: 'error',
        message: {
          title: 'Not found MetaMask extension',
          text: 'Please install MetaMask Ext.,<br>reload page and try again'
        }
      }
    }

    const status = await this.addMetamaskEventsListener()

    if (!status) {
      return {
        status: 'error',
        message: {
          title: 'Not connected to MetaMask',
          text: 'Please accept connect in the MetaMask Ext.,<br>reload page and try again'
        }
      }
    }

    this.providerName = METAMASK
    window.localStorage.setItem('lastProvider', METAMASK)

    return {
      status: 'success'
    }
  }

  /**
   * Adding event listener for metamask
   * @returns {Boolean}
   */
  private addMetamaskEventsListener = async (): Promise<boolean> => {
    try {
      /** получаем selectedAddress и chainId с задержкой */

      const setMetamaskData = () => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            this.setOrChangeWeb3Data(
              window.ethereum.selectedAddress,
              Number(window.ethereum.chainId)
            )

            resolve()
          }, 300)
        })
      }

      /** запрос на подключение к metamask, привязка к событиям */

      if (this.metamaskInstalled) {
        if (!this.metamaskConnected) {
          await window.ethereum.send('eth_requestAccounts')

          window.ethereum.on('chainChanged', setMetamaskData)
          window.ethereum.on('accountsChanged', setMetamaskData)

          this.metamaskConnected = true
        }

        this.provider = window.ethereum

        await setMetamaskData()

        return true
      }

      return false
    } catch {
      return false
    }
  }
  /**
   * ========================
   */

  /**
   * ======== WALLET_CONNECT ========
   *
   * подключение к walletConnect
   */
  public connectToWalletConnect = async (): Promise<ConnectResponseType> => {
    const status = await this.addWalletConnectEventsListener()

    if (!status) {
      return {
        status: 'error',
        message: {
          title: 'WalletConnect not connected',
          text: 'Please connect to the wallet,<br>reload page and try again'
        }
      }
    }

    this.providerName = WALLET_CONNECT
    window.localStorage.setItem('lastProvider', WALLET_CONNECT)

    return {
      status: 'success'
    }
  }

  /**
   * Adding event listener for walletconnect
   * @returns {Boolean}
   */
  private addWalletConnectEventsListener = async (): Promise<boolean> => {
    try {
      if (typeof window === 'undefined' || this.walletConnectConnected) {
        return false
      }

      const infuraProjectId = 'VQDBC4GZA5MQT2F6IRW2U6RPH66HJRSF6S' // process.env.INFURA_PROJECT_ID
      const provider = await new WalletConnectProvider({
        infuraId: infuraProjectId,
        rpc: {
          1: `https://mainnet.infura.io/v3/${infuraProjectId}`,
          4: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
          56: 'https://bsc-dataseed.binance.org',
          137: 'https://rpc-mainnet.maticvigil.com'
        }
      })

      await provider.enable()
      this.provider = provider

      const $web3 = await new Web3(<any>provider)
      this.changeWeb3($web3)

      const accounts = await this.$web3.eth.getAccounts()
      const networkId = await this.$web3.eth.net.getId()
      this.setOrChangeWeb3Data(accounts[0], Number(networkId))

      provider.on('accountsChanged', (accounts: string[]) => {
        this.setOrChangeWeb3Data(accounts[0], Number(networkId))
      })

      provider.on('chainChanged', (chainId: number) => {
        this.setOrChangeWeb3Data(accounts[0], Number(chainId))
      })

      provider.on('close', async () => {
        await this.kill()
      })

      this.walletConnectConnected = true

      return true
    } catch {
      return false
    }
  }
  /**
   * ========================
   */

  /**
   * ======== BSC_WALLET ========
   *
   * подключение к bsc_wallet
   */
  public connectToBscWallet = async (): Promise<ConnectResponseType> => {
    if (!this.bscInstalled) {
      return {
        status: 'error',
        message: {
          title: 'Not found Binance Wallet extension',
          text: 'Please install Binance Wallet Ext.,<br>reload page and try again'
        }
      }
    }

    const status = await this.addBSCEventsListener()

    if (!status) {
      return {
        status: 'error',
        message: {
          title: 'Not connected to Binance Wallet',
          text: 'Please accept connect in the Binance Ext.,<br>reload page and try again'
        }
      }
    }

    this.providerName = BSC_WALLET
    window.localStorage.setItem('lastProvider', BSC_WALLET)

    return {
      status: 'success'
    }
  }

  /**
   * Adding event listener for binance wallet
   * @returns {Boolean}
   */
  private addBSCEventsListener = async (): Promise<boolean> => {
    try {
      /** получаем selectedAddress и chainId с задержкой */

      const setBSCData = () => {
        return new Promise<void>((resolve) => {
          setTimeout(async () => {
            const address: any = await bsc.getAccount()
            const chainId = await bsc.getChainId()
            this.setOrChangeWeb3Data(address, Number(chainId))

            resolve()
          }, 300)
        })
      }

      /** запрос на подключение к binance wallet, привязка к событиям */

      if (this.bscInstalled) {
        if (!this.bscConnected) {
          await bsc.activate()

          window.BinanceChain.on('chainChanged', setBSCData)
          window.BinanceChain.on('accountsChanged', setBSCData)

          this.bscConnected = true
        }

        this.provider = window.BinanceChain

        await setBSCData()

        return true
      }

      return false
    } catch {
      return false
    }
  }
  /**
   * ========================
   */

  /**
   * ======== OKEX ========
   *
   * подключение к okex
   */
  public connectToOkex = async (): Promise<ConnectResponseType> => {
    if (!this.okexInstalled) {
      return {
        status: 'error',
        message: {
          title: 'Not found MetaX extension',
          text: 'Please install MetaX Ext.,<br>reload page and try again'
        }
      }
    }

    const status = await this.addOKEXEventsListener()

    if (!status) {
      return {
        status: 'error',
        message: {
          title: 'Not connected to MetaX',
          text: 'Please accept connect in the MetaX Ext.,<br>reload page and try again'
        }
      }
    }

    this.providerName = OKEX
    window.localStorage.setItem('lastProvider', OKEX)

    return {
      status: 'success'
    }
  }

  /**
   * Adding event listener for okex
   * @returns {Boolean}
   */
  private addOKEXEventsListener = async (): Promise<boolean> => {
    try {
      /** получаем selectedAddress и chainId с задержкой */

      const setOKEXData = () => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            this.setOrChangeWeb3Data(
              window.okexchain.selectedAddress,
              Number(window.okexchain.chainId)
            )

            resolve()
          }, 300)
        })
      }

      /** запрос на подключение к okex, привязка к событиям */

      if (this.okexInstalled) {
        if (!this.okexConnected) {
          await window.okexchain.send('eth_requestAccounts')

          window.okexchain.on('chainChanged', setOKEXData)
          window.okexchain.on('accountsChanged', setOKEXData)

          this.okexConnected = true
        }

        this.provider = window.okexchain

        await setOKEXData()

        return true
      }

      return false
    } catch {
      return false
    }
  }
  /**
   * ========================
   */

  /**
   * ======== TRON_LINK ========
   *
   * подключение к tron_link
   */
  public connectToTronLink = async (): Promise<ConnectResponseType> => {
    if (!this.tronInstalled) {
      return {
        status: 'error',
        message: {
          title: 'Not found TronLink extension',
          text: 'Please install TronLink Ext.,<br>reload page and try again'
        }
      }
    }

    const status = await this.addTronLinkEventsListener()

    if (!status) {
      return {
        status: 'error',
        message: {
          title: 'Not connected to TronLink',
          text: 'Please accept connect in the TronLink Ext.,<br>reload page and try again'
        }
      }
    }

    this.providerName = TRON_LINK
    window.localStorage.setItem('lastProvider', TRON_LINK)

    return {
      status: 'success'
    }
  }

  /**
   * Adding event listener for tronlink
   * @returns {Boolean}
   */
  private addTronLinkEventsListener = async (): Promise<boolean> => {
    try {
      /** получаем selectedAddress и chainId с задержкой */

      const setTronData = () => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            const address = window.tronLink.tronWeb.defaultAddress?.base58
            this.setOrChangeWeb3Data(address, 'tron')

            resolve()
          }, 300)
        })
      }

      /** запрос на подключение к tron, привязка к событиям */

      if (this.tronInstalled) {
        if (!this.tronLinkConnected) {
          const response: TronRequestAccountsResponseType =
            await window.tronLink.request({ method: 'tron_requestAccounts' })

          if (response.code !== 200) {
            throw new Error('Request denied by TronLink Ext.')
          }

          this.tronLinkConnected = true
        }

        this.provider = window.tronLink.tronWeb

        await setTronData()

        return true
      }

      return false
    } catch {
      return false
    }
  }
  /**
   * ========================
   */

  /**
   * ======== PHANTOM ========
   *
   * подключение к phantom
   */
  public connectToPhantom = async (): Promise<ConnectResponseType> => {
    if (!this.solanaInstalled) {
      return {
        status: 'error',
        message: {
          title: 'Not found Phantom extension',
          text: 'Please install Phantom Ext.,<br>reload page and try again'
        }
      }
    }

    const status = await this.addPhantomEventsListener()

    if (!status) {
      return {
        status: 'error',
        message: {
          title: 'Not connected to Phantom',
          text: 'Please accept connect in the Phantom Ext.,<br>reload page and try again'
        }
      }
    }

    this.providerName = PHANTOM
    window.localStorage.setItem('lastProvider', PHANTOM)

    return {
      status: 'success'
    }
  }

  /**
   * Adding event listener for phantom
   * @returns {Boolean}
   */
  private addPhantomEventsListener = async (): Promise<boolean> => {
    try {
      /** получаем selectedAddress и chainId с задержкой */

      const setSolanaData = () => {
        return new Promise<void>((resolve) => {
          setTimeout(async () => {
            const result = await window.solana.connect()
            const address = result?.publicKey?.toString()
            this.setOrChangeWeb3Data(address, 'solana')

            resolve()
          }, 300)
        })
      }

      /** запрос на подключение к phantom, привязка к событиям */

      if (this.solanaInstalled) {
        if (!this.phantomConnected) {
          await window.solana.connect()

          this.phantomConnected = true
        }

        this.provider = window.solana

        await setSolanaData()

        return true
      }

      return false
    } catch {
      return false
    }
  }
  /**
   * ========================
   */

  /**
   * Initialize web3 provider functionality
   * @param {String} providerName - value of provider
   */
  public init = async (providerName: string): Promise<boolean> => {
    if (typeof window === 'undefined') {
      return false
    }

    const status = await this.switchProvider(providerName)

    return status.status === 'success'
  }

  public disconnect = async (): Promise<void> => {
    if (
      this.walletConnectConnected &&
      this.provider &&
      typeof this.provider.disconnect === 'function'
    ) {
      await this.provider.disconnect()
      this.walletConnectConnected = false
    } else if (this.metamaskConnected) {
      this.metamaskConnected = false
    } else if (this.bscConnected) {
      this.bscConnected = false
    } else if (this.tronLinkConnected) {
      this.tronLinkConnected = false
    } else if (this.phantomConnected) {
      this.phantomConnected = false
    }
  }

  public close = async (): Promise<void> => {
    if (
      this.walletConnectConnected &&
      this.provider &&
      typeof this.provider.close === 'function'
    ) {
      await this.provider.close()
      this.walletConnectConnected = false
    } else if (this.metamaskConnected) {
      this.metamaskConnected = false
    } else if (this.bscConnected) {
      this.bscConnected = false
    } else if (this.tronLinkConnected) {
      this.tronLinkConnected = false
    } else if (this.phantomConnected) {
      this.phantomConnected = false
    }
  }

  public logout = () => {
    const auth = {
      authenticated: false,
      status: true
    }

    window.localStorage.setItem('auth', JSON.stringify(auth))
  }

  /**
   * Remove connections of provider and localstorage data
   */
  public kill = async (): Promise<void> => {
    await this.disconnect()
    await this.close()
    this.logout()
    this.provider = undefined
    this.providerName = ''
    window.localStorage.removeItem('lastProvider')
  }
}
