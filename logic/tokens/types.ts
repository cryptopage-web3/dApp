import * as ts from 'io-ts'

import { CovalentAPITokensResponseDataItem } from '~/logic/tokens/models'

export type CovalentAPITokenType = ts.TypeOf<typeof CovalentAPITokensResponseDataItem>
