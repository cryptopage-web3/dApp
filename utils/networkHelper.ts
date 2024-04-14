import {
  EChainId,
  EChainSlug,
  EChainType,
  EMainChain,
  EProvider,
} from '~/types';

const providerTitleMap = new Map<EProvider, string>([
  [EProvider.metamask, 'MetaMask Ext.'],
  [EProvider.bscWallet, 'Binance Wallet Ext.'],
  [EProvider.okex, 'OKX Ext.'],
  [EProvider.phantom, 'Phantom Ext.'],
  [EProvider.tron, 'TronLink Ext.'],
  [EProvider.walletConnect, 'WalletConnect'],
]);

export const networkHelper = {
  networkByChain: {
    [EChainId.eth]: {
      network: EChainType.eth,
      name: 'Ethereum',
      slug: EChainSlug.eth,
      symbol: 'ETH',
    },
    [EChainId.ropsten]: {
      network: EChainType.eth,
      name: 'Ropsten TestNet',
      slug: EChainSlug.ropsten,
      symbol: 'ETH',
    },
    [EChainId.rinkeby]: {
      network: EChainType.eth,
      name: 'Rinkeby TestNet',
      slug: EChainSlug.rinkeby,
      symbol: 'ETH',
    },
    [EChainId.goerli]: {
      network: EChainType.goerli,
      name: 'Goerli TestNet',
      slug: EChainSlug.goerli,
      symbol: 'ETH',
    },
    [EChainId.kovan]: {
      network: EChainType.eth,
      name: 'Kovan TestNet',
      slug: EChainSlug.kovan,
      symbol: 'ETH',
    },
    [EChainId.bsc]: {
      network: EChainType.bsc,
      name: 'BSC',
      slug: EChainSlug.bsc,
      symbol: 'BNB',
    },
    [EChainId.bscTestnet]: {
      network: EChainType.bsc,
      name: 'BSC TestNet',
      slug: EChainSlug.bscTestnet,
      symbol: 'BNB',
    },
    [EChainId.polygon]: {
      network: EChainType.polygon,
      name: 'Polygon',
      slug: EChainSlug.polygon,
      symbol: 'MATIC',
    },
    [EChainId.mumbai]: {
      network: EChainType.mumbai,
      name: 'Mumbai TestNet',
      slug: EChainSlug.mumbai,
      symbol: 'MATIC',
    },
    tron: {
      network: EChainType.tron,
      name: 'Tron',
      slug: EChainSlug.tron,
      symbol: 'TRX',
    },
    solana: {
      network: EChainType.solana,
      name: 'Solana',
      slug: EChainSlug.solana,
      symbol: 'SOL',
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
    [EChainSlug.mumbai]: EChainId.mumbai,
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
      EChainId.mumbai,
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
      EChainId.mumbai,
    ],
    [EProvider.tron]: [EChainId.tron],
    [EProvider.phantom]: [EChainId.solana],
    [EProvider.walletConnect]: [
      // EChainId.eth,
      // EChainId.ropsten,
      // EChainId.rinkeby,
      // EChainId.goerli,
      // EChainId.kovan,
      // EChainId.bsc,
      EChainId.polygon,
      // EChainId.mumbai,
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
    [EMainChain.goerli]: {
      chainId: '0x5',
      rpcUrls: ['https://goerli.infura.io/v3/'],
      chainName: 'Goerli',
      nativeCurrency: { name: 'GoerliETH', symbol: 'GoerliETH', decimals: 18 },
      blockExplorerUrls: ['https://goerli.etherscan.io'],
    },
    [EMainChain.mumbai]: {
      chainId: '0x13881',
      rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
      chainName: 'Mumbai TestNet',
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
    [EMainChain.tron]: {
      chainId: 'tron',
    },
    [EMainChain.solana]: {
      chainId: 'solana',
    },
  } as any,

  getNetworkName(chainId: any) {
    return this.networkByChain[chainId]?.name || '';
  },

  getNetworkSlug(chainId: any) {
    return this.networkByChain[chainId]?.slug || '';
  },

  getNetworkType(chainId: string | number): EChainType {
    return this.networkByChain[chainId]?.network || EChainType.eth;
  },

  getNetworkSymbol(chainId: any) {
    return this.networkByChain[chainId]?.symbol || '';
  },

  isSupportedByProvider(
    chainId: string | number | null,
    provider: EProvider | null,
  ): boolean {
    return (
      chainId && provider && this.chainsByProvider[provider].includes(chainId)
    );
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

  getProviderTitle(provider: EProvider | null) {
    return provider ? providerTitleMap.get(provider) : 'Wallet Provider';
  },

  isAvailableBySlug(slug: any) {
    return [EChainSlug.polygon].includes(slug);
  },

  isAvailableByChainId(chainId: any) {
    return this.isAvailableBySlug(this.getNetworkSlug(chainId));
  },
};
