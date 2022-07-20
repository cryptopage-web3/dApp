import { ITransaction, ITransactionData } from '~/types';
import { networkHelper } from '~/utils/networkHelper';

export function defaultNormalizer(
  data: ITransactionData,
  walletAddress: string,
  chainId: string | number,
): ITransaction {
  const isIncome = getIsIncome(data, walletAddress);
  const transferType = isIncome ? 'Receive' : 'Send';
  const isTokenTx = Boolean(data.tokenAddress);
  const symbol = isTokenTx
    ? data.tokenSymbol
    : networkHelper.getNetworkSymbol(chainId);

  return {
    ...data,
    isIncome,
    transactionAddress: isIncome ? data.from : data.to,
    transferType,
    tokenOrCoinSymbolLeft: symbol,
    tokenOrCoinSymbolRight: symbol,
    tokenOrCoinAmount: isTokenTx ? data.tokenAmount : data.value,
    transferDirection: isIncome ? 'From' : 'To',
  };
}

export function getIsIncome(data: ITransactionData, walletAddress: string) {
  const address = walletAddress.toLowerCase();
  const to = data.to.toLowerCase();

  return to === address;
}
