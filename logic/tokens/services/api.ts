import { Service } from 'vue-typedi'
import { CovalentAPIServiceMixin } from '~/logic/mixins'

import tokens from '~/logic/tokens'

@Service(tokens.TOKEN_API_SERVICE)
export default class TokenAPIService extends CovalentAPIServiceMixin {
  public getTokens = async (address: string): Promise<void> => {
    const URL = `${this.baseURL}/address/${address}/balances_v2/?key=${this.APIKey}`
    console.log('URL', URL)
    const tokens = await this.$axios.get(URL)
    console.log('tokens', tokens)
  }
}
