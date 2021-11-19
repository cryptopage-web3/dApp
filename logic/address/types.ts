import { TokenInfoType, TokenBalanceType } from '~/logic/tokens/types'

export type AddressInfoType = {
  address: string
  tokenInfo?: TokenInfoType | null
  tokens: TokenBalanceType[]
  transactionsCount: number
}

export type AddressInfoAdapterType = {
  request: () => AddressInfoType
}
