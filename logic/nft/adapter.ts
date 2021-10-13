import NFTParser from '~/logic/nft/parser'
import {
  NFTType,
  NFTAdapterType,
  NFTPayloadType,
  ParsedNFTType
} from '~/logic/nft/types'

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

export default NFTAdapter
