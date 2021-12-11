import { TokenBalanceType } from '~/logic/tokens/types'
import { TronGridAPITokenType } from '~/logic/services/api/trongrid/types'

export default class TronGridAPITokenBalanceParser {
  parse = (token: TronGridAPITokenType): TokenBalanceType => {
    const balance = Number(token.balance) / 10 ** token.tokenDecimal
    const usdBalance = 0
    const rate = 0
    const diff = 0
    return {
      balance,
      usdBalance,
      diff,
      tokenInfo: {
        address: token.tokenId,
        name: token.tokenName,
        symbol: token.tokenAbbr,
        image: token.tokenLogo,
        decimals: token.tokenDecimal,
        rate: { usd: rate }
      }
    }
  }
}

// amount: "44350110.275358"
// balance: "44350110275358"
// tokenAbbr: "trx"
// tokenCanShow: 1
// tokenDecimal: 6
// tokenId: "_"
// tokenLogo: "https://coin.top/production/logo/trx.png"
// tokenName: "trx"
// tokenPriceInTrx: 1
// tokenType: "trc10"
