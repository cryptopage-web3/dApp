import {
  IAttributeBoost,
  IAttributeDate,
  IAttributeLevel,
  IAttributeProperty,
  IAttributeStat
} from '.'

export interface IAttributesFront {
  properties?: IAttributeProperty[]
  levels?: IAttributeLevel[]
  stats?: IAttributeStat[]
  dates?: IAttributeDate[]
  boosts?: IAttributeBoost[]
  hasComment?: boolean
}
