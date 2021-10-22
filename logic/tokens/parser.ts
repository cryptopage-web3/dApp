import { CovalentAPITokenType } from '~/logic/tokens/types'
import { TokenBalanceType } from '~/logic/address/types'

export default class CovalentAPITokenParser {
  parse = (token: CovalentAPITokenType): TokenBalanceType => {
    const balance = Number(token.balance) / 10 ** token.contract_decimals
    const usdBalance = token.quote || 0 // balance * (token.quote_rate || 0)
    const rate = token.quote_rate || 0
    const diff = 0
    return {
      balance,
      usdBalance,
      rate,
      diff,
      tokenInfo: {
        address: token.contract_address,
        name: token.contract_name,
        symbol: token.contract_ticker_symbol,
        image: token.logo_url,
        decimals: token.contract_decimals
      }
    }
  }
}
