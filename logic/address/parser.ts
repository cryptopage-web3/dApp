import {
  EthplorerTokenType,
  EthplorerTokenInfoType,
  TokenInfoType,
  TokenBalanceType,
  EthplorerETHType
} from '~/logic/address/types'

export default class TokenBalanceParser {
  parseETHToken(eth: EthplorerETHType): TokenBalanceType {
    const price = eth.price || {
      rate: 0,
      diff: 0,
      marketCapUsd: 0,
      availableSupply: 0,
      ts: 0
    }
    const ethToken = {
      balance: eth.balance,
      rawBalance: eth.rawBalance || `${eth.balance}`,
      totalIn: 0,
      totalOut: 0,
      tokenInfo: {
        address: '',
        decimals: '18',
        symbol: 'ETH',
        name: 'Ethereum',
        coingecko: '',
        facebook: '',
        twitter: '',
        storageTotalSupply: '',
        publicTags: [''],
        price,
        owner: '',
        countOps: 0,
        totalIn: 0,
        totalOut: 0,
        transfersCount: 0,
        ethTransfersCount: 0,
        holdersCount: 0,
        issuancesCount: 0,
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbitinfocharts.com%2Fimgs33%2Fethereum.png',
        description: '',
        website: '',
        telegram: '',
        lastUpdated: 0,
        slot: 0
      }
    }
    return this.parse(ethToken)
  }

  parseImage(tokenInfo: EthplorerTokenInfoType): string {
    let image = ''
    if (tokenInfo.image && tokenInfo.image.startsWith('https')) {
      image = tokenInfo.image
    } else if (tokenInfo.image && !tokenInfo.image.startsWith('https')) {
      image = 'https://ethplorer.io' + tokenInfo.image
    }
    return image
  }

  parseTokenInfo(tokenInfo: EthplorerTokenInfoType): TokenInfoType {
    return {
      address: tokenInfo.address ? tokenInfo.address : '',
      totalSupply: tokenInfo.totalSupply ? tokenInfo.totalSupply : '',
      name: tokenInfo.name ? tokenInfo.name : '',
      symbol: tokenInfo.symbol ? tokenInfo.symbol : '',
      decimals: tokenInfo.decimals ? Number(tokenInfo.decimals) : 18,
      image: this.parseImage(tokenInfo)
    }
  }

  parseRate(tokenInfo: EthplorerTokenInfoType): number {
    return Number(
      typeof tokenInfo.price === 'object' ? tokenInfo.price.rate : 0
    )
  }

  parseDiff(tokenInfo: EthplorerTokenInfoType): number {
    return Number(
      typeof tokenInfo.price === 'object' ? tokenInfo.price.diff : 0
    )
  }

  parseBalance(token: EthplorerTokenType): number {
    const decimals = Number(token.tokenInfo.decimals) || 18
    const balance = Number(token.rawBalance)
    return balance / 10 ** decimals
  }

  parseUSDBalance(token: EthplorerTokenType): number {
    const rate = this.parseRate(token.tokenInfo)
    if (rate) {
      const decimals = Number(token.tokenInfo.decimals) || 18
      const balance = Number(token.rawBalance)
      return rate * (balance / 10 ** decimals)
    }
    return rate
  }

  parse(token: EthplorerTokenType): TokenBalanceType {
    if (token.tokenInfo) {
      return {
        balance: this.parseBalance(token),
        rate: this.parseRate(token.tokenInfo),
        usdBalance: this.parseUSDBalance(token),
        diff: this.parseDiff(token.tokenInfo),
        tokenInfo: this.parseTokenInfo(token.tokenInfo)
      }
    }
    return {
      balance: 0,
      rate: 0,
      usdBalance: 0
    }
  }
}
