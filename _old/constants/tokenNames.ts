import { EChainSlug } from '~/types/EChainSlug'

const tokenNames: Record<string, string> = {
  [EChainSlug.eth]: 'erc20',
  [EChainSlug.ropsten]: 'erc20',
  [EChainSlug.rinkeby]: 'erc20',
  [EChainSlug.goerli]: 'erc20',
  [EChainSlug.kovan]: 'erc20',
  [EChainSlug.bsc]: 'bep20',
  [EChainSlug.bscTestnet]: 'bep20',
  [EChainSlug.polygon]: 'erc20',
  [EChainSlug.polygonTestnet]: 'erc20',
  [EChainSlug.tron]: 'trc20',
  [EChainSlug.solana]: 'sol20'
}

export default tokenNames
