import { normalizeEth } from './eth-normalizer';
import { defaultNormalizer } from './default-normalizer';
import { EChainId, ITransaction, ITransactionData } from '~/types';

export function normalize(
  data: ITransactionData,
  walletAddress: string,
  chainId: string | number,
): ITransaction {
  if (chainId === EChainId.eth) {
    return normalizeEth(data as any, chainId);
  }

  return defaultNormalizer(data, walletAddress, chainId);
}
