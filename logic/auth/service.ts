import Vue from 'vue'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'
import { Service, Container } from 'vue-typedi'
import { recoverPersonalSignature } from 'eth-sig-util'
import { Component } from 'nuxt-property-decorator'
import { deviceType } from '~/utils'
import { CallbackType, AuthServiceSigninResponseType } from '~/logic/auth/types'
import tokens from '~/logic/tokens'

declare const window: Window &
  typeof globalThis & {
    ethereum: any
  }

const [ETHEREUM, BSC, POLYGON] = ['ETHEREUM', 'BSC', 'POLYGON']

@Service(tokens.AUTH_SERVICE)
@Component({})
export default class AuthService extends Vue {
  constructor() {
    super()
    this.init()
  }

  /*
   * This is hack for reacive selectedAddress and selectedChainId
   */
  public data = {
    selectedAddress: '',
    selectedChainId: 1
  }

  protected _PROVIDERS = [
    {
      value: 'metamask',
      name: 'Metamask'
    },
    {
      value: 'walletConnect',
      name: 'Wallet Connect'
    }
  ]

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

  protected get metamaskInstalled(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window?.ethereum?.on === 'function'
    )
  }

  private providerName = ''
  private provider: WalletConnectProvider | undefined
  private webConnected = false
  private metamaskConnected = false
  private walletConnectConnected = false
  private web3: Web3 = new Web3(Web3.givenProvider)

  protected get $sea(): any {
    return Container.get(tokens.SEA)
  }

  /*
   * Just reacive proxy for simple access
   */
  public get selectedAddress(): string {
    return this.data.selectedAddress
  }

  /*
   * Just reacive proxy for simple access
   */
  public get selectedChainId(): number {
    return this.data.selectedChainId
  }

  public get $web3(): Web3 {
    Container.set(tokens.WEB3, this.web3)
    return this.web3
  }

  /**
   * Change the provider of web3
   * @param {String} provider - value of provider
   * @returns {Boolean} - if successfully connected
   */
  public async changeProvider(providerName: string): Promise<void> {
    this.providerName = providerName
    if (providerName === 'walletConnect' && this.$web3) {
      const accounts = await this.$web3.eth.getAccounts()
      const networkId = await this.$web3.eth.net.getId()
      this.setOrChangeWeb3Data(accounts[0], networkId)
    }
  }

  /**
   * Change current providerName
   * @param {String} providerName - value of providerName
   * @returns {String} - result of action
   */
  private switchProvider = async (providerName: string): Promise<string> => {
    let connected = 'error'
    if (providerName === 'metamask') {
      if (this.metamaskInstalled) {
        const status = await this.addMetamaskEventsListener()
        if (status) {
          await this.changeProvider(providerName)
          connected = 'success'
          window.localStorage.setItem('lastProvider', 'metamask')
        }
      } else {
        connected = 'notInstalled'
      }
    } else if (providerName === 'walletConnect') {
      const status = await this.addWalletConnectEventsListener()
      if (status) {
        await this.changeProvider(providerName)
        connected = 'success'
        window.localStorage.setItem('lastProvider', 'walletConnect')
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
    if (this.providerName !== 'metamask') return
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
  private setOrChangeWeb3Data(address: string, chainId: number): void {
    if (address) {
      Vue.set(
        this.data,
        'selectedAddress',
        this.$web3.utils.toChecksumAddress(address) // Always set only checksum address
      )
    }
    if (chainId) {
      Vue.set(this.data, 'selectedChainId', chainId)
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
          // infuraProjectId,
          rpc: {
            1: `https://mainnet.infura.io/v3/${infuraProjectId}`,
            4: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
            56: 'https://bsc-dataseed.binance.org',
            137: 'https://rpc-mainnet.maticvigil.com'
          }
        })
        await provider.enable()
        this.provider = provider
        this.web3 = await new Web3(<any>provider)

        const accounts = await this.$web3.eth.getAccounts()
        const networkId = await this.$web3.eth.net.getId()
        this.setOrChangeWeb3Data(accounts[0], networkId)

        provider.on('accountsChanged', (accounts: string[]) => {
          this.setOrChangeWeb3Data(accounts[0], networkId)
        })
        provider.on('chainChanged', (chainId: number) => {
          this.setOrChangeWeb3Data(accounts[0], chainId)
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
            window.ethereum.networkVersion
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
    } catch (e) {
      return false
    }
  }

  private getSignaturePhrase = async () => {
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
  public init = async (providerName = 'metamask'): Promise<boolean> => {
    if (typeof window === 'undefined') {
      return false
    }
    if (deviceType() !== 'desktop') {
      providerName = 'walletConnect'
    }
    const lastProvider = window.localStorage.getItem('lastProvider')
    if (lastProvider) {
      providerName = lastProvider
    }
    const status = await this.switchProvider(providerName)
    return Boolean(status === 'connected')
  }

  public signin = async (): Promise<AuthServiceSigninResponseType> => {
    if (this.provider) {
      if (!this.metamaskInstalled) {
        return {
          status: 'error',
          message: 'MetaMask not installed'
        }
      } else if (!this.metamaskConnected) {
        return {
          status: 'error',
          message: 'Not authorized in MetaMask'
        }
      }
      try {
        const signaturePhrase = await this.getSignaturePhrase()
        const signature = await this.provider.request({
          method: 'personal_sign',
          params: [signaturePhrase, this.selectedAddress]
        })
        const recoveredAddress = recoverPersonalSignature({
          data: signaturePhrase,
          sig: signature
        })
        const address = this.$web3.utils.toChecksumAddress(recoveredAddress)
        if (address === this.selectedAddress) {
          return {
            status: 'success',
            message: 'Signature verified. Successfully logged in!'
          }
        } else {
          return {
            status: 'error',
            message: 'Recovered address not equals selectedAddress'
          }
        }
      } catch {
        return {
          status: 'error',
          message: 'Unknown error'
        }
      }
    }
    return {
      status: 'error',
      message: 'Provider not set'
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
