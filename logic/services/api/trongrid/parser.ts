import { TokenBalanceType } from '~/logic/tokens/types'
// import { TransactionType } from '~/logic/transactions/types'
import {
  TronGridAPITokenType,
  TronGridAPITransactionType
} from '~/logic/services/api/trongrid/types'

export class TronGridAPITokenBalanceParser {
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

export class TronGridAPITransactionParser {
  parse = (tx: TronGridAPITransactionType): any => {
    return {
      gas: tx.energy_usage,
      hash: tx.txID,
      nonce: '',
      input: '',
      value: '',
      blockHash: '',
      blockNumber: tx.blockNumber,
      confirmations: '',
      cumulativeGasUsed: tx.energy_usage_total,
      from: '',
      gasPrice: tx.energy_fee,
      gasUsed: tx.net_usage,
      timeStamp: tx.block_timestamp,
      to: ''
    }
  }
}
