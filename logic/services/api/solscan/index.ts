import { Service } from 'vue-typedi'
import { SolScanAPIServiceMixin } from '~/logic/mixins/api'
import { SolScanAPITokenType } from '~/logic/services/api/solscan/types'
import {
  SolScanAPISolBalanceParser,
  SolScanAPITokenBalanceParser
} from '~/logic/services/api/solscan/parser'
import { TokenBalanceType } from '~/logic/tokens/types'
import tokens from '~/logic/tokens'

@Service(tokens.SOLSCAN_API_SERVICE)
export default class SolScanAPIService extends SolScanAPIServiceMixin {
  public getTokenBalances = async (
    address: string
  ): Promise<TokenBalanceType[]> => {
    const URL = `${this.baseURL}${address}`
    const TOKENS_URL = `${this.baseURL}tokens?account=${address}`
    try {
      const responseBalance = await this.$axios.get(URL)
      const responseTokens = await this.$axios.get(TOKENS_URL)
      const balanceParser = new SolScanAPISolBalanceParser()
      const sol = balanceParser.parse(responseBalance.data)
      const parser = new SolScanAPITokenBalanceParser()
      const sol20Tokens = responseTokens.data.filter(
        (e: any) => e.tokenName && e.tokenIcon
      )
      const tokens = sol20Tokens.map(
        (token: SolScanAPITokenType): TokenBalanceType => parser.parse(token)
      )
      tokens.unshift(sol)
      return tokens
    } catch {
      return []
    }
  }
}
