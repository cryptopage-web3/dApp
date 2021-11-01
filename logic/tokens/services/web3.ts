import * as tPromise from 'io-ts-promise'
import { Service, Inject } from 'vue-typedi'
import Web3 from 'web3'
import { ERC20ABI, BalanceCheckerABI } from '~/constants/abi-samples'
import { TokenInfo } from '~/logic/tokens/models'
import { TokenInfoType, TokenBalanceType } from '~/logic/tokens/types'
import TokenIPFSService from '~/logic/tokens/services/ipfs'
import AuthService from '~/logic/auth/service'
import tokens from '~/logic/tokens'

@Service(tokens.TOKEN_WEB3_SERVICE)
export default class TokenWeb3Service {
  @Inject(tokens.AUTH_SERVICE)
  public authService!: AuthService

  @Inject(tokens.TOKEN_IPFS_SERVICE)
  public tokenIPFSService!: TokenIPFSService

  @Inject(tokens.WEB3)
  public $web3!: Web3

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
      const decimals = Number(await contract.methods.decimals().call())
      const symbol = await contract.methods.symbol().call()
      return await tPromise.decode(TokenInfo, {
        name,
        address,
        totalSupply,
        decimals,
        symbol
      })
    } catch {
      return null
    }
  }

  public getTokenBalances = async (
    address: string
  ): Promise<TokenBalanceType[]> => {
    try {
      const tokens = await this.tokenIPFSService.getAllTokens()
      const contractAddresses: string[] = []
      tokens.forEach((token, index) => {
        /**
         * Wrong addresses exists in the IPFSStorage response
         * Need to fix it
         */
        if (token.address.startsWith('0x')) {
          contractAddresses[index] = token.address
        }
      })
      const networks: { [chainId: number]: string } = {
        1: '0xb1f8e55c7f64d203c1400b9d8555d050f94adf39',
        3: '0x8D9708f3F514206486D7E988533f770a16d074a7',
        4: '0x3183B673f4816C94BeF53958BaF93C671B7F8Cf2',
        42: '0x55ABBa8d669D60A10c104CC493ec5ef389EC92bb',
        56: '0x2352c63A83f9Fd126af8676146721Fa00924d7e4',
        97: '0x2352c63A83f9Fd126af8676146721Fa00924d7e4',
        137: '0x2352c63A83f9Fd126af8676146721Fa00924d7e4',
        80001: '0x2352c63A83f9Fd126af8676146721Fa00924d7e4'
      }
      const contractAddress =
        this.authService.selectedChainId in Object.keys(networks)
          ? networks[this.authService.selectedChainId]
          : networks[1]
      const contract = new this.$web3.eth.Contract(
        BalanceCheckerABI,
        contractAddress
      )
      const balances = await contract.methods
        .balances([address], contractAddresses)
        .call()

      const result: TokenBalanceType[] = []
      tokens.forEach((tokenInfo: TokenInfoType, index: number): void => {
        const balance = balances[index] / 10 ** tokenInfo.decimals
        tokenInfo.rate = { usd: 0 }
        if (Number(balance) > 0) {
          result.push({
            balance,
            usdBalance: 0,
            diff: 0,
            tokenInfo
          })
        }
      })
      return result
    } catch (error) {
      return []
    }
  }
}
