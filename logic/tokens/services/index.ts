import { Service, Inject } from 'vue-typedi'
import AddressService from '~/logic/address/services'
import TokenAPIService from '~/logic/tokens/services/api'
import TokenWeb3Service from '~/logic/tokens/services/web3'
import { TokenBalanceType } from '~/logic/address/types'
import tokens from '~/logic/tokens'

@Service(tokens.TOKEN_SERVICE)
export default class TokenService {
  @Inject(tokens.ADDRESS_SERVICE)
  public addressService!: AddressService

  @Inject(tokens.TOKEN_API_SERVICE)
  public tokenAPIService!: TokenAPIService

  @Inject(tokens.TOKEN_WEB3_SERVICE)
  public tokenWeb3Service!: TokenWeb3Service

  public getTokens = async (address: string): Promise<TokenBalanceType[]> => {
    let tokens = await this.tokenAPIService.getTokens(address)
    if (tokens.length === 0) {
      tokens = await this.tokenWeb3Service.getTokens(address)
      const ethToken = await this.getETHToken(address)
      tokens = [ethToken, ...tokens]
    }
    return tokens
  }

  public getETHToken = async (address: string): Promise<TokenBalanceType> => {
    const balance = await this.addressService.getBalance(address)
    return {
      balance: (balance / 10) * 18,
      usdBalance: 0,
      rate: 0,
      diff: 0,
      tokenInfo: {
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbitinfocharts.com%2Fimgs33%2Fethereum.png'
      }
    }
  }
}
