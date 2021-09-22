export default class EtherscanAPI {
  /**
   * Create an APICall.
   * @constructor
   * @param {string} network - A string with the name for network.
   * @param {string} APIKey - A string with the API key for methods with limitations.
   */

  constructor(
    network = 'mainnet',
    APIKey = 'VQDBC4GZA5MQT2F6IRW2U6RPH66HJRSF6S'
  ) {
    this.network = network.toLowerCase()
    this.APIKey = APIKey
  }

  network = 'mainnet'
  APIKey = ''

  networks = {
    mainnet: 'https://api.etherscan.io',
    goerli: 'https://api-goerli.etherscan.io',
    kovan: 'https://api-kovan.etherscan.io',
    rinkeby: 'https://api-rinkeby.etherscan.io',
    ropsten: 'https://api-ropsten.etherscan.io'
  }

  get baseURL() {
    if (Object.keys(this.networks).includes(this.network)) {
      return this.networks[this.network] + '/api?'
    }
  }

  /**
   * Send request to the Etherscan API
   * @param {String} URL - URL address for request
   */
  send = async (URL) => {
    return await fetch(URL).then((response) => response.json())
  }

  /**
   * Call txList account method.
   * @param {Object} options - options with params for query string
   */
  txList = async (options) => {
    const requiredOptions = ['address']
    const defaultOptions = {
      startblock: 0,
      endblock: 99999999,
      page: 1,
      offset: 10,
      sort: 'desc'
    }
    const resultOptions = Object.assign(defaultOptions, options)
    resultOptions.module = 'account'
    resultOptions.action = 'txlist'
    requiredOptions.forEach((option) => {
      if (!(option in resultOptions)) {
        console.error(`ERROR: ${option} is required`) // eslint-disable-line no-console
      }
    })
    const params = new URLSearchParams(resultOptions).toString()
    const URL = `${this.baseURL}${params}&apikey=${this.APIKey}`
    return await this.send(URL)
  }

  /**
   * Call txList account method.
   * @param {Object} options - options with params for query string
   */
  tokenTx = async (options) => {
    const requiredOptions = ['address']
    const defaultOptions = {
      page: 1,
      offset: 10,
      sort: 'desc'
    }
    const resultOptions = Object.assign(defaultOptions, options)
    resultOptions.module = 'account'
    resultOptions.action = 'tokentx'
    requiredOptions.forEach((option) => {
      if (!(option in resultOptions)) {
        console.error(`ERROR: ${option} is required`) // eslint-disable-line no-console
      }
    })
    const params = new URLSearchParams(resultOptions).toString()
    const URL = `${this.baseURL}${params}&apikey=${this.APIKey}`
    return await this.send(URL)
  }

  /**
   * Call txList account method.
   * @param {Object} options - options with params for query string
   */
  tokenNFTTx = async (options) => {
    const requiredOptions = ['address']
    const defaultOptions = {
      page: 1,
      offset: 10,
      sort: 'desc'
    }
    const resultOptions = Object.assign(defaultOptions, options)
    resultOptions.module = 'account'
    resultOptions.action = 'tokennfttx'
    requiredOptions.forEach((option) => {
      if (!(option in resultOptions)) {
        console.error(`ERROR: ${option} is required`) // eslint-disable-line no-console
      }
    })
    const params = new URLSearchParams(resultOptions).toString()
    const URL = `${this.baseURL}${params}&apikey=${this.APIKey}`
    return await this.send(URL)
  }

  /**
   * Call txList account method.
   * @param {Object} options - options with address param
   */
  getBI = async ({ address }) => {
    const requiredOptions = ['address']
    const resultOptions = { address }
    resultOptions.module = 'contract'
    resultOptions.action = 'getabi'
    requiredOptions.forEach((option) => {
      if (!(option in resultOptions)) {
        console.error(`ERROR: ${option} is required`) // eslint-disable-line no-console
      }
    })
    const params = new URLSearchParams(resultOptions).toString()
    const URL = `${this.baseURL}${params}`
    return await this.send(URL)
  }
}
