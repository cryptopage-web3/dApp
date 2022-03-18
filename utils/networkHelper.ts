export const CHAINS = ['ETHEREUM', 'BSC', 'POLYGON', 'TRON', 'SOLANA']
const [ETHEREUM, BSC, POLYGON, TRON, SOLANA] = CHAINS

export const PROVIDERS = [
  'metamask',
  'walletConnect',
  'bscWallet',
  'okex',
  'tron',
  'phantom'
]
const [METAMASK, WALLET_CONNECT, BSC_WALLET, OKEX, TRON_LINK, PHANTOM] =
  PROVIDERS

export const networkHelper = {
  networkByChain: {
    1: { network: 'ethereum', name: 'Ethereum', slug: 'eth' },
    3: { network: 'ethereum', name: 'Ropsten TestNet', slug: 'ropsten' },
    4: { network: 'ethereum', name: 'Rinkeby TestNet', slug: 'rinkeby' },
    5: { network: 'ethereum', name: 'Goerly TestNet', slug: 'goerly' },
    42: { network: 'ethereum', name: 'Kovan TestNet', slug: 'kovan' },
    56: { network: 'bsc', name: 'BSC Network', slug: 'bsc' },
    97: { network: 'bsc', name: 'BSC TestNet', slug: 'bsc-testnet' },
    137: {
      network: 'polygon',
      name: 'Polygon',
      slug: 'polygon'
    },
    80001: {
      network: 'polygon',
      name: 'Polygon TestNet',
      slug: 'polygon-testnet'
    },
    tron: { network: 'tron', name: 'Tron', slug: 'tron' },
    solana: { network: 'solana', name: 'Solana', slug: 'solana' }
  } as any,

  chainIdBySlug: {
    eth: 1,
    ropsten: 3,
    rinkeby: 4,
    goerly: 5,
    kovan: 42,
    bsc: 56,
    'bsc-testnet': 97,
    polygon: 137,
    'polygon-testnet': 80001,
    tron: 'tron',
    solana: 'solana'
  } as Record<string, number | string>,

  chainsByProvider: {
    [METAMASK]: [1, 3, 4, 5, 42, 56, 137],
    [BSC_WALLET]: [56, 97],
    [OKEX]: [1, 3, 4, 5, 42, 56, 137],
    [TRON_LINK]: ['tron'],
    [PHANTOM]: ['solana'],
    [WALLET_CONNECT]: [1, 3, 4, 5, 42, 56, 137]
  } as any,

  chains: {
    [BSC]: {
      chainId: '0x38',
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      chainName: 'Binance Smart Chain',
      nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
      blockExplorerUrls: ['https://bscscan.com/']
    },
    [POLYGON]: {
      chainId: '0x89',
      rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
      chainName: 'Matic Mainnet',
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
      blockExplorerUrls: [
        'https://explorer.matic.network/',
        'https://polygonscan.com/'
      ]
    },
    [ETHEREUM]: {
      chainId: '0x1'
    },
    [TRON]: {
      chainId: 'tron'
    },
    [SOLANA]: {
      chainId: 'solana'
    }
  },

  getNetworkName(chainId: any) {
    return (
      (this.networkByChain[chainId] && this.networkByChain[chainId].name) ||
      'unknown'
    )
  },

  getNetworkSlug(chainId: any) {
    return (
      (this.networkByChain[chainId] && this.networkByChain[chainId].slug) ||
      'unknown'
    )
  },

  getNetworkType(chainId: any) {
    return (
      (this.networkByChain[chainId] && this.networkByChain[chainId].network) ||
      'ethereum'
    )
  },

  isSupportedByProvider(chainId: string | number, provider: string): boolean {
    return this.chainsByProvider[provider].includes(chainId)
  },

  isValidSlug(slug: string) {
    return Boolean(this.chainIdBySlug[slug])
  },

  getChainData(name: string) {
    return this.chains[name]
  },

  getChainId(slug: string) {
    return this.chainIdBySlug[slug]
  }
}
