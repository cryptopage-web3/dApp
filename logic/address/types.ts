import * as ts from 'io-ts'
import {
  TokenInfo,
  EthplorerETH,
  EthplorerToken,
  EthplorerTokenInfo,
  EthplorerGetAddressInfoResponse,
  IPFSTokensStorageItem,
  IPFSTokensStorageItemResponse
} from '~/logic/address/models'
export type TokenInfoType = ts.TypeOf<typeof TokenInfo>
export type EthplorerETHType = ts.TypeOf<typeof EthplorerETH>
export type EthplorerTokenType = ts.TypeOf<typeof EthplorerToken>
export type EthplorerTokenInfoType = ts.TypeOf<typeof EthplorerTokenInfo>
export type EthplorerGetAddressInfoResponseType = ts.TypeOf<
  typeof EthplorerGetAddressInfoResponse
>
export type IPFSTokensStorageItemResponseType = ts.TypeOf<
  typeof IPFSTokensStorageItemResponse
>
export type IPFSTokensStorageItemType = ts.TypeOf<typeof IPFSTokensStorageItem>

export type TokenBalanceType = {
  balance: number
  usdBalance: number
  rate: number
  diff?: number
  tokenInfo?: TokenInfoType
}

export type AddressInfoType = {
  address: string
  tokenInfo?: TokenInfoType
  tokens: TokenBalanceType[]
  transactionsCount: number
}

export type AddressInfoAdapterType = {
  request: () => AddressInfoType
}
