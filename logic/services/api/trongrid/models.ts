export type BaseTronGridAPIResponse = {
  error: boolean
  error_code: number | null
  error_message: string | null
}

export type TronGridAPITokensResponseDataItem = {
  balance: string
  amount: number
  tokenAbbr: string
  tokenCanShow: number
  tokenDecimal: number
  tokenId: string
  tokenLogo: string
  logo_url: string
  tokenName: string
  tokenPriceInTrx: string
  tokenType: string
}

export type TronGridAPITokensResponseData = {
  address: string
  updated_at: string
  next_update_at: string
  quote_currency: string
  chain_id: number
  pagination: null
  items: TronGridAPITokensResponseDataItem[]
}

export type TronGridAPITokensResponse = BaseTronGridAPIResponse & {
  data: TronGridAPITokensResponseData
}

export type TronGridAPITransactionsResponseDataItem = {
  blockNumber: string
  block_timestamp: number
  energy_fee: string
  energy_usage: string
  energy_usage_total: string
  net_fee: string
  net_usage: string
  raw_data: any
  raw_data_hex: string
  signature: string
  txID: string
}

type TronGridTRC20 = {
  contractAddress: string
  tokenDecimal: string
  tokenName: string
  tokenSymbol: string
}

export type TronGridTRC20Transaction = TronGridTRC20 &
  TronGridAPITransactionsResponseDataItem
