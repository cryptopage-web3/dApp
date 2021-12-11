import * as ts from 'io-ts'

export const BaseTronGridAPIResponse = ts.type({
  error: ts.boolean,
  error_code: ts.union([ts.number, ts.null]),
  error_message: ts.union([ts.string, ts.null])
})

export const TronGridAPITokensResponseDataItem = ts.type({
  balance: ts.string,
  amount: ts.number,
  tokenAbbr: ts.string,
  tokenCanShow: ts.number,
  tokenDecimal: ts.number,
  tokenId: ts.string,
  tokenLogo: ts.string,
  logo_url: ts.string,
  tokenName: ts.string,
  tokenPriceInTrx: ts.string,
  tokenType: ts.string
})

export const TronGridAPITokensResponseData = ts.type({
  address: ts.string,
  updated_at: ts.string,
  next_update_at: ts.string,
  quote_currency: ts.string,
  chain_id: ts.number,
  pagination: ts.null,
  items: ts.array(TronGridAPITokensResponseDataItem)
})

export const TronGridAPITokensResponse = ts.intersection([
  BaseTronGridAPIResponse,
  ts.type({
    data: TronGridAPITokensResponseData
  })
])
