/** created by Nail M. at https://infura.io/ */
export const INFURA_PROJECT_ID = '4409ed526a3e48ffa540c25ff4e1015f'

export const PROVIDER_HOST_BY_CHAINID: Record<number | string, string> = {
  1: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  3: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
  4: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
  5: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
  42: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
  56: `https://bsc-dataseed.binance.org`,
  97: `https://data-seed-prebsc-1-s1.binance.org:8545`,
  137: `https://polygon-rpc.com`,
  80001: `https://rpc-mumbai.matic.today`
}
