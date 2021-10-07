import { AxiosInstance } from 'axios'
import * as tPromise from 'io-ts-promise'
import { Service, Container } from 'vue-typedi'
import Web3 from 'web3'
import { web3 } from '~/plugins/web3'
import { ERC721ABI } from '~/constants/abi-samples'
import { NFTPayload } from '~/logic/nft/models'
import {
  NFTType,
  NFTAdapterType,
  FetchOneType,
  FetchManyType,
  NFTPayloadType,
  ParsedNFTType
} from '~/logic/nft/types'
import tokens from '~/logic/tokens'
import api from '~/services/api'

/**
 * See more about this standard: https://docs.opensea.io/docs/metadata-standards
 */

class NFTParser {
  /*
  setDefaultValues: boolean = true

  constructor (setDefaultValues: boolean = true) {
    this.setDefaultValues = setDefaultValues
  }
  */

  default: ParsedNFTType = {
    // owner: '',
    image:
      'https://jago.co.nz/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
    title: 'Default title',
    description: 'Default description'
  }

  private URIParser(URI: string): string {
    if (URI.startsWith('ipfs://ipfs/')) {
      return URI.replace('ipfs://', 'https://ipfs.io/')
    } else if (URI.startsWith('ipfs://')) {
      return URI.replace('ipfs://', 'https://ipfs.io/ipfs/')
    } else {
      return URI
    }
  }

  private SVGToBase64(SVGString: string): string {
    const parser = new DOMParser()
    const element = parser.parseFromString(SVGString, 'image/svg+xml')
    const imageData = new XMLSerializer().serializeToString(element)
    const image = btoa(imageData)
    return `data:image/svg+xml;base64,${image}`
  }

  private extractImage(NFTPayload: NFTPayloadType): string {
    /*
    let extractedImage = NFTPayload.image || NFTPayload.image_url || NFTPayload.image_data
    if (!extractedImage && this.setDefaultValues) {
      extractedImage = this.default.image
    }
    return extractedImage
    */
    return (
      NFTPayload.image ||
      NFTPayload.image_url ||
      NFTPayload.image_data ||
      this.default.image
    )
  }

  private extractTitle(NFTPayload: NFTPayloadType): string {
    /*
    let title = NFTPayload.title || NFTPayload.name
    if (!title && this.setDefaultValues) {
      title = this.default.title
    }
    return title
    */
    return NFTPayload.title || NFTPayload.name || this.default.title
  }

  private extractDescription(NFTPayload: NFTPayloadType): string {
    /*
    let description = NFTPayload.description
    if (!description && this.setDefaultValues) {
      description = this.default.description
    }
    return description
    */
    return NFTPayload.description || this.default.description
  }

  private prepareImage(image: string): string {
    if (image.startsWith('ipfs')) image = this.URIParser(image)
    else if (image.startsWith('<svg')) image = this.SVGToBase64(image)
    return image
  }

  public parse(NFTPayload: NFTPayloadType): ParsedNFTType {
    return {
      image: this.prepareImage(this.extractImage(NFTPayload)),
      title: this.extractTitle(NFTPayload),
      description: this.extractDescription(NFTPayload)
    }
  }
}

const NFTAdapter = (NFTPayload?: NFTPayloadType): NFTAdapterType => {
  const parser = new NFTParser()

  const data: ParsedNFTType = NFTPayload
    ? parser.parse(NFTPayload)
    : parser.default
  return {
    request: (owner: string): NFTType => {
      const NFT: NFTType = { owner, ...data }
      return NFT
    }
  }
}

@Service(tokens.NFT_SERVICE)
/**
 * Service class to fetch NFT from the API.
 *
 * Is injected into the module context to be used.
 * Should not be used as-is, only as a part of the module.
 */
export default class NFTService {
  /**
   * That's an example of how to inject dependencies into the service.
   *
   * This is actually overly-complicated.
   * And usually `@Inject` decorator is enough.
   * But, since `$web` is injected via `Nuxt`,
   * we have two conflicting IoC and DI implementations.
   * That's a fix!
   *
   * @returns Global `web3` instance from the IoC container.
   */

  protected get $web3(): Web3 {
    return Container.get(tokens.WEB3) as Web3
  }

  /**
   * @returns Global `axios` instance from the IoC container.
   */
  protected get $axios(): AxiosInstance {
    return Container.get(tokens.AXIOS) as AxiosInstance
  }

  private fetchBase64TokenURI = async (
    tokenURI: string
  ): Promise<NFTPayloadType> => {
    const base64 = tokenURI.split(';base64,')[1]
    const response = await JSON.parse(atob(base64))
    return tPromise.decode(NFTPayload, response)
  }

  private fetchHTTPSTokenURI = async (
    tokenURI: string
  ): Promise<NFTPayloadType> => {
    const response = await this.$axios.get(tokenURI)
    return tPromise.decode(NFTPayload, response.data)
  }

  private fetchTokenURI = async (tokenURI: string): Promise<NFTPayloadType> => {
    if (tokenURI.startsWith('data:') && tokenURI.includes(';base64,')) {
      return await this.fetchBase64TokenURI(tokenURI)
    } else if (tokenURI.startsWith('ipfs://ipfs/')) {
      tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/')
      return await this.fetchHTTPSTokenURI(tokenURI)
    } else if (tokenURI.startsWith('ipfs://')) {
      tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
      return await this.fetchHTTPSTokenURI(tokenURI)
    } else {
      return await this.fetchHTTPSTokenURI(tokenURI)
    }
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
  public fetchOne = async ({
    tokenId,
    contractAddress
  }: FetchOneType): Promise<NFTType> => {
    const contract = new web3.eth.Contract(ERC721ABI, contractAddress)
    const tokenURI = await contract.methods.tokenURI(tokenId).call()
    const owner = await contract.methods.ownerOf(tokenId).call()
    let adaptedNFT = NFTAdapter()
    if (tokenURI) {
      const rawNFT = await this.fetchTokenURI(tokenURI)
      adaptedNFT = NFTAdapter(rawNFT)
    }
    return await adaptedNFT.request(owner)
  }

  public fetchMany = async ({
    address,
    page,
    pageSize
  }: FetchManyType): Promise<NFTType[]> => {
    const response = await api.getTransactions({
      address,
      page,
      offset: pageSize,
      type: 'nft'
    })
    const array = response.result || []
    return await Promise.all(
      array.map(async (transaction?: any): Promise<NFTType> => {
        return await this.fetchOne({
          tokenId: transaction.tokenID,
          contractAddress: transaction.contractAddress
        })
      })
    )
  }
}
