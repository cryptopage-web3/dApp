import { Service, Container } from 'vue-typedi'
import Web3 from 'web3'
import { ERC721ABI } from '~/constants/abi-samples'
import {
  FetchOneType,
  ERC721ContractDataType,
  ISendNFTWeb3,
  ISendNFTCommentWeb3,
  IActivateCommentsWeb3,
  IBurnParamsType
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

  private getNetworkName = (): Promise<string> => {
    return this.$web3.eth.getChainId().then((chainId: number) => {
      const networks: { [chainId: number]: string } = {
        1: 'eth',
        3: 'ropsten',
        4: 'rinkeby',
        5: 'goerly',
        42: 'kovan',
        56: 'bsc',
        97: 'bsc-testnet',
        137: 'polygon',
        80001: 'polygon-testnet'
      }
      return networks[chainId]
    })
  }

  /**
   * Get TokenURI and owner from contract
   */
  public getTokenURIAndOwner = async ({
    tokenId,
    contractAddress
  }: FetchOneType): Promise<ERC721ContractDataType | null> => {
    try {
      const contract = new this.$web3.eth.Contract(ERC721ABI, contractAddress)
      const tokenURI = await contract.methods.tokenURI(tokenId).call()
      const owner = await contract.methods.ownerOf(tokenId).call()
      let isExists = false
      let comments = null
      /** если NFT создана через наш контракт, то получаем его комментарии */
      const networkName = await this.getNetworkName()
      const NFT_CONTRACT = await import(
        `../../../contracts/${networkName}/PageNFT.json`
      )
      const COMMENT_CONTRACT = await import(
        `../../../contracts/${networkName}/PageComment.json`
      )
      const COMMENT_MINTER_CONTRACT = await import(
        `../../../contracts/${networkName}/PageCommentMinter.json`
      )
      if (
        contractAddress.toLowerCase() === NFT_CONTRACT.address.toLowerCase()
      ) {
        const commentMinterContract = new this.$web3.eth.Contract(
          COMMENT_MINTER_CONTRACT.abi,
          COMMENT_MINTER_CONTRACT.address
        )

        /**
         * если запрос возвращает исключение,
         * то предполагаем, что комментарии не были включены при создании NFT
         */
        try {
          isExists = await commentMinterContract.methods
            .isExists(NFT_CONTRACT.address, tokenId)
            .call()
          if (isExists) {
            const commentContractAddress = await commentMinterContract.methods
              .getContract(NFT_CONTRACT.address, tokenId)
              .call()

            const commentContract = new this.$web3.eth.Contract(
              COMMENT_CONTRACT.abi,
              commentContractAddress
            )
            comments = await commentContract.methods.getStatistic().call()
          }
        } catch {}
      }

      return { tokenURI, owner, comments }
    } catch {
      return null
    }
  }

  /** Action safeMint by contract */
  public sendSafeMint = ({ params, callbacks }: ISendNFTWeb3) => {
    try {
      this.getNetworkName().then((networkName: string) => {
        import(`../../../contracts/${networkName}/PageNFT.json`).then(
          (CONTRACT) => {
            const contract = new this.$web3.eth.Contract(
              CONTRACT.abi,
              CONTRACT.address
            )
            contract.methods
              .safeMint(params.address, params.hash)
              .send({
                from: params.from
              })
              .on('transactionHash', callbacks.onTransactionHash)
              .on('receipt', callbacks.onReceipt)
              .on('error', callbacks.onError)
          }
        )
      })
    } catch {
      callbacks.onError()
    }
  }

  /** Action createComment by contract */
  public sendComment = ({ params, callbacks }: ISendNFTCommentWeb3) => {
    try {
      this.getNetworkName().then((networkName) => {
        import(`../../../contracts/${networkName}/PageCommentMinter.json`).then(
          (CONTRACT) => {
            const contract = new this.$web3.eth.Contract(
              CONTRACT.abi,
              CONTRACT.address
            )

            contract.methods
              .createComment(
                params.nftContractAddress,
                params.tokenId,
                params.from,
                params.comment,
                params.like
              )
              .send({
                from: params.from
              })
              .on('transactionHash', callbacks.onTransactionHash)
              .on('receipt', callbacks.onReceipt)
              .on('error', callbacks.onError)
          }
        )
      })
    } catch {
      callbacks.onError()
    }
  }

  /** Action commentActivate by contract */
  public activateComments = ({ params, callbacks }: IActivateCommentsWeb3) => {
    try {
      this.getNetworkName().then((networkName: string) => {
        import(`../../../contracts/${networkName}/PageCommentMinter.json`).then(
          (CONTRACT) => {
            const contract = new this.$web3.eth.Contract(
              CONTRACT.abi,
              CONTRACT.address
            )
            contract.methods
              .activateComments(params.nftContractAddress, params.tokenId)
              .send({
                from: params.from
              })
              .on('transactionHash', callbacks.onTransactionHash)
              .on('receipt', callbacks.onReceipt)
              .on('error', callbacks.onError)
          }
        )
      })
    } catch {
      callbacks.onError()
    }
  }

  /** Action burn by contract */
  public burn = ({ params, callbacks }: IBurnParamsType) => {
    try {
      this.getNetworkName().then((networkName: string) => {
        import(`../../../contracts/${networkName}/PageNFT.json`).then(
          (CONTRACT) => {
            const contract = new this.$web3.eth.Contract(
              CONTRACT.abi,
              CONTRACT.address
            )
            contract.methods
              .burn(params.tokenId)
              .send({
                from: params.from
              })
              .on('transactionHash', callbacks.onTransactionHash)
              .on('receipt', callbacks.onReceipt)
              .on('error', callbacks.onError)
          }
        )
      })
    } catch {
      callbacks.onError()
    }
  }
}
