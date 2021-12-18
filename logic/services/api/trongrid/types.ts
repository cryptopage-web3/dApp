import * as ts from 'io-ts'
import { TronGridAPITokensResponseDataItem, TronGridAPITransactionsResponseDataItem } from '~/logic/services/api/trongrid/models' 
export type TronGridAPITokenType = ts.TypeOf<typeof TronGridAPITokensResponseDataItem>
export type TronGridAPITransactionType = ts.TypeOf<typeof TronGridAPITransactionsResponseDataItem>
