import { getIsIncome } from './normalizer';
import { ITransaction, ITransactionData } from '~/types';
import { networkHelper } from '~/utils/networkHelper';

export function normalizeEth(
  data: ITransactionData,
  walletAddress: string,
  chainId: string | number,
): ITransaction {
  const isIncome = getIsIncome(data, walletAddress);
  const isTokenTx = Boolean(data.tokenAddress);

  return {
    ...data,
    isIncome,
    transactionAddress: isIncome ? data.from : data.to,
    displayTransferType: getDisplayTransferType(data, isIncome),
    displayTokenOrCoinSymbol: getDisplayTokenOrCoinSymbol(
      data,
      isTokenTx,
      chainId,
    ),
    displayTokenOrCoinAmount: isTokenTx ? data.tokenAmount : data.value,
    displayTransferDirection: getDisplayTransferDirection(data, isIncome),
  };
}

function getDisplayTransferType(
  data: ITransactionData,
  isIncome: boolean,
): string {
  if (data.type === 'swap') {
    return 'Swap';
  } else if (data.type === 'contract_execution') {
    return 'Smart contract executed';
  } else if (isIncome) {
    return 'Receive';
  }

  return 'Send';
}

function getDisplayTransferDirection(
  data: ITransactionData,
  isIncome: boolean,
) {
  if (data.type === 'contract_execution') {
    return 'Contract';
  } else if (isIncome) {
    return 'From';
  }

  return 'To';
}

function getDisplayTokenOrCoinSymbol(
  data: ITransactionData,
  isTokenTx: boolean,
  chainId: string | number,
): string {
  if (isTokenTx) {
    return data.tokenSymbol;
  }

  return networkHelper.getNetworkSymbol(chainId);
}
