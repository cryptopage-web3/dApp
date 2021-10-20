import TokenBalanceParser from '~/logic/address/parser'
import {
  EthplorerGetAddressInfoResponseType,
  AddressInfoAdapterType,
  AddressInfoType
} from '~/logic/address/types'

const AddressInfoAdapter = (
  addressInfo: EthplorerGetAddressInfoResponseType
): AddressInfoAdapterType => {
  return {
    request: (): AddressInfoType => {
      const address = addressInfo.address
      const parser = new TokenBalanceParser()
      const ETHToken = parser.parseETHToken(addressInfo.ETH)
      let tokenInfo
      if (addressInfo.tokenInfo) {
        tokenInfo = parser.parseTokenInfo(addressInfo.tokenInfo)
      }
      let tokens = addressInfo.tokens
        ? addressInfo.tokens.map((token) => parser.parse(token))
        : []
      tokens = [ETHToken, ...tokens]
      const transactionsCount = addressInfo.countTxs
      return {
        address,
        tokenInfo,
        tokens,
        transactionsCount
      }
    }
  }
}

export default AddressInfoAdapter