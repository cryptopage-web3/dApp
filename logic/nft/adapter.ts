import { NFTType, NFTAdapterType, ParsedNFTType } from '~/logic/nft/types'

const NFTAdapter = (parsedNFT: ParsedNFTType): NFTAdapterType => {
  return {
    request: ({ owner, commentsEnabled, image, audio, video }): NFTType => {
      const nft = { owner, commentsEnabled, ...parsedNFT }

      if (image) {
        nft.image = image
      }

      if (audio) {
        nft.audio = audio
      }

      if (video) {
        nft.video = video
      }

      return nft
    }
  }
}

export default NFTAdapter
