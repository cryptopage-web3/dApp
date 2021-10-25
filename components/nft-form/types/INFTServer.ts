import { IAttributeServer } from '.'

/* eslint-disable camelcase */
export interface INFTServer {
  name: string
  description: string
  animation_url?: string | null
  image?: string | null
  attributes: IAttributeServer[]
}
