import * as ts from 'io-ts'
import { TronGridAPITokensResponseDataItem } from '~/logic/services/api/trongrid/models' 
export type TronGridAPITokenType = ts.TypeOf<typeof TronGridAPITokensResponseDataItem>
