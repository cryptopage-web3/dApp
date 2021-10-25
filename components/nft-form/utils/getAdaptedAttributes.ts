import { EDisplayType, IAttributeServer, IAttributesFront } from '../types'

export const getAdaptedAttributes = (
  attributes: IAttributesFront
): IAttributeServer[] => {
  // adapt properties

  const properties = (attributes.properties || []).map((property) => ({
    trait_type: property.type,
    value: property.value
  }))

  // adapt levels

  const levels = (attributes.levels || []).map((level) => ({
    trait_type: level.type,
    value: +level.value,
    max_value: +level.maxValue
  }))

  // adapt levels

  const stats = (attributes.stats || []).map((stat) => ({
    display_type: EDisplayType.number,
    trait_type: stat.type,
    value: +stat.value,
    max_value: +stat.maxValue
  }))

  // adapt dates

  const dates = (attributes.dates || []).map((date) => ({
    display_type: EDisplayType.date,
    trait_type: date.type,
    value: Math.floor(Number(new Date(date.value)) / 1000)
  }))

  // adapt boosts

  const boosts = (attributes.boosts || []).map((boost) => ({
    display_type: boost.displayType,
    trait_type: boost.type,
    value: +boost.value
  }))

  return [...properties, ...levels, ...stats, ...dates, ...boosts]
}
