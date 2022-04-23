export type BaseCovalentAPIResponse = {
  error: boolean
  error_code: number | null
  error_message: string | null
}

export type CovalentAPITokensResponseDataItem = {
  balance: string
  balance_24h: string | null
  contract_address: string
  contract_decimals: number
  contract_name: string | null
  contract_ticker_symbol: string | null
  last_transferred_at: string | null
  logo_url: string
  nft_data: null | string
  quote: null | number
  quote_24h: null | number
  quote_rate: null | number
  quote_rate_24h: null | number
  supports_erc: null | string[]
  type: string
}

export type CovalentAPITokensResponseData = {
  address: string
  updated_at: string
  next_update_at: string
  quote_currency: string
  chain_id: number
  pagination: null
  items: CovalentAPITokensResponseDataItem[]
}

export type CovalentAPITokensResponse = BaseCovalentAPIResponse & {
  data: CovalentAPITokensResponseData
}
