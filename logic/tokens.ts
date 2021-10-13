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
  // Auth service:
  AUTH_SERVICE: new Token('auth-service'),

  // NFT service:
  NFT_API_SERVICE: new Token('nft-api-service'),
  NFT_WEB3_SERVICE: new Token('nft-web3-service'),

  // Transaction service:
  TRANSACTION_API_SERVICE: new Token('transaction-api-service'),

  // Address services:
  ADDRESS_API_SERVICE: new Token('address-api-service'),
  ADDRESS_IPFS_SERVICE: new Token('address-ipfs-service'),
  ADDRESS_WEB3_SERVICE: new Token('address-web3-service'),

  AXIOS: new Token('axios'),
  WEB3: new Token('web3'),
  SEA: new Token('sea')
}
