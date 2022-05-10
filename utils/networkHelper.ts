import {
  EChainId,
  EChainSlug,
  EChainType,
  EMainChain,
  EProvider,
} from '~/types';

export const networkHelper = {
  networkByChain: {
    [EChainId.eth]: {
      network: EChainType.eth,
      name: 'Ethereum',
      slug: EChainSlug.eth,
    },
    [EChainId.ropsten]: {
      network: EChainType.eth,
      name: 'Ropsten TestNet',
      slug: EChainSlug.ropsten,
    },
    [EChainId.rinkeby]: {
      network: EChainType.eth,
      name: 'Rinkeby TestNet',
      slug: EChainSlug.rinkeby,
    },
    [EChainId.goerli]: {
      network: EChainType.eth,
      name: 'Goerli TestNet',
      slug: EChainSlug.goerli,
    },
    [EChainId.kovan]: {
      network: EChainType.eth,
      name: 'Kovan TestNet',
      slug: EChainSlug.kovan,
    },
    [EChainId.bsc]: {
      network: EChainType.bsc,
      name: 'BSC',
      slug: EChainSlug.bsc,
    },
    [EChainId.bscTestnet]: {
      network: EChainType.bsc,
      name: 'BSC TestNet',
      slug: EChainSlug.bscTestnet,
    },
    [EChainId.polygon]: {
      network: EChainType.polygon,
      name: 'Polygon',
      slug: EChainSlug.polygon,
    },
    [EChainId.polygonTestnet]: {
      network: EChainType.polygon,
      name: 'Polygon TestNet',
      slug: EChainSlug.polygonTestnet,
    },
    tron: { network: EChainType.tron, name: 'Tron', slug: EChainSlug.tron },
    solana: {
      network: EChainType.solana,
      name: 'Solana',
      slug: EChainSlug.solana,
    },
  } as any,

  chainIdBySlug: {
    [EChainSlug.eth]: EChainId.eth,
    [EChainSlug.ropsten]: EChainId.ropsten,
    [EChainSlug.rinkeby]: EChainId.rinkeby,
    [EChainSlug.goerli]: EChainId.goerli,
    [EChainSlug.kovan]: EChainId.kovan,
    [EChainSlug.bsc]: EChainId.bsc,
    [EChainSlug.bscTestnet]: EChainId.bscTestnet,
    [EChainSlug.polygon]: EChainId.polygon,
    [EChainSlug.polygonTestnet]: EChainId.polygonTestnet,
    [EChainSlug.tron]: EChainId.tron,
    [EChainSlug.solana]: EChainId.solana,
  } as Record<string, number | string>,

  chainsByProvider: {
    [EProvider.metamask]: [
      EChainId.eth,
      EChainId.ropsten,
      EChainId.rinkeby,
      EChainId.goerli,
      EChainId.kovan,
      EChainId.bsc,
      EChainId.polygon,
    ],
    [EProvider.bscWallet]: [EChainId.bsc, EChainId.bscTestnet],
    [EProvider.okex]: [
      EChainId.eth,
      EChainId.ropsten,
      EChainId.rinkeby,
      EChainId.goerli,
      EChainId.kovan,
      EChainId.bsc,
      EChainId.polygon,
    ],
    [EProvider.tron]: [EChainId.tron],
    [EProvider.phantom]: [EChainId.solana],
    [EProvider.walletConnect]: [
      EChainId.eth,
      EChainId.ropsten,
      EChainId.rinkeby,
      EChainId.goerli,
      EChainId.kovan,
      EChainId.bsc,
      EChainId.polygon,
    ],
  } as any,

  chains: {
    [EMainChain.bsc]: {
      chainId: '0x38',
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      chainName: 'Binance Smart Chain',
      nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
      blockExplorerUrls: ['https://bscscan.com/'],
    },
    [EMainChain.polygon]: {
      chainId: '0x89',
      rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
      chainName: 'Matic Mainnet',
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
      blockExplorerUrls: [
        'https://explorer.matic.network/',
        'https://polygonscan.com/',
      ],
    },
    [EMainChain.eth]: {
      chainId: '0x1',
    },
    [EMainChain.tron]: {
      chainId: 'tron',
    },
    [EMainChain.solana]: {
      chainId: 'solana',
    },
  } as any,

  getNetworkName(chainId: any) {
    return (
      (this.networkByChain[chainId] && this.networkByChain[chainId].name) ||
      'unknown'
    );
  },

  getNetworkSlug(chainId: any) {
    return (
      (this.networkByChain[chainId] && this.networkByChain[chainId].slug) ||
      'unknown'
    );
  },

  getNetworkType(chainId: string | number): EChainType {
    return (
      (this.networkByChain[chainId] && this.networkByChain[chainId].network) ||
      EChainType.eth
    );
  },

  isSupportedByProvider(chainId: string | number, provider: string): boolean {
    return this.chainsByProvider[provider].includes(chainId);
  },

  isValidSlug(slug: string) {
    return Boolean(this.chainIdBySlug[slug]);
  },

  getChainData(name: string) {
    return this.chains[name];
  },

  getChainId(slug: string) {
    return this.chainIdBySlug[slug];
  },
};
