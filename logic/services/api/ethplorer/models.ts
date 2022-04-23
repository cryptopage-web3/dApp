export type EthplorerBalance = {
  balance: number
  rawBalance: string
}

export type EthplorerPrice = {
  rate: number
  currency: string | undefined
  diff: number
  diff7d: number | undefined
  diff30d: number | undefined
  marketCapUsd: number
  availableSupply: number
  volume24h: number | undefined
  volDiff1: number | undefined
  volDiff7: number | undefined
  volDiff30: number | undefined
  ts: number
}

export type EthplorerETH = {
  price: EthplorerPrice
  balance: number
  rawBalance: string
}

export type EthplorerContractInfo = {
  creatorAddress: string
  transactionHash: string
  timestamp: number
}

export type EthplorerTokenInfo = {
  address?: string
  coingecko?: string
  facebook?: string
  twitter?: string
  totalSupply?: string
  storageTotalSupply?: string
  name?: string
  symbol?: string
  decimals?: string | number
  publicTags?: string[]
  price?: EthplorerPrice | boolean
  owner?: string
  countOps?: number
  totalIn?: number
  totalOut?: number
  transfersCount?: number
  ethTransfersCount?: number
  holdersCount?: number
  issuancesCount?: number
  image?: string
  description?: string
  website?: string
  telegram?: string
  lastUpdated?: number
  slot?: number
}

export type EthplorerToken = {
  balance: number
  rawBalance: string
  totalIn: number
  totalOut: number
  tokenInfo: EthplorerTokenInfo
}

export type EthplorerGetAddressInfoResponse = {
  ETH: EthplorerETH
  address: string
  contractInfo: EthplorerContractInfo | undefined
  tokenInfo: EthplorerTokenInfo | undefined
  tokens: EthplorerToken[] | undefined
  countTxs: number
}
