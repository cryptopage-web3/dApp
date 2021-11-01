import { Container, Service } from 'vue-typedi'
import Web3 from 'web3'
import { ERC20ABI } from '~/constants/abi-samples'
import tokens from '~/logic/tokens'

@Service(tokens.ADDRESS_WEB3_SERVICE)
export default class AddressWeb3Service {
  protected get $web3(): Web3 {
    return Container.get(tokens.WEB3) as Web3
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
