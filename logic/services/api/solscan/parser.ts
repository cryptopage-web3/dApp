import { TokenBalanceType } from '~/logic/tokens/types'
import {
  SolScanAPITokenType
} from '~/logic/services/api/solscan/types'

export class SolScanAPISolBalanceParser {
  parse = (token: any): TokenBalanceType => {
    const balance = Number(token.lamports) / 10 ** 9
    const usdBalance = 0
    const rate = 0
    const diff = 0
    return {
      balance,
      usdBalance,
      diff,
      tokenInfo: {
        address: token.tokenId,
        name: 'Solana',
        symbol: 'Sol',
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
        decimals: 9,
        rate: { usd: rate }
      }
    }
  }
}

export class SolScanAPITokenBalanceParser {
  parse = (token: SolScanAPITokenType): TokenBalanceType => {
    const balance =
      Number(token.tokenAmount.amount) / 10 ** token.tokenAmount.decimals
    const usdBalance = 0
    const rate = 0
    const diff = 0
    return {
      balance,
      usdBalance,
      diff,
      tokenInfo: {
        address: token.tokenAddress,
        name: token.tokenName,
        symbol: token.tokenSymbol,
        image: token.tokenIcon,
        decimals: token.tokenAmount.decimals,
        rate: { usd: rate }
      }
    }
  }
}
