import { EChainSlug } from '~/types';
import { EChainId } from '~/types/EChainId';

/** created by Nail M. at https://infura.io/ */
export const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

/** created by Nail M. at https://cloud.walletconnect.com/ */
export const WALLETCONNECT_PROJECT_ID = '6129b089e527adffd7ee9ca663adcd93';

/** created by P at https://infura.io/ */
export const IPFS_INFURA_PROJECT_ID = process.env.IPFS_INFURA_PROJECT_ID;
export const IPFS_INFURA_SECRET_KEY = process.env.IPFS_INFURA_SECRET_KEY;

export const API_URL = process.env.API_SERVER_URL;

export const ENCRYPTION_SERVICE_URL = process.env.ENCRYPTION_SERVICE_URL;
export const DECRYPTION_SERVICE_URL = process.env.DECRYPTION_SERVICE_URL;

export const PROVIDER_HOST_BY_CHAINID: Record<number | string, string> = {
  [EChainId.eth]: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  [EChainId.ropsten]: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
  [EChainId.rinkeby]: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
  [EChainId.goerli]: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
  [EChainId.kovan]: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
  [EChainId.bsc]: `https://bsc-dataseed.binance.org`,
  [EChainId.bscTestnet]: `https://data-seed-prebsc-1-s1.binance.org:8545`,
  [EChainId.polygon]: `https://polygon-rpc.com`,
  [EChainId.mumbai]: `https://rpc-mumbai.maticvigil.com`,
};

export const API_CHAIN_MAP = new Map<string, string>()
  .set(EChainSlug.eth, 'eth')
  .set(EChainSlug.bsc, 'bsc')
  .set(EChainSlug.solana, 'sol')
  .set(EChainSlug.tron, 'tron')
  .set(EChainSlug.polygon, 'matic')
  .set(EChainSlug.goerli, 'goerli')
  .set(EChainSlug.mumbai, 'mumbai');

/** дефолтное комьюнити для создания NFT */
export const OPEN_FORUM_ID = 1;

/** fractal ID, created by Nail M. https://docs.developer.fractal.id/fractal-credentials-api */
export const FRACTAL_APPLICATION_NAME = 'Crypto Page';
export const FRACTAL_CLIENT_ID = process.env.FRACTAL_CLIENT_ID;
export const FRACTAL_LEVEL = 'basic+liveness';
export const FRACTAL_URL = 'https://credentials.fractal.id';
export const FRACTAL_VERIFICATION_URL = `https://app.fractal.id/authorize?client_id=${FRACTAL_CLIENT_ID}&redirect_uri=https%3A%2F%2Fapp.crypto.page%2F&response_type=code&scope=contact%3Aread%20verification.basic%3Aread%20verification.basic.details%3Aread%20verification.liveness%3Aread%20verification.liveness.details%3Aread%20verification.wallet-eth%3Aread%20verification.wallet-eth.details%3Aread`;

/** messenger */
export const MESSENGER_URL = 'https://app.crypto.page/messenger/';
export const MESSENGER_SIGNUP_URL = `${MESSENGER_URL}?onboarding=true`;
export const MESSENGER_CHAT_LIST_SIDEBAR_URL = `${MESSENGER_URL}ChatListSidebar`;

/** BuyPageModal: открытие вкладки для верифицированных аккаунтов */
export const BUYPAGEMODAL_VERIFIED_URL = 'https://uniswap.org/';
export const BUYPAGE_QUIZ_URL = 'https://form.typeform.com/to/bHVwOAcM';

/** payment type */
export const FOR_SINGLE_POST_ONE_TIME = 5;
export const FOR_SINGLE_POST_DAYS = 6;
