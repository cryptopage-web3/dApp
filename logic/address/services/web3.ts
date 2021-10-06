import * as tPromise from 'io-ts-promise'
import { Service } from 'vue-typedi'
import { ERC20ABI } from '~/constants/abi-samples'
import { web3 } from '~/plugins/web3'
import { TokenInfo } from '~/logic/address/models'
import { TokenInfoType } from '~/logic/address/types'
import tokens from '~/logic/tokens'


@Service(tokens.ADDRESS_WEB3_SERVICE)
export default class AddressWeb3Service {
  /**
   * Get contract name, totalSupply, decimals and symbol from  web3
   */
  public getTokenInfo = async (
    address: string
  ): Promise<TokenInfoType | undefined> => {
    try {
      const contract = new web3.eth.Contract(ERC20ABI, address)
      const name = await contract.methods.name().call()
      const totalSupply = await contract.methods.totalSupply().call()
      const decimals = await contract.methods.decimals().call()
      const symbol = await contract.methods.symbol().call()
      return await tPromise.decode(TokenInfo, {
        name,
        contractAddress: address,
        totalSupply,
        decimals,
        symbol
      })
    } catch {
      return undefined
    }
  }
}
