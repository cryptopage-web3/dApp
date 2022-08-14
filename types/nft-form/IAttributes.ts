import { IAttributeLevel, IAttributeProperty, IAttributeStat } from '.';

export interface IAttributes {
  properties: IAttributeProperty[];
  levels: IAttributeLevel[];
  stats: IAttributeStat[];
}
