import { NFTPayloadType, ParsedNFTType } from '~/logic/nft/types'

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
    return (
      NFTPayload.image ||
      NFTPayload.image_url ||
      NFTPayload.image_data ||
      this.default.image
    )
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

  public parse(NFTPayload: NFTPayloadType): ParsedNFTType {
    return {
      image: this.prepareImage(this.extractImage(NFTPayload)),
      title: this.extractTitle(NFTPayload),
      description: this.extractDescription(NFTPayload)
    }
  }
}