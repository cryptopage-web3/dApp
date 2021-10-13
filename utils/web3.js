export const shortAddress = (
  address,
  startCount = 5,
  endCount = 3,
  delimiter = '...'
) => {
  if (address) {
    address = String(address)
    const start = address.slice(0, startCount)
    const end = address.slice(address.length - endCount, address.length)
    return start + delimiter + end
  }
}

export const toDecimals = (value, decimals = 18) =>
  Number(value) / 10 ** decimals

export const tokenURItoURI = (uri) => {
  if (uri.startsWith('ipfs://ipfs/')) {
    return uri.replace('ipfs://', 'https://ipfs.io/')
  } else if (uri.startsWith('ipfs://')) {
    return uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
  } else if (uri.startsWith('https://') && !uri.includes('herokuapp')) {
    // uri = uri.replace('https://', '')
    // return `https://cors-anywhere.herokuapp.com/${uri}` // Temporary hack to prevent CORS
    return uri
  } else if (uri.startsWith('https://')) {
    return uri
  }
}

const nftImageDecoder = (data) => {
  const defaultImage =
    'https://ih1.redbubble.net/image.485923660.1240/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg'
  let image = data.image || data.image_url || data.image_data || defaultImage
  if (image.startsWith('ipfs')) {
    image = tokenURItoURI(image)
  } else if (image.startsWith('<svg')) {
    const parser = new DOMParser()
    const element = parser.parseFromString(image, 'image/svg+xml')
    const imageData = new XMLSerializer().serializeToString(element)
    image = btoa(imageData)
    image = `data:image/svg+xml;base64,${image}`
  }
  return image
}

export const nftDataDecoder = (data) => {
  if (typeof data === 'object') {
    const title = data.title || data.name
    const description = data.description || ''
    const image = nftImageDecoder(data)
    const owner = data.owner
    const externalURL = data.external_url || ''
    return { title, description, image, externalURL, owner }
  }
  return null
}

export const validateTransaction = (tx) => tx && tx.to !== null
export const isFrom = (address, tx) =>
  tx.from && address.toLowerCase() === tx.from.toLowerCase()
export const isTo = (address, tx) =>
  tx.to && address.toLowerCase() === tx.to.toLowerCase()

export const isOwnerTransaction = (address, tx) =>
  isFrom(address, tx) || isTo(address, tx)
