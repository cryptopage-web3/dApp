import * as tPromise from 'io-ts-promise'
import { Service, Container } from 'vue-typedi'
import { create, IPFSHTTPClient } from 'ipfs-http-client'
import { CID } from 'multiformats/cid'
import tokens from '~/logic/tokens'
import { IPFSTokensStorageItemResponse } from '~/logic/address/models'
import { IPFSTokensStorageItemType, TokenInfoType } from '~/logic/address/types'

@Service(tokens.ADDRESS_IPFS_SERVICE)
export default class AddressIPFSService {
  /*
   * List with public gateways. Need to implement gateway checker and switcher
   * https://ipfs.github.io/public-gateway-checker/gateways.json
   */

  protected cid = CID.parse(
    'bafyreibxd3rg42m65fbzr5vqxgxzmxavjdlux37latsvvur3giha2p6ovq'
  )

  protected sizes: number[] = [16, 32, 64, 128]
  protected $ipfs!: IPFSHTTPClient
  protected timeout = 100

  constructor() {
    this.init()
  }

  private init = async () => {
    const ipfs = await create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'
    })
    Container.set(tokens.IPFS, ipfs)
    this.$ipfs = ipfs
  }

  private toTokenInfo = (
    address: string,
    value: IPFSTokensStorageItemType
  ): TokenInfoType => {
    const name = value.name
    const symbol = value.symbol
    const size = 128
    const image =
      size in value.images ? `https://ipfs.io/ipfs/${value.images[size]}` : ''
    const decimals = value.decimals || 18
    const totalSupply = '0'
    return { address, name, symbol, decimals, totalSupply, image }
  }

  public getTokenInfo = async (
    address: string
  ): Promise<TokenInfoType | null> => {
    const path = `/${address}`
    try {
      const result = await this.$ipfs.dag.get(this.cid, {
        path,
        timeout: this.timeout
      })
      const response = await tPromise.decode(
        IPFSTokensStorageItemResponse,
        result
      )
      return this.toTokenInfo(address, response.value)
    } catch {
      return null
    }
  }

  public getTokenImage = async (address: string): Promise<string> => {
    const value = await this.getTokenInfo(address)
    return value && value.image ? value.image : ''
  }
}
