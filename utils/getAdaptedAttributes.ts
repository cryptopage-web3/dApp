import {
  EAttributeDisplayType,
  IAttributes,
  IAttributesServer,
} from '~/types/nft-form';

export const getAdaptedAttributes = (
  attributes: IAttributes,
): IAttributesServer[] => {
  // adapt properties

  const properties = (attributes.properties || []).map((property) => ({
    trait_type: property.type,
    value: property.value,
  }));

  // adapt levels

  const levels = (attributes.levels || []).map((level) => ({
    trait_type: level.type,
    value: +level.value,
    max_value: +level.maxValue,
  }));

  // adapt levels

  const stats = (attributes.stats || []).map((stat) => ({
    display_type: EAttributeDisplayType.number,
    trait_type: stat.type,
    value: +stat.value,
    max_value: +stat.maxValue,
  }));

  return [...properties, ...levels, ...stats];
};
