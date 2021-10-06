import * as ts from 'io-ts'
import {
  TokenInfo,
  EthplorerToken,
  EthplorerTokenInfo,
  EthplorerGetAddressInfoResponse
} from '~/logic/address/models'
export type TokenInfoType = ts.TypeOf<typeof TokenInfo>
export type EthplorerTokenType = ts.TypeOf<typeof EthplorerToken>
export type EthplorerTokenInfoType = ts.TypeOf<typeof EthplorerTokenInfo>
export type EthplorerGetAddressInfoResponseType = ts.TypeOf<
  typeof EthplorerGetAddressInfoResponse
>
