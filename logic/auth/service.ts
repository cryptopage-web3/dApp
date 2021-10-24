import Vue from 'vue'
import WalletConnectProvider from '@walletconnect/web3-provider'
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
  }

const [ETHEREUM, BSC, POLYGON] = ['ETHEREUM', 'BSC', 'POLYGON']

@Service(tokens.AUTH_SERVICE)
@Component
export default class AuthService extends Vue {
  constructor() {
    super()
    this.init()
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

  /*
   * This is hack for reacive selectedAddress and selectedChainId
   */
  data = {
    address: '',
    chainId: 1
  }

  providerName = ''
  provider: WalletConnectProvider | undefined
  webConnected = false
  metamaskConnected = false
  walletConnectConnected = false

  protected get metamaskInstalled(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window?.ethereum?.on === 'function'
    )
  }

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
  public get selectedChainId(): number {
    return this.data.chainId
  }

  public changeWeb3(web3: Web3): void {
    Container.set(tokens.WEB3, web3)
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
          await this.changeProviderName(providerName)
          connected = 'success'
          window.localStorage.setItem('lastProvider', 'metamask')
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
      Vue.set(this.data, 'address', address)
      this.data.address = address
    }
    if (chainId) {
      Vue.set(this.data, 'chainId', chainId)
      this.data.chainId = chainId
    }
    console.log('data in setOrChangeWeb3Data', address, chainId)
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
  public init = async (providerName = 'metamask'): Promise<boolean> => {
    if (typeof window === 'undefined') {
      return false
    }
    const device = deviceType()
    if (device === 'desktop') {
      providerName = 'metamask'
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
