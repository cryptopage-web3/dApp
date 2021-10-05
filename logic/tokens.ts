import { Token } from 'vue-typedi'

/**
 * Here we generate some unique keys to bind our values to.
 *
 * This tokens are unique representation of your dependencies inside the app.
 *
 * @see https://github.com/sascha245/vue-typedi
 * @see https://github.com/typestack/typedi
 */
export default {
  // NFT service:
  NFT_SERVICE: new Token('nft-service'),

  // Transaction service:
  TRANSACTION_SERVICE: new Token('transaction-service'),

  // Axios instance:
  AXIOS: new Token('axios'),

  // Web3 instance:
  WEB3: new Token('web3')
}
