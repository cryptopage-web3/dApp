import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'

import { deviceType } from '~/utils'

const infuraId = '735bdc2ee05b43488952a9cd53bdcfa1'

const [ETHEREUM, BSC, POLYGON] = ['ETHEREUM', 'BSC', 'POLYGON']

class Web3Provider {
  constructor() {
    this.init()
  }

  _NETWORKS = {
    ETHEREUM,
    BSC,
    POLYGON
  }

  _PROVIDERS = [
    {
      value: 'metamask',
      name: 'Metamask'
    },
    {
      value: 'walletConnect',
      name: 'Wallet Connect'
    }
  ]

  _CHAINS_BY_CHAIN_ID = {
    1: ETHEREUM,
    56: BSC,
    137: POLYGON
  }

  // chainid type is hexadecimal nubers
  _CHAINS = {
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
      blockExplorerUrls: ['https://explorer.matic.network/']
    },
    [ETHEREUM]: {
      chainId: '0x1'
    }
  }

  providerName = 'walletConnect'
  provider = null

  webConnected = false
  metamaskConnected = false
  walletConnectConnected = false
  web3 = null

  selectedAddress = ''
  selectedChainId = null

  chainChangeCallbacks = []

  runChainChangeCallbacks = () => {
    for(let fn in this.chainChangeCallbacks) {
      if (typeof fn === 'function') {
        fn()
      }
    }
  }

  /**
   * Change the provider of web3
   * @param {String} provider - value of provider
   * @returns {Boolean} - if successfully connected
   */
  changeProvider = async (provider) => {
    this.providerName = provider
    if (provider === 'walletConnect' && this.web3) {
      const accounts = await this.web3.eth.getAccounts()
      const networkId = await this.web3.eth.net.getId()
      this.setOrChangeWeb3Data(accounts[0], networkId)
    }
    return true
  }

  /**
   * Adding event listener for web
   * @returns {Boolean}
   */
  addWebEventsListener = async () => {
    try {
      if (typeof window !== 'undefined' && !this.walletConnectConnected) {
        const provider = await new WalletConnectProvider({
          infuraId,
          rpc: {
            1: `https://mainnet.infura.io/v3/${infuraId}`,
            4: `https://rinkeby.infura.io/v3/${infuraId}`,
            56: 'https://bsc-dataseed.binance.org',
            137: 'https://rpc-mainnet.maticvigil.com'
          }
        })
        await provider.enable()
        this.provider = provider
        this.web3 = await new Web3(provider)

        const accounts = await this.web3.eth.getAccounts()
        const networkId = await this.web3.eth.net.getId()
        this.setOrChangeWeb3Data(accounts[0], networkId)

        provider.on('accountsChanged', (accounts) => {
          this.setOrChangeWeb3Data(accounts[0])
        })
        provider.on('chainChanged', (chain) => {
          this.setOrChangeWeb3Data(null, chain)
        })
        provider.on('disconnect', async () => {
          await this.kill()
        })
        this.walletConnectConnected = true
        return true
      }
    } catch (e) {
      return false
    }
  }

  /**
   * Adding event listener for metamask
   * @returns {Boolean}
   */
  addMetamaskEventsListener = async () => {
    try {
      const setMetamaskData = () => {
        setTimeout(() => {
          this.setOrChangeWeb3Data(
            window.ethereum.selectedAddress,
            window.ethereum.chainId
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
    } catch (e) {
      return false
    }
  }

  /**
   * Adding event listener for walletconnect
   * @returns {Boolean}
   */
  addWalletConnectEventsListener = async () => {
    try {
      if (typeof window !== 'undefined' && !this.walletConnectConnected) {
        const provider = await new WalletConnectProvider({
          infuraId,
          rpc: {
            1: `https://mainnet.infura.io/v3/${infuraId}`,
            4: `https://rinkeby.infura.io/v3/${infuraId}`,
            56: 'https://bsc-dataseed.binance.org',
            137: 'https://rpc-mainnet.maticvigil.com'
          }
        })
        await provider.enable()
        this.provider = provider
        this.web3 = await new Web3(provider)

        const accounts = await this.web3.eth.getAccounts()
        const networkId = await this.web3.eth.net.getId()
        this.setOrChangeWeb3Data(accounts[0], networkId)

        provider.on('accountsChanged', (accounts) => {
          this.setOrChangeWeb3Data(accounts[0])
        })
        provider.on('chainChanged', (chain) => {
          this.setOrChangeWeb3Data(null, chain)
        })
        provider.on('close', async () => {
          await this.kill()
        })
        this.walletConnectConnected = true
        return true
      }
    } catch (e) {
      return false
    }
  }

  /**
   * Set or Change web3 data into instance.
   * @param {String} address - address of current wallet
   * @param {String} chainId - chainId of current network
   */
  setOrChangeWeb3Data(address, chainId) {
    chainId = Number(chainId)
    if (address) {
      window.$nuxt.$store._actions['auth/setSelectedAddress'][0](address)
      this.selectedAddress = address
    }
    if (chainId) {
      window.$nuxt.$store._actions['auth/setSelectedChainId'][0](chainId)
      this.selectedChainId = chainId
      this.runChainChangeCallbacks()
    }
  }

  /**
   * Execute transaction via selected provider
   * @param {Object} transaction - the transaction object with data, value, gasPrice etc.
   * @returns {String} - the transaction hash
   */
  sendTransaction = async (transaction) => {
    transaction.from = this.selectedAddress
    switch (this.providerName) {
      case 'metamask':
      case 'walletConnect': {
        return await this.provider.request({
          method: 'eth_sendTransaction',
          params: [transaction]
        })
      }
      default:
        return null
    }
  }

  /**
   * Initialize web3 provider functionality
   * @param {String} provider - value of provider
   */
  init = (provider = this.providerName) => {
    if (typeof window === 'undefined') {
      return
    }
    if (deviceType() !== 'desktop') {
      provider = 'walletConnect'
    }
    const lastProvider = window.localStorage.getItem('lastProvider')
    if (lastProvider) {
      provider = lastProvider
    }
    this.switchProvider(provider)
  }

  /**
   * Remove connections of provider and localstorage data
   */
  kill = async () => {
    if (this.walletConnectConnected) {
      if (typeof this.provider?.disconnect === 'function') {
        await this.provider?.disconnect()
      }
      if (typeof this.provider?.close === 'function') {
        await this.provider?.close()
      }
      this.walletConnectConnected = false
      return true
    }
    if (this.metamaskConnected) {
      this.metamaskConnected = false
      return true
    }
    this.web3 = null
    this.provider = ''
    window.localStorage.removeItem('lastProvider')
  }

  /**
   * Change current provider
   * @param {String} provider - value of provider
   * @returns {String} - result of action
   */
  switchProvider = async (provider) => {
    let connected = false
    switch (provider) {
      case 'metamask': {
        if (this.metamaskInstalled) {
          const status = await this.addMetamaskEventsListener()
          if (status) {
            await this.changeProvider(provider)
            connected = 'success'
            window.localStorage.setItem('lastProvider', 'metamask')
          } else {
            connected = 'error'
          }
        } else {
          connected = 'notInstalled'
        }
        break
      }
      case 'walletConnect': {
        const status = await this.addWalletConnectEventsListener()
        if (status) {
          await this.changeProvider(provider)
          connected = 'success'
          window.localStorage.setItem('lastProvider', 'walletConnect')
        } else {
          connected = 'error'
        }
        break
      }
      default: {
        break
      }
    }
    return connected
  }

  /**
   * Change current network
   * @param {String} networkName - name of the network blockchain, example ethereum, bsc, polygon
   */
  switchChain = async (networkName) => {
    const chain = this._CHAINS[networkName]
    try {
      if (this.providerName !== 'metamask') return
      if (!chain) throw new Error('Chain not found.')

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

  get metamaskInstalled() {
    return (
      typeof window !== 'undefined' &&
      typeof window?.ethereum?.on === 'function'
    )
  }

  // for demo purpose only
  _customExampleOfTransaction() {
    try {
      const transaction = {
        data: '0x095ea7b300000000000000000000000011111112542d85b3ef69ae05771c2dccff4faa26ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        gasPrice: '0xbdfd63e00',
        to: '0x6b175474e89094c44da98b954eedeac495271d0f',
        value: '0'
      }
      const txHash = this.sendTransaction(transaction)
      console.log('txHash', txHash) // eslint-disable-line no-console
      return txHash
    } catch (e) {
      console.error('error', e) // eslint-disable-line no-console
    }
  }
}

export default new Web3Provider()
