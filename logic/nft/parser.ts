import {
  ERC721CommentsType,
  NFTCommentsType,
  NFTPayloadType,
  ParsedNFTType
} from '~/logic/nft/types'

/**
 * See more about this standard: https://docs.opensea.io/docs/metadata-standards
 */
export default class NFTParser {
  default: ParsedNFTType = {
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
    const image =
      NFTPayload.image_url || NFTPayload.image_data || NFTPayload.image
    if (!image) return ''
    return image
  }

  public parseAnimationURL(NFTPayload: NFTPayloadType): string {
    return NFTPayload.animation_url ? NFTPayload.animation_url : ''
  }

  private extractTitle(NFTPayload: NFTPayloadType): string {
    return NFTPayload.title || NFTPayload.name || this.default.title
  }

  private extractDescription(NFTPayload: NFTPayloadType): string {
    return NFTPayload.description || this.default.description
  }

  private prepareImage(image: string): string {
    if (image.startsWith('ipfs')) image = this.URIParser(image)
    else if (image.startsWith('<svg')) image = this.SVGToBase64(image)
    return image
  }

  public parseComments(
    comments: ERC721CommentsType | null
  ): NFTCommentsType | null {
    if (!comments) {
      return null
    }

    return {
      total: comments.total,
      likes: comments.likes,
      dislikes: comments.dislikes
    }
  }

  public parse(NFTPayload: NFTPayloadType): ParsedNFTType {
    return {
      image: this.prepareImage(this.extractImage(NFTPayload)),
      title: this.extractTitle(NFTPayload),
      description: this.extractDescription(NFTPayload)
    }
  }
}
