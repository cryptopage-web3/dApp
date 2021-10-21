import { Container, Service } from 'vue-typedi'
import Web3 from 'web3'
import * as tPromise from 'io-ts-promise'
import { ERC20ABI } from '~/constants/abi-samples'
import { TokenInfo } from '~/logic/address/models'
import { TokenInfoType } from '~/logic/address/types'
import tokens from '~/logic/tokens'

@Service(tokens.ADDRESS_WEB3_SERVICE)
export default class AddressWeb3Service {
  protected get $web3(): Web3 {
    return Container.get(tokens.WEB3) as Web3
  }

  /**
   * Get contract name, totalSupply, decimals and symbol from  web3
   */
  public getTokenInfo = async (
    address: string
  ): Promise<TokenInfoType | null> => {
    try {
      const contract = new this.$web3.eth.Contract(ERC20ABI, address)
      const name = await contract.methods.name().call()
      const totalSupply = await contract.methods.totalSupply().call()
      const decimals = await contract.methods.decimals().call()
      const symbol = await contract.methods.symbol().call()
      return await tPromise.decode(TokenInfo, {
        name,
        address,
        totalSupply,
        decimals,
        symbol
      })
    } catch (error) {
      console.log('error', error)
      return null
    }
  }

  public getBalanceOf = async (
    address: string,
    contractAddress: string
  ): Promise<string> => {
    const contract = new this.$web3.eth.Contract(ERC20ABI, contractAddress)
    const balanceOf = await contract.methods.balanceOf(address).call()
    const decimals = await contract.methods.decimals().call()
    const balance = balanceOf / 10 ** decimals
    return balance.toString()
  }

  public getBalance = async (address: string): Promise<number> => {
    try {
      const balance = await this.$web3.eth.getBalance(address)
      console.log('balance in getBalance', Number(balance))
      return Number(balance)
    } catch {
      return 0
    }
  }

  public getTransactionsCount = async (address: string): Promise<number> => {
    try {
      return await this.$web3.eth.getTransactionCount(address)
    } catch {
      return 0
    }
  }
}
