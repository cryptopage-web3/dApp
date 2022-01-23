import * as ts from 'io-ts'

export const BaseSolScanAPIResponse = ts.type({
  error: ts.boolean,
  error_code: ts.union([ts.number, ts.null]),
  error_message: ts.union([ts.string, ts.null])
})

export const SolScanAPITokensResponseDataItem = ts.type({
  lamports: ts.string,
  tokenAddress: ts.string,
  tokenAmount: ts.any,
  tokenIcon: ts.string,
  tokenSymbol: ts.string,
  tokenName: ts.any
})

export const SolScanAPITokensResponseData = ts.type({
  address: ts.string,
  updated_at: ts.string,
  next_update_at: ts.string,
  quote_currency: ts.string,
  chain_id: ts.number,
  pagination: ts.null,
  items: ts.array(SolScanAPITokensResponseDataItem)
})

export const SolScanAPITokensResponse = ts.intersection([
  BaseSolScanAPIResponse,
  ts.type({
    data: SolScanAPITokensResponseData
  })
])
