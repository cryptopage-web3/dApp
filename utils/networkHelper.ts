import { EChainId } from '~/types/EChainId'
import { EProvider } from '~/types/EProvider'

export const CHAINS = ['ETHEREUM', 'BSC', 'POLYGON', 'TRON', 'SOLANA']
const [ETHEREUM, BSC, POLYGON, TRON, SOLANA] = CHAINS

export const networkHelper = {
  networkByChain: {
    [EChainId.eth]: { network: 'ethereum', name: 'Ethereum', slug: 'eth' },
    [EChainId.ropsten]: {
      network: 'ethereum',
      name: 'Ropsten TestNet',
      slug: 'ropsten'
    },
    [EChainId.rinkeby]: {
      network: 'ethereum',
      name: 'Rinkeby TestNet',
      slug: 'rinkeby'
    },
    [EChainId.goerli]: {
      network: 'ethereum',
      name: 'Goerli TestNet',
      slug: 'goerli'
    },
    [EChainId.kovan]: {
      network: 'ethereum',
      name: 'Kovan TestNet',
      slug: 'kovan'
    },
    [EChainId.bsc]: { network: 'bsc', name: 'BSC Network', slug: 'bsc' },
    [EChainId.bscTestnet]: {
      network: 'bsc',
      name: 'BSC TestNet',
      slug: 'bsc-testnet'
    },
    [EChainId.polygon]: {
      network: 'polygon',
      name: 'Polygon',
      slug: 'polygon'
    },
    [EChainId.polygonTestnet]: {
      network: 'polygon',
      name: 'Polygon TestNet',
      slug: 'polygon-testnet'
    },
    tron: { network: 'tron', name: 'Tron', slug: 'tron' },
    solana: { network: 'solana', name: 'Solana', slug: 'solana' }
  } as any,

  chainIdBySlug: {
    eth: EChainId.eth,
    ropsten: EChainId.ropsten,
    rinkeby: EChainId.rinkeby,
    goerli: EChainId.goerli,
    kovan: EChainId.kovan,
    bsc: EChainId.bsc,
    'bsc-testnet': EChainId.bscTestnet,
    polygon: EChainId.polygon,
    'polygon-testnet': EChainId.polygonTestnet,
    tron: EChainId.tron,
    solana: EChainId.solana
  } as Record<string, number | string>,

  chainsByProvider: {
    [EProvider.metamask]: [
      EChainId.eth,
      EChainId.ropsten,
      EChainId.rinkeby,
      EChainId.goerli,
      EChainId.kovan,
      EChainId.bsc,
      EChainId.polygon
    ],
    [EProvider.bscWallet]: [EChainId.bsc, EChainId.bscTestnet],
    [EProvider.okex]: [
      EChainId.eth,
      EChainId.ropsten,
      EChainId.rinkeby,
      EChainId.goerli,
      EChainId.kovan,
      EChainId.bsc,
      EChainId.polygon
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
      EChainId.polygon
    ]
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
