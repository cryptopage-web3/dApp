export type Attribute = {
  display_type:
    | 'boost_number'
    | 'boost_percentage'
    | 'number'
    | 'date'
    | undefined
  trait_type: string
  value: number | string
  max_value: number | undefined
}

export type Property = {
  type: string
  description: string
}

export type NFTPayload = {
  owner: string
  title: string
  image: string | null
  image_data: string
  image_url: string
  external_url: string
  description: string
  name: string
  attributes: Attribute[]
  background_color: string
  animation_url: string | null
  youtube_url: string
}

export type NFTMedia = {
  image?: string
  audio?: string
  video?: string
}

export type NFTAttributeProperty = {
  type?: string
  value?: string
}

export type NFTAttributeLevel = {
  type?: string
  value?: number
  maxValue?: number
}

export type NFTAttributeStat = {
  type?: string
  value?: number
  maxValue?: number
}

export type NFTAttributeDate = {
  type?: string
  value?: number
}

export type NFTAttributeBoost = {
  type?: string
  value?: number
  displayType?: 'boost_number' | 'boost_percentage' | undefined
}

export type NFTAttributes = {
  properties: NFTAttributeProperty[]
  levels: NFTAttributeLevel[]
  stats: NFTAttributeStat[]
  dates: NFTAttributeDate[]
  boosts: NFTAttributeBoost[]
}

export type ParsedNFT = {
  title: string
  description: string
  attributes: NFTAttributes
} & NFTMedia
