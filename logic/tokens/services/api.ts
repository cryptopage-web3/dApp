import * as tPromise from 'io-ts-promise'
import { Service } from 'vue-typedi'
import { CovalentAPIServiceMixin } from '~/logic/mixins'
import { CovalentAPITokensResponse } from '~/logic/tokens/models'
import CovalentAPITokenParser from '~/logic/tokens/parser'
import { CovalentAPITokenType } from '~/logic/tokens/types'
import { TokenBalanceType } from '~/logic/address/types'
import tokens from '~/logic/tokens'

@Service(tokens.TOKEN_API_SERVICE)
export default class TokenAPIService extends CovalentAPIServiceMixin {
  public getTokens = async (address: string): Promise<TokenBalanceType[]> => {
    const URL = `${this.baseURL}/address/${address}/balances_v2/?key=${this.APIKey}`
    try {
      const response = await this.$axios.get(URL)
      const data = await tPromise.decode(
        CovalentAPITokensResponse,
        response.data
      )
      const parser = new CovalentAPITokenParser()
      return data.data.items.map(
        (token: CovalentAPITokenType): TokenBalanceType => parser.parse(token)
      )
    } catch {
      return []
    }
  }
}
