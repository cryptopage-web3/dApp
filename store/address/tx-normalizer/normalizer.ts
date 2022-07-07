import { normalizeEth } from './eth-normalizer';
import { EChainId, ITransaction, ITransactionData } from '~/types';
import { networkHelper } from '~/utils/networkHelper';

export function normalize(
  data: ITransactionData,
  walletAddress: string,
  chainId: string | number,
): ITransaction {
  if (chainId === EChainId.eth) {
    return normalizeEth(data, walletAddress, chainId);
  }
  return defaultNormalizer(data, walletAddress, chainId);
}

function defaultNormalizer(
  data: ITransactionData,
  walletAddress: string,
  chainId: string | number,
): ITransaction {
  const isIncome = getIsIncome(data, walletAddress);
  const displayTransferType = isIncome ? 'Receive' : 'Send';
  const isTokenTx = Boolean(data.tokenAddress);

  return {
    ...data,
    isIncome,
    transactionAddress: isIncome ? data.from : data.to,
    displayTransferType,
    displayTokenOrCoinSymbol: isTokenTx
      ? data.tokenSymbol
      : networkHelper.getNetworkSymbol(chainId),
    displayTokenOrCoinAmount: isTokenTx ? data.tokenAmount : data.value,
    displayTransferDirection: isIncome ? 'From' : 'To',
  };
}

export function getIsIncome(data: ITransactionData, walletAddress: string) {
  const address = walletAddress.toLowerCase();
  const to = data.to.toLowerCase();

  return to === address;
}
