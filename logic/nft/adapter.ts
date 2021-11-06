import { NFTType, NFTAdapterType, ParsedNFTType } from '~/logic/nft/types'

const NFTAdapter = (parsedNFT: ParsedNFTType): NFTAdapterType => {
  return {
    request: ({ owner, image, audio, video }): NFTType => {
      if (image) {
        return { owner, image, ...parsedNFT }
      }
      if (audio) {
        return { owner, audio, ...parsedNFT }
      }
      if (video) {
        return { owner, video, ...parsedNFT }
      }
      return { owner, ...parsedNFT }
    }
  }
}

export default NFTAdapter
