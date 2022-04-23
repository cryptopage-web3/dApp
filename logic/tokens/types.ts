import {
  TokenInfo,
  IPFSTokensStorageItem,
  IPFSTokensStorageItemResponse
} from '~/logic/tokens/models'

export type TokenInfoType = TokenInfo
export type TokenBalanceType = {
  balance: number
  usdBalance: number
  diff?: number
  tokenInfo: TokenInfoType
}

export type IPFSTokensStorageItemResponseType = IPFSTokensStorageItemResponse

export type IPFSTokensStorageItemType = IPFSTokensStorageItem
