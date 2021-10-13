import { AxiosInstance } from 'axios'
import { Container } from 'vue-typedi'
import { ChainType } from '~/logic/types'
// import { ParamsTransactionsType } from '~/logic/transactions/types'
import tokens from '~/logic/tokens'
import AuthService from '~/logic/auth/service'

export class APIServiceMixin {
  protected etherscanAPIKey = 'VQDBC4GZA5MQT2F6IRW2U6RPH66HJRSF6S' // process.env.ETHERSCAN_API_KEY
  protected bscscanAPIKey = 'TQDPK4XAU4BZT8WQNN6IETRRXXDI37W64Y'
  protected polygonscanAPIKey = '4DCKF5U2YGR1HNG1KHWP8DSK47AH85W28Z'
  protected ethplorerAPIKey = 'EK-wMnq4-9P88Qoh-AC399'

  protected get authService(): AuthService {
    return Container.get(tokens.AUTH_SERVICE) as AuthService
  }

  protected apiServices = ['etherscan', 'bscscan', 'polygonscan', 'ethplorer']
  protected chains: ChainType[] = [
    {
      networkName: 'mainnet',
      serviceName: 'etherscan',
      chainId: 1,
      apiURL: 'https://api.etherscan.io/api?'
    },
    {
      networkName: 'ropsten',
      serviceName: 'etherscan',
      chainId: 3,
      apiURL: 'https://api-ropsten.etherscan.io/api?'
    },
    {
      networkName: 'rinkeby',
      serviceName: 'etherscan',
      chainId: 4,
      apiURL: 'https://api-rinkeby.etherscan.io/api?'
    },
    {
      networkName: 'goerli',
      serviceName: 'etherscan',
      chainId: 5,
      apiURL: 'https://api-goerli.etherscan.io/api?'
    },
    {
      networkName: 'kovan',
      serviceName: 'etherscan',
      chainId: 42,
      apiURL: 'https://api-kovan.etherscan.io/api?'
    },
    {
      networkName: 'mainnet',
      serviceName: 'bscscan',
      chainId: 56,
      apiURL: 'https://api.bscscan.com/api?'
    },
    {
      networkName: 'testnet',
      serviceName: 'bscscan',
      chainId: 97,
      apiURL: 'https://api-testnet.bscscan.com/api?'
    },
    {
      networkName: 'mainnet',
      serviceName: 'polygonscan',
      chainId: 137,
      apiURL: 'https://api.polygonscan.com/api?'
    },
    {
      networkName: 'testnet',
      serviceName: 'polygonscan',
      chainId: 80001,
      apiURL: 'https://api-testnet.polygonscan.com/api?'
    }
  ]

  protected get $axios(): AxiosInstance {
    return Container.get(tokens.AXIOS) as AxiosInstance
  }

  protected get chainId(): number {
    return Number(this.authService.selectedChainId)
  }

  public get chain(): ChainType {
    return (
      this.chains.find((chain: ChainType) => chain.chainId === this.chainId) ||
      this.chains[0]
    )
  }

  protected get baseURL(): string {
    return this.chain.apiURL
  }

  protected get APIKey(): string {
    if ([1, 3, 4, 5, 42].includes(this.chainId)) {
      return this.etherscanAPIKey // process.env.ETHERSCAN_API_KEY
    } else if ([56, 97].includes(this.chainId)) {
      return this.bscscanAPIKey // process.env.BSCSCAN_API_KEY
    } else if ([137, 80001].includes(this.chainId)) {
      return this.polygonscanAPIKey // process.env.POLYGONSCAN_API_KEY
    }
    return ''
  }

  protected get ethplorerBaseURL(): string {
    if (this.chain.chainId === 1) {
      return 'https://api.ethplorer.io/'
    } else if (this.chain.chainId === 42) {
      return 'https://kovan-api.ethplorer.io/'
    }
    return ''
  }

  protected get ethplorerApiKey(): string {
    if ([1, 42].includes(this.chainId)) {
      return 'freekey' // process.env.ETHPLORER_API_KEY
    }
    return 'freekey'
  }
}
