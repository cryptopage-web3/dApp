import { AxiosInstance } from 'axios'
import { Container } from 'vue-typedi'
// import { ParamsTransactionsType } from '~/logic/transactions/types'
import tokens from '~/logic/tokens'
import AuthService from '~/logic/auth/service'

class BaseAPIServiceMixin {
  protected get $axios(): AxiosInstance {
    return Container.get(tokens.AXIOS) as AxiosInstance
  }

  protected get authService(): AuthService {
    return Container.get(tokens.AUTH_SERVICE) as AuthService
  }

  protected get chainId(): any {
    return Number(this.authService.selectedChainId)
  }
}

export class EtherscanAPIServiceMixin extends BaseAPIServiceMixin {
  protected etherscanAPIKey = 'VQDBC4GZA5MQT2F6IRW2U6RPH66HJRSF6S' // process.env.ETHERSCAN_API_KEY
  protected bscscanAPIKey = 'TQDPK4XAU4BZT8WQNN6IETRRXXDI37W64Y'
  protected polygonscanAPIKey = '4DCKF5U2YGR1HNG1KHWP8DSK47AH85W28Z'
  protected apiURLMap: { [chainId in string | number]: string } = {
    1: 'https://api.etherscan.io/api?',
    3: 'https://api-ropsten.etherscan.io/api?',
    4: 'https://api-rinkeby.etherscan.io/api?',
    5: 'https://api-goerli.etherscan.io/api?',
    42: 'https://api-kovan.etherscan.io/api?',
    56: 'https://api.bscscan.com/api?',
    97: 'https://api-testnet.bscscan.com/api?',
    137: 'https://api.polygonscan.com/api?',
    80001: 'https://api-testnet.polygonscan.com/api?'
  }

  protected get symbol(): string {
    if ([1, 3, 4, 5, 42].includes(this.chainId)) return 'ETH'
    if ([56, 97].includes(this.chainId)) return 'BNB'
    if ([137, 80001].includes(this.chainId)) return 'MATIC'
    return ''
  }

  protected get APIKey(): string {
    if ([1, 3, 4, 5, 42].includes(this.chainId)) {
      return this.etherscanAPIKey // process.env.ETHERSCAN_API_KEY
    } else if ([56, 97].includes(this.chainId)) {
      return this.bscscanAPIKey // process.env.BSCSCAN_API_KEY
    } else if ([137, 80001].includes(this.chainId)) {
      return this.polygonscanAPIKey // process.env.POLYGONSCAN_API_KEY
    }
    return this.etherscanAPIKey
  }

  protected get baseURL(): string {
    return this.apiURLMap[this.chainId]
  }
}

export class EthplorerAPIServiceMixin extends BaseAPIServiceMixin {
  protected APIKey = 'EK-wMnq4-9P88Qoh-AC399'
  protected apiURLMap: { [chainId: number]: string } = {
    1: 'https://api.ethplorer.io',
    42: 'https://kovan-api.ethplorer.io/'
  }

  protected get baseURL(): string {
    return this.apiURLMap[this.chainId]
  }
}

export class CovalentAPIServiceMixin extends BaseAPIServiceMixin {
  protected APIKey = 'ckey_d826382c6f1b430c97ad2521c0d'

  protected get baseURL(): string {
    return `https://api.covalenthq.com/v1/${this.chainId}`
  }
}

export class TronGridAPIServiceMixin extends BaseAPIServiceMixin {
  protected get baseURL(): string {
    return 'https://apilist.tronscan.org/api/'
  }

  protected get transactionsURL(): string {
    return 'https://api.trongrid.io/v1/'
  }

  protected get symbol(): string {
    return 'TRX'
  }
}
export class SolScanAPIServiceMixin extends BaseAPIServiceMixin {
  protected get baseURL(): string {
    return 'https://public-api.solscan.io/account/'
  }

  protected get symbol(): string {
    return 'SOL'
  }
}
