import { EChainId } from '~/types/EChainId';

/** created by Nail M. at https://infura.io/ */
export const INFURA_PROJECT_ID = '4409ed526a3e48ffa540c25ff4e1015f';

export const API_URL = 'https://api-m.crypto.page';

export const PROVIDER_HOST_BY_CHAINID: Record<number | string, string> = {
  [EChainId.eth]: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  [EChainId.ropsten]: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
  [EChainId.rinkeby]: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
  [EChainId.goerli]: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
  [EChainId.kovan]: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
  [EChainId.bsc]: `https://bsc-dataseed.binance.org`,
  [EChainId.bscTestnet]: `https://data-seed-prebsc-1-s1.binance.org:8545`,
  [EChainId.polygon]: `https://polygon-rpc.com`,
  [EChainId.polygonTestnet]: `https://rpc-mumbai.matic.today`,
};
