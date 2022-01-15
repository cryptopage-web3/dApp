import Vue from 'vue'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { BscConnector } from '@binance-chain/bsc-connector'
import Web3 from 'web3'
import { Service, Container, Inject } from 'vue-typedi'
import { Component } from 'nuxt-property-decorator'
import { deviceType } from '~/utils'
import { AuthServiceSigninResponseType } from '~/logic/auth/types'
import TokenService from '~/logic/tokens/services'
import tokens from '~/logic/tokens'

declare const window: Window &
  typeof globalThis & {
    ethereum: any
    BinanceChain: any
    okexchain: any
    tronLink: any
  }

const [ETHEREUM, BSC, POLYGON, TRON] = ['ETHEREUM', 'BSC', 'POLYGON', 'TRON']
const [METAMASK, WALLET_CONNECT, COIN98, BSC_WALLET, OKEX, TRON_LINK] = [
  'metamask',
  'walletConnect',
  'coin98',
  'bscWallet',
  'okex',
  'tron'
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
      name: 'Polygon Mainnet',
      slug: 'polygon'
    },
    80001: {
      network: 'polygon',
      name: 'Polygon TestNet',
      slug: 'polygon-testnet'
    },
    tron: { network: 'tron', name: 'Tron Mainnet', slug: 'tron' }
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

  private providerName = METAMASK
  private provider: WalletConnectProvider | undefined
  private metamaskConnected = false
  private okexConnected = false
  private bscConnected = false
  private walletConnectConnected = false
  private tronLinkConnected = false
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
   * Change the provider of web3
   * @param {String} provider - value of provider
   * @returns {Boolean} - if successfully connected
   */
  public async changeProviderName(providerName: string): Promise<void> {
    this.providerName = providerName

    if (providerName === 'walletConnect' && this.$web3) {
      const accounts = await this.$web3.eth.getAccounts()
      const networkId = await this.$web3.eth.net.getId()

      this.setOrChangeWeb3Data(accounts[0], Number(networkId))
    }
  }

  /**
   * Change current providerName
   * @param {String} providerName - value of providerName
   * @returns {String} - result of action
   */
  public switchProvider = async (providerName: string): Promise<string> => {
    /** подключение к metamask */

    if (providerName === METAMASK || providerName === COIN98) {
      if (!this.metamaskInstalled) {
        return 'notInstalled'
      }

      const status = await this.addMetamaskEventsListener()

      if (status) {
        await this.changeProviderName(providerName)
        window.localStorage.setItem('lastProvider', providerName)

        return 'success'
      }
    }

    /** подключение к walletConnect */

    if (providerName === 'walletConnect') {
      const status = await this.addWalletConnectEventsListener()

      if (status) {
        await this.changeProviderName(providerName)
        window.localStorage.setItem('lastProvider', 'walletConnect')

        return 'success'
      }
    }

    /** подключение к bsc_wallet */

    if (providerName === BSC_WALLET) {
      if (!this.bscInstalled) {
        return 'notInstalled'
      }

      const status = await this.addBSCEventsListener()

      if (status) {
        await this.changeProviderName(providerName)
        window.localStorage.setItem('lastProvider', providerName)

        return 'success'
      }
    }

    /** подключение к okex */

    if (providerName === OKEX) {
      if (!this.okexInstalled) {
        return 'notInstalled'
      }

      const status = await this.addOKEXEventsListener()

      if (status) {
        await this.changeProviderName(providerName)
        window.localStorage.setItem('lastProvider', providerName)

        return 'success'
      }
    }

    /** подключение к tron_link */

    if (providerName === TRON_LINK) {
      if (!this.tronInstalled) {
        return 'notInstalled'
      }

      const status = this.addTronLinkEventsListener()

      if (status) {
        await this.changeProviderName(providerName)
        window.localStorage.setItem('lastProvider', providerName)

        return 'success'
      }
    }

    /** остальное не поддерживаем */

    return 'error'
  }

  /**
   * Change current network
   * @param {String} networkName - name of the network blockchain, example ethereum, bsc, polygon
   */
  switchChain = async (networkName: string): Promise<void> => {
    if (networkName === TRON) {
      this.switchProvider(TRON_LINK)
      return
    }
    if (!Object.keys(this._CHAINS).includes(networkName)) {
      throw new Error('Network is not allowed.')
    }

    const chain = this._CHAINS[networkName]

    if (
      this.providerName !== METAMASK &&
      this.providerName !== COIN98 &&
      this.providerName !== OKEX
    ) {
      return
    }

    if (!chain) throw new Error('Chain not found.')
    if (!this.provider) {
      this.switchProvider(METAMASK)
      return
    }

    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chain.chainId }]
      })
    } catch (switchError: any) {
      const CHAIN_NOT_FOUND_CODE = 4902

      if (switchError.code === CHAIN_NOT_FOUND_CODE) {
        await this.provider.request({
          method: 'wallet_addEthereumChain',
          params: [chain]
        })
      }
    }
  }

  /**
   * Set or Change web3 data into instance.
   * @param {String} address - address of current wallet
   * @param {Number} chainId - chainId of current network
   * @returns {Void}
   */
  public setOrChangeWeb3Data(address: string, chainId: number | string): void {
    if (address) {
      Vue.set(this.data, 'address', address)
      this.data.address = address
    }
    if (chainId) {
      Vue.set(this.data, 'chainId', chainId)
      this.data.chainId = chainId
    }
  }

  /**
   * Adding event listener for walletconnect
   * @returns {Boolean}
   */
  private addWalletConnectEventsListener = async (): Promise<boolean> => {
    try {
      if (typeof window !== 'undefined' && !this.walletConnectConnected) {
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
      }
      return false
    } catch {
      return false
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
   * Adding event listener for binance wallet
   * @returns {Boolean}
   */
  private addBSCEventsListener = async (): Promise<boolean> => {
    try {
      const setBSCData = () => {
        setTimeout(async () => {
          const address: any = await bsc.getAccount()
          const chainId = await bsc.getChainId()
          this.setOrChangeWeb3Data(address, Number(chainId))
        }, 300)
      }
      if (this.bscInstalled) {
        if (!this.bscConnected) {
          await bsc.activate()
          window.BinanceChain.on('chainChanged', setBSCData)
          window.BinanceChain.on('accountsChanged', setBSCData)
          this.bscConnected = true
        }
        this.provider = window.BinanceChain
        setBSCData()
        return true
      }
      return false
    } catch {
      return false
    }
  }

  /**
   * Adding event listener for okex
   * @returns {Boolean}
   */
  private addOKEXEventsListener = async (): Promise<boolean> => {
    try {
      const setOKEXData = () => {
        setTimeout(() => {
          this.setOrChangeWeb3Data(
            window.okexchain.selectedAddress,
            Number(window.okexchain.chainId)
          )
        }, 300)
      }
      if (this.okexInstalled) {
        if (!this.okexConnected) {
          await window.okexchain.send('eth_requestAccounts')
          window.okexchain.on('chainChanged', setOKEXData)
          window.okexchain.on('accountsChanged', setOKEXData)
          this.okexConnected = true
        }
        this.provider = window.okexchain
        setOKEXData()
        return true
      }
      return false
    } catch {
      return false
    }
  }

  /**
   * Adding event listener for tronlink
   * @returns {Boolean}
   */
  private addTronLinkEventsListener = (): boolean => {
    try {
      const setTronata = () => {
        setTimeout(async () => {
          await window.tronLink.request({ method: 'tron_requestAccounts' })
          const address = window.tronLink.tronWeb.defaultAddress?.base58
          this.setOrChangeWeb3Data(address, 'tron')
        }, 300)
      }
      if (this.tronInstalled) {
        if (!this.tronLinkConnected) {
          this.tronLinkConnected = true
        }
        this.provider = window.tronLink.tronWeb
        setTronata()
        return true
      }
      return false
    } catch {
      return false
    }
  }

  /**
   * Initialize web3 provider functionality
   * @param {String} providerName - value of provider
   */
  public init = async (providerName = METAMASK): Promise<boolean> => {
    if (typeof window === 'undefined') {
      return false
    }

    const device = deviceType()
    if (device !== 'desktop') {
      providerName = 'walletConnect'
    }

    const status = await this.switchProvider(providerName)

    return Boolean(status === 'connected')
  }

  public signin = async (): Promise<AuthServiceSigninResponseType> => {
    const device = deviceType()
    await this.init()

    const commonError = {
      status: 'error',
      message: {
        title: 'Something wrong!',
        text: 'Please reload page and try again.'
      }
    }

    if (device !== 'desktop' && !this.walletConnectConnected) {
      await this.init('walletconnect')
      return {
        status: 'error',
        message: {
          title: 'WalletConnect not connected',
          text: 'Please connect to the wallet,<br>reload page and try again'
        }
      }
    }

    if (device === 'desktop' && !this.metamaskInstalled) {
      return {
        status: 'error',
        message: {
          title: 'Not found MetaMask extension',
          text: 'Please install MetaMask Ext.,<br>reload page and try again'
        }
      }
    }

    if (device === 'desktop' && !this.metamaskConnected) {
      return {
        status: 'error',
        message: {
          title: 'Not authorized in MetaMask',
          text: 'Please log in to the MetaMask Ext.,<br>reload page and try again'
        }
      }
    }

    if (!this.provider) {
      return commonError
    }

    return {
      status: 'success'
    }
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
