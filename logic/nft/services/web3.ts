import { Service, Container } from 'vue-typedi'
import Web3 from 'web3'
import { ERC721ABI } from '~/constants/abi-samples'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '~/constants/contract'
import {
  FetchOneType,
  ERC721ContractDataType,
  ISendNFTWeb3,
  ISendNFTCommentWeb3,
  IActivateCommentsWeb3
} from '~/logic/nft/types'
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
   * Get TokenURI and owner from contract
   */
  public getContractData = async ({
    tokenId,
    contractAddress
  }: FetchOneType): Promise<ERC721ContractDataType | null> => {
    try {
      const contract = new this.$web3.eth.Contract(ERC721ABI, contractAddress)
      const tokenURI = await contract.methods.tokenURI(tokenId).call()
      const owner = await contract.methods.ownerOf(tokenId).call()
      let comments = null

      /** если NFT создана через наш контракт, то получаем его комментарии */
      if (contractAddress.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()) {
        const ownContract = new this.$web3.eth.Contract(
          CONTRACT_ABI,
          CONTRACT_ADDRESS
        )

        /**
         * если запрос возвращает исключение,
         * то предполагаем, что комментарии не были включены при создании NFT
         */
        try {
          comments = await ownContract.methods.tokenComments(tokenId).call()
        } catch {}
      }

      return { tokenURI, owner, comments }
    } catch {
      return null
    }
  }

  /** Action safeMint by contract */
  public sendSafeMint = ({ params, callbacks }: ISendNFTWeb3) => {
    const contract = new this.$web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

    contract.methods
      .safeMint(params.hash, params.comment)
      .send({
        from: params.from
      })
      .on('transactionHash', callbacks.onTransactionHash)
      .on('receipt', callbacks.onReceipt)
      .on('error', callbacks.onError)
  }

  /** Action comment by contract */
  public sendComment = ({ params, callbacks }: ISendNFTCommentWeb3) => {
    const contract = new this.$web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

    contract.methods
      .comment(params.tokenId, params.comment, params.like)
      .send({
        from: params.from
      })
      .on('transactionHash', callbacks.onTransactionHash)
      .on('receipt', callbacks.onReceipt)
      .on('error', callbacks.onError)
  }

  /** Action commentActivate by contract */
  public activateComments = ({ params, callbacks }: IActivateCommentsWeb3) => {
    const contract = new this.$web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

    contract.methods
      .commentActivate(params.tokenId)
      .send({
        from: params.from
      })
      .on('transactionHash', callbacks.onTransactionHash)
      .on('receipt', callbacks.onReceipt)
      .on('error', callbacks.onError)
  }
}
