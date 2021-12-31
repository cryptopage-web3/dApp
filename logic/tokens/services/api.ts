import { Service, Inject } from 'vue-typedi'
import CovalentAPIService from '~/logic/services/api/covalent'
import TronGridAPIService from '~/logic/services/api/trongrid'
import { TokenBalanceType } from '~/logic/tokens/types'
import tokens from '~/logic/tokens'

@Service(tokens.TOKEN_API_SERVICE)
export default class TokenAPIService {
  @Inject(tokens.COVALENT_API_SERVICE)
  public covalentAPIService!: CovalentAPIService

  @Inject(tokens.TRONGRID_API_SERVICE)
  public tronGridAPIService!: TronGridAPIService

  public getTokenBalances = async (
    address: string
  ): Promise<TokenBalanceType[]> => {
    if (!address.match('^0x[a-fA-F0-9]{40}$')) {
      // if not evm related blockchain, actually it is tron
      return await this.tronGridAPIService.getTokenBalances(address)
    }
    return await this.covalentAPIService.getTokenBalances(address)
  }
}
