import { EChainSlug } from '~/types';
import { EChainId } from '~/types/EChainId';

/** created by Nail M. at https://infura.io/ */
export const INFURA_PROJECT_ID = '4409ed526a3e48ffa540c25ff4e1015f';

/** created by P at https://infura.io/ */
export const IPFS_INFURA_PROJECT_ID = '2EDEASi84EnJFp1eNlH02MWgRBm';
export const IPFS_INFURA_SECRET_KEY = 'a96c0da772683cc68de2511a4932d45a';

export const API_URL = process.env.API_SERVER_URL;

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

export const API_CHAIN_MAP = new Map<string, string>()
  .set(EChainSlug.eth, 'eth')
  .set(EChainSlug.bsc, 'bsc')
  .set(EChainSlug.solana, 'sol')
  .set(EChainSlug.tron, 'tron')
  .set(EChainSlug.polygon, 'matic')
  .set(EChainSlug.goerli, 'goerli');

/** дефолтное комьюнити для создания NFT */
export const OPEN_FORUM_ID = 1;

/** fractal ID, created by Nail M. https://docs.developer.fractal.id/fractal-credentials-api */
export const FRACTAL_APPLICATION_NAME = 'Crypto Page';
export const FRACTAL_CLIENT_ID = 'c0uqfU0-sbr4eZkdvr3XXipoVPH91_nqdnCRDkX0OcI';
export const FRACTAL_LEVEL = 'plus+liveness';
export const FRACTAL_URL = 'https://credentials.fractal.id';
export const FRACTAL_VERIFICATION_URL = `https://app.fractal.id/authorize?client_id=${FRACTAL_CLIENT_ID}&redirect_uri=https%3A%2F%2Fapp.crypto.page%2F&response_type=code&scope=contact%3Aread%20verification.basic%3Aread%20verification.basic.details%3Aread%20verification.liveness%3Aread%20verification.liveness.details%3Aread`;
