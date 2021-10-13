import { Service, Container } from 'vue-typedi'
import Web3 from 'web3'
import { ERC721ABI } from '~/constants/abi-samples'
import { FetchOneType, ERC721ContractDataType } from '~/logic/nft/types'
import tokens from '~/logic/tokens'

@Service(tokens.NFT_WEB3_SERVICE)
/**
 * Service class to fetch NFT from the API.
 *
 * Is injected into the module context to be used.
 * Should not be used as-is, only as a part of the module.
 */
export default class NFTWeb3Service {
  /**
   * @returns Global `web3` instance from the IoC container.
   */
  protected get $web3(): Web3 {
    return Container.get(tokens.WEB3) as Web3
  }

  /**
   * Fetches NFT from the remote URI (TokenURI).
   *
   * Uses runtime type validation to make sure
   * that types are up-to-date with the any server.
   *
   * @see https://github.com/aeirola/io-ts-promise.
   *
   * @returns Parsed response data.
   */
  public getContractData = async ({
    tokenId,
    contractAddress
  }: FetchOneType): Promise<ERC721ContractDataType> => {
    try {
      const contract = new this.$web3.eth.Contract(ERC721ABI, contractAddress)
      const tokenURI = await contract.methods.tokenURI(tokenId).call()
      const owner = await contract.methods.ownerOf(tokenId).call()
      return { tokenURI, owner }
    } catch {
      return { tokenURI: '', owner: '' }
    }
  }
}
