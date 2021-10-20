import { Service, Container } from 'vue-typedi'
import { create, IPFSHTTPClient } from 'ipfs-http-client'
import { CID } from 'multiformats/cid'
import tokens from '~/logic/tokens'
import { TokenInfoType } from '~/logic/address/types'

/*
type IPFSDAGResponse = {
  remainderPath: string
}
*/
type AddressIPFSServiceCacheItem = {
  name: string
  symbol: string
  decimals: string
  images: {
    [size: number]: string
  }
}
type AddressIPFSServiceCache = {
  [address: string]: AddressIPFSServiceCacheItem
}
/*
type IPFSDAGTokenInfoResponse = IPFSDAGResponse & {
  value: IPFSItem
}
*/
/*
type ResultIPFSItem = {
  address: string
  name: string
  symbol: string
  image: string
}
*/

@Service(tokens.ADDRESS_IPFS_SERVICE)
export default class AddressIPFSService {
  /*
   * List with public gateways. Need to implement gateway checker and switcher
   * https://ipfs.github.io/public-gateway-checker/gateways.json
   */

  protected cid = CID.parse(
    'bafyreibxd3rg42m65fbzr5vqxgxzmxavjdlux37latsvvur3giha2p6ovq'
    // 'bafyreidcjvlbz7qucufb6skwfydrsic2gjdqysfihgo26i4adcyeofcayu'
  )

  protected sizes: number[] = [16, 32, 64, 128]
  protected $ipfs!: IPFSHTTPClient
  protected timeout = 100

  private CACHE: AddressIPFSServiceCache = {}

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

  private cacheGet = (address: string): AddressIPFSServiceCacheItem | null => {
    return address in this.CACHE ? this.CACHE[address] : null
  }

  private cacheSet = (
    address: string,
    value: AddressIPFSServiceCacheItem
  ): void => {
    this.CACHE[address] = value
  }

  private toTokenInfo = (
    address: string,
    value: AddressIPFSServiceCacheItem
  ): TokenInfoType => {
    const name = value.name
    const symbol = value.symbol
    const size = 128
    const image =
      size in value.images ? `https://ipfs.io/ipfs/${value.images[size]}` : ''
    const decimals = value.decimals || '0'
    const totalSupply = '0'
    return { address, name, symbol, decimals, totalSupply, image }
  }

  public getTokenInfo = async (
    address: string
  ): Promise<TokenInfoType | null> => {
    const path = `/${address}`
    const value = this.cacheGet(address)
    if (value) return this.toTokenInfo(address, value)
    try {
      const result = await this.$ipfs.dag.get(this.cid, {
        path,
        timeout: this.timeout
      })
      this.cacheSet(address, result.value)
      return this.toTokenInfo(address, result.value)
    } catch {
      return null
    }
  }

  public getTokenImage = async (
    address: string,
    size = 128
  ): Promise<string> => {
    if (!this.sizes.includes(size)) return ''
    const value = await this.getTokenInfo(address)
    return value ? value.image : ''
  }

  public getAllTokensInfo = async (): Promise<TokenInfoType[]> => {
    const path = '/'
    try {
      const result = await this.$ipfs.dag.get(this.cid, {
        path,
        timeout: this.timeout
      })
      return result.value.map((address: string) => {
        const value = result.value[address]
        if (!this.cacheGet(address)) {
          this.cacheSet(address, value)
        }
        return this.toTokenInfo(address, value)
      })
    } catch {
      return []
    }
  }
}
