import { ITransaction, ITransactionData } from '~/types';
import { networkHelper } from '~/utils/networkHelper';

export function transactionResAdapter(
  data: ITransactionData,
  walletAddress: string,
  chainId: string | number,
): ITransaction {
  const isIncome = getIsIncome(data, walletAddress);
  const transferType = isIncome ? 'Receive' : 'Send';
  const symbol = data.asset || networkHelper.getNetworkSymbol(chainId);

  return {
    transactionAddress: isIncome ? data.from : data.to,
    isIncome,
    transferType,
    tokenOrCoinSymbolLeft: symbol,
    tokenOrCoinSymbolRight: symbol,
    tokenOrCoinAmount: data.value,
    transferDirection: isIncome ? 'From' : 'To',
    from: data.from,
    to: data.to,
    value: data.value,
    hash: data.hash,
    date: data.date,
    valueUSD: 0,
  };
}

export function getIsIncome(data: ITransactionData, walletAddress: string) {
  const address = walletAddress.toLowerCase();
  const to = data.to.toLowerCase();

  return to === address;
}
