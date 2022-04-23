export type BaseSolScanAPIResponse = {
  error: boolean
  error_code: number | null
  error_message: string | null
}

export type SolScanAPITokensResponseDataItem = {
  lamports: string
  tokenAddress: string
  tokenAmount: any
  tokenIcon: string
  tokenSymbol: string
  tokenName: any
}

export type SolScanAPITokensResponseData = {
  address: string
  updated_at: string
  next_update_at: string
  quote_currency: string
  chain_id: number
  pagination: null
  items: SolScanAPITokensResponseDataItem[]
}

export type SolScanAPITokensResponse = BaseSolScanAPIResponse & {
  data: SolScanAPITokensResponseData
}

export type SolScanAPITransactionsResponseDataItem = {
  blockTime: number
  fee: number
  lamport: number
  signer: any
  parsedInstruction: any
  txHash: string
}

type SolScanSOL20 = {
  contractAddress: string
  tokenDecimal: string
  tokenName: string
  tokenSymbol: string
}

export type SolScanSOL20Transaction = SolScanSOL20 &
  SolScanAPITransactionsResponseDataItem
