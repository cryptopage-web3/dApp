import { Service } from 'vue-typedi'
import { TronGridAPIServiceMixin } from '~/logic/mixins/api'
import { TronGridAPITokenType } from '~/logic/services/api/trongrid/types'
import TronGridAPITokenBalanceParser from '~/logic/services/api/trongrid/parser'
import { TokenBalanceType } from '~/logic/tokens/types'
import tokens from '~/logic/tokens'

@Service(tokens.TRONGRID_API_SERVICE)
export default class TronGridAPIService extends TronGridAPIServiceMixin {
  public getTokenBalances = async (
    address: string
  ): Promise<TokenBalanceType[]> => {
    const URL = `${this.baseURL}account?address=${address}`
    try {
      const response = await this.$axios.get(URL)
      const parser = new TronGridAPITokenBalanceParser()
      return response.data.tokens.map(
        (token: TronGridAPITokenType): TokenBalanceType => parser.parse(token)
      )
    } catch {
      return []
    }
  }
}
