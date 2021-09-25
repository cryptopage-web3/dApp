class API {
  etherscanAPIKey = 'VQDBC4GZA5MQT2F6IRW2U6RPH66HJRSF6S'
  networks = {
    etherscan: {
      mainnet: 'https://api.etherscan.io',
      goerli: 'https://api-goerli.etherscan.io',
      kovan: 'https://api-kovan.etherscan.io',
      rinkeby: 'https://api-rinkeby.etherscan.io',
      ropsten: 'https://api-ropsten.etherscan.io'
    },
    ethplorer: {
      mainnet: 'https://api.ethplorer.io/',
      kovan: 'https://kovan-api.ethplorer.io/'
    }
  }

  /**
   * Send request to the URL
   * @param {String} URL - URL address for request
   */
  send = async (URL) => {
    return await fetch(URL).then((response) => response.json())
  }

  /**
   * Get transactions from Etherscan API
   * https://etherscan.io/apidocs#accounts
   */
  async getTransactions({
    address,
    page = 1,
    offset = 10,
    sort = 'desc',
    type = 'transactions',
    network = 'mainnet'
  }) {
    const baseURL = this.networks.etherscan[network] + '/api?'
    const options = { address, page, offset, sort, module: 'account' }
    if (type === 'transactions') options.action = 'txlist'
    else if (type === 'tokens') options.action = 'tokentx'
    else if (type === 'nft') options.action = 'tokennfttx'
    const params = new URLSearchParams(options).toString()
    const URL = `${baseURL}${params}&apikey=${this.etherscanAPIKey}`
    return await this.send(URL)
  }

  /**
   * Get Contract ABI for Verified Contract Source Codes
   * https://etherscan.io/apidocs#contracts
   */
  getABI = async ({ address, network = 'mainnet' }) => {
    const baseURL = this.networks.etherscan[network] + '/api?'
    const options = { address, module: 'contract', action: 'getabi' }
    const params = new URLSearchParams(options).toString()
    const URL = `${baseURL}${params}`
    return await this.send(URL)
  }

  /**
   * Get address info from Ethplorer API
   * https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API
   */
  getAddressInfo = async ({ address, network = 'mainnet' }) => {
    const baseURL = this.networks.ethplorer[network]
    const URL = `${baseURL}getAddressInfo/${address}?apiKey=freekey`
    return await this.send(URL)
  }
}

export default new API()
