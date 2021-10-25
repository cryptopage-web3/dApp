import { EDisplayType } from '.'

/* eslint-disable camelcase */
export interface IAttributeServer {
  trait_type: string
  value: string | number
  max_value?: number
  display_type?: EDisplayType
}
