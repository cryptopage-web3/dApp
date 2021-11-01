import { Service, Inject } from 'vue-typedi'
import CovalentAPIService from '~/logic/services/api/covalent'
import { TokenBalanceType } from '~/logic/tokens/types'
import tokens from '~/logic/tokens'

@Service(tokens.TOKEN_API_SERVICE)
export default class TokenAPIService {
  @Inject(tokens.COVALENT_API_SERVICE)
  public covalentAPIService!: CovalentAPIService

  public getTokenBalances = async (
    address: string
  ): Promise<TokenBalanceType[]> => {
    return await this.covalentAPIService.getTokenBalances(address)
  }
}
