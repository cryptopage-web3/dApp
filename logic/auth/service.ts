import Vue from 'vue'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { BscConnector } from '@binance-chain/bsc-connector'
import Web3 from 'web3'
import { Service, Container } from 'vue-typedi'
import { recoverPersonalSignature } from 'eth-sig-util'
import { Component } from 'nuxt-property-decorator'
import { deviceType } from '~/utils'
import { AuthServiceSigninResponseType } from '~/logic/auth/types'
import tokens from '~/logic/tokens'

declare const window: Window &
  typeof globalThis & {
    ethereum: any
    BinanceChain: any
  }

const [ETHEREUM, BSC, POLYGON] = ['ETHEREUM', 'BSC', 'POLYGON']
const [METAMASK, WALLET_CONNECT, COIN98, BSC_WALLET] = [
  'metamask',
  'walletConnect',
  'coin98',
  'bscWallet'
]

const bsc = new BscConnector({
  supportedChainIds: [56, 97]
})

@Service(tokens.AUTH_SERVICE)
@Component
export default class AuthService extends Vue {
  constructor() {
    super()
    if (typeof window !== 'undefined' && window.ethereum?.isCoin98) {
      this.defaultEthereumWallet = COIN98
    }
    let lastUsedProvider
    if (typeof window !== 'undefined' && window.localStorage.lastProvider) {
      lastUsedProvider = window.localStorage.lastProvider
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
    1337: {
      network: 'ganache',
      name: 'Ganache',
      slug: 'ganache'
    }
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
  data = {
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

  private providerName = METAMASK
  private defaultEthereumWallet = METAMASK
  private provider: WalletConnectProvider | undefined
  private metamaskConnected = false
  private bscConnected = false
  private walletConnectConnected = false
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
  public get selectedChainId(): number {
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
    let connected = 'error'
    if (providerName === METAMASK || providerName === COIN98) {
      if (this.metamaskInstalled) {
        const status = await this.addMetamaskEventsListener()
        if (status) {
          await this.changeProviderName(providerName)
          connected = 'success'
          window.localStorage.setItem('lastProvider', providerName)
        }
      } else {
        connected = 'notInstalled'
      }
    } else if (providerName === 'walletConnect') {
      const status = await this.addWalletConnectEventsListener()
      if (status) {
        await this.changeProviderName(providerName)
        connected = 'success'
        window.localStorage.setItem('lastProvider', 'walletConnect')
      }
    } else if (providerName === BSC_WALLET) {
      if (this.bscInstalled) {
        const status = await this.addBSCEventsListener()
        if (status) {
          await this.changeProviderName(providerName)
          connected = 'success'
          window.localStorage.setItem('lastProvider', providerName)
        }
      } else {
        connected = 'notInstalled'
      }
    }
    return connected
  }

  /**
   * Change current network
   * @param {String} networkName - name of the network blockchain, example ethereum, bsc, polygon
   */
  switchChain = async (networkName: string): Promise<void> => {
    if (!Object.keys(this._CHAINS).includes(networkName)) {
      throw new Error('Network is not allowed.')
    }
    const chain = this._CHAINS[networkName]
    if (this.providerName !== METAMASK && this.providerName !== COIN98) return
    if (!chain) throw new Error('Chain not found.')
    if (!this.provider) throw new Error('Provider not set.')
    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chain.chainId }]
      })
    } catch (switchError) {
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
  public setOrChangeWeb3Data(address: string, chainId: number): void {
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
      const setMetamaskData = () => {
        setTimeout(() => {
          this.setOrChangeWeb3Data(
            window.ethereum.selectedAddress,
            Number(window.ethereum.chainId)
          )
        }, 300)
      }
      if (this.metamaskInstalled) {
        if (!this.metamaskConnected) {
          await window.ethereum.send('eth_requestAccounts')
          window.ethereum.on('chainChanged', setMetamaskData)
          window.ethereum.on('accountsChanged', setMetamaskData)
          this.metamaskConnected = true
        }
        this.provider = window.ethereum
        setMetamaskData()
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

  private getSignaturePhrase = async (): Promise<string> => {
    const timestamp = new Date().getTime()
    const random = Math.random().toString(16).substr(2, length)
    const message = this.selectedAddress + timestamp + random
    const salt = await this.$sea.work(message, null, null, {
      name: 'SHA-256'
    })

    return await this.$sea.work(message, salt, null, {
      name: 'SHA-256'
    })
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
    if (device === 'desktop') {
      providerName = providerName || this.defaultEthereumWallet
    } else {
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
    const address = this.$web3.utils.toChecksumAddress(this.selectedAddress)
    const signaturePhrase = await this.getSignaturePhrase()
    const signature = await this.provider.request({
      method: 'personal_sign',
      params: [signaturePhrase, address]
    })
    try {
      let recoveredAddress = recoverPersonalSignature({
        data: signaturePhrase,
        sig: signature
      })
      recoveredAddress = this.$web3.utils.toChecksumAddress(recoveredAddress)
      if (address === recoveredAddress) {
        return {
          status: 'success',
          message: {
            title: 'Signature verified!',
            text: 'Successfully logged in'
          }
        }
      }

      return {
        status: 'error',
        message: {
          title: 'Signature verification failed',
          text: 'Please reload page and try again'
        }
      }
    } catch {
      return commonError
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
    }
  }

  /**
   * Remove connections of provider and localstorage data
   */
  public kill = async (): Promise<void> => {
    await this.disconnect()
    await this.close()
    this.provider = undefined
    this.providerName = ''
    window.localStorage.removeItem('lastProvider')
  }
}
