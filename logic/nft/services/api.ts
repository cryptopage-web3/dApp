import { AxiosInstance } from 'axios'
import * as tPromise from 'io-ts-promise'
import { Inject, Service, Container } from 'vue-typedi'
import { NFTPayload } from '~/logic/nft/models'
import NFTAdapter from '~/logic/nft/adapter'
import {
  NFTType,
  FetchOneType,
  NFTPayloadType,
  ISendNFTApi
} from '~/logic/nft/types'
import NFTWeb3Service from '~/logic/nft/services/web3'
import tokens from '~/logic/tokens'

@Service(tokens.NFT_API_SERVICE)
/**
 * Service class to fetch NFT from the API.
 *
 * Is injected into the module context to be used.
 * Should not be used as-is, only as a part of the module.
 */
export default class NFTAPIService {
  /**
   * That's an example of how to inject dependencies into the service.
   *
   * This is actually overly-complicated.
   * And usually `@Inject` decorator is enough.
   * But, since `$axios` is injected via `Nuxt`,
   * we have two conflicting IoC and DI implementations.
   * That's a fix!
   *
   * @returns Global `axios` instance from the IoC container.
   */
  protected get $axios(): AxiosInstance {
    return Container.get(tokens.AXIOS) as AxiosInstance
  }

  @Inject(tokens.NFT_WEB3_SERVICE)
  public nftWeb3Service!: NFTWeb3Service

  private fetchBase64NFTPayloadByTokenURI = async (
    tokenURI: string
  ): Promise<NFTPayloadType> => {
    const base64 = tokenURI.split(';base64,')[1]
    try {
      const response = await JSON.parse(atob(base64))
      return tPromise.decode(NFTPayload, response)
    } catch (error) {
      return {}
    }
  }

  private fetchHTTPSNFTPayloadByTokenURI = async (
    tokenURI: string
  ): Promise<NFTPayloadType> => {
    try {
      const response = await this.$axios.get(tokenURI)
      return tPromise.decode(NFTPayload, response.data)
    } catch (error) {
      return {}
    }
  }

  private fetchNFTPayloadByTokenURI = async (
    tokenURI: string
  ): Promise<NFTPayloadType> => {
    if (tokenURI.startsWith('data:') && tokenURI.includes(';base64,')) {
      return await this.fetchBase64NFTPayloadByTokenURI(tokenURI)
    } else if (tokenURI.startsWith('ipfs://ipfs/')) {
      tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/')
      return await this.fetchHTTPSNFTPayloadByTokenURI(tokenURI)
    } else if (tokenURI.startsWith('ipfs://')) {
      tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
      return await this.fetchHTTPSNFTPayloadByTokenURI(tokenURI)
    } else {
      return await this.fetchHTTPSNFTPayloadByTokenURI(tokenURI)
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
    const { tokenURI, owner } = await this.nftWeb3Service.getContractData({
      tokenId,
      contractAddress
    })
    let adaptedNFT = NFTAdapter()
    if (tokenURI) {
      const nftPayload = await this.fetchNFTPayloadByTokenURI(tokenURI)
      adaptedNFT = NFTAdapter(nftPayload)
    }
    return await adaptedNFT.request(owner)
  }

  /** Send nft to contract via web3 */
  public sendNFTHash = ({ params, callback }: ISendNFTApi) => {
    let txHash = ''

    this.nftWeb3Service.sendSafeMint({
      params,
      callbacks: {
        onTransactionHash(hash: string) {
          txHash = hash

          callback({
            status: 'pending',
            txHash
          })
        },
        onReceipt() {
          callback({
            status: 'success',
            txHash
          })
        },
        onError() {
          callback({
            status: 'error',
            txHash
          })
        }
      }
    })
  }
}
