import * as ts from 'io-ts'
import { SolScanAPITokensResponseDataItem } from '~/logic/services/api/solscan/models'
export type SolScanAPITokenType = ts.TypeOf<typeof SolScanAPITokensResponseDataItem>
