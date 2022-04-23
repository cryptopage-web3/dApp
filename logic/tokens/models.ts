export type BaseToken = {
  name: string
  symbol: string
  decimals: number
}

export type TokenInfo = {
  address: string
} & {
  id?: number
  totalSupply?: string
  image?: string
  rate?: {
    usd?: number
  }
} & BaseToken

export type IPFSTokensStorageItemImages = {
  images: {
    16: string
    32: string
    64: string
    128: string
  }
}

export type IPFSTokensStorageItem = BaseToken & IPFSTokensStorageItemImages

export type IPFSTokensStorageItemResponse = {
  remainderPath: string
  value: IPFSTokensStorageItem
}

export type IPFSTokensStorageRootValue = {
  address: IPFSTokensStorageItem
}

export type IPFSTokensStorageRootResponse = {
  remainderPath: string
  value: IPFSTokensStorageRootValue
}
