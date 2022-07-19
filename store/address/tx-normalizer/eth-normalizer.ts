import {
  ITransaction,
  TEthTransaction,
  OperationType,
  TransactionType,
} from '~/types';
import { networkHelper } from '~/utils/networkHelper';

export function normalizeEth(
  data: TEthTransaction,
  walletAddress: string,
  chainId: string | number,
): ITransaction {
  const isIncome = data.to === walletAddress;
  /* const isTokenTx = Boolean(
    'tokenAddress' in data || data.send || data.receive,
  ); */

  return {
    ...data,
    isIncome,
    transactionAddress: isIncome ? data.from : data.to,
    transferType: getTransferType(data),
    tokenOrCoinSymbolLeft: getTokenOrCoinSymbolLeft(data, chainId),
    tokenOrCoinSymbolRight: getTokenOrCoinSymbolRight(data, chainId),
    tokenOrCoinAmount: getTokenOrCoinAmount(data),
    transferDirection: getTransferDirection(data, isIncome),
    valueUSD: 0,
  };
}

function getTransferType(data: TEthTransaction): string {
  if (data.operationType === OperationType.swap) {
    return 'Swap';
  } else if (data.operationType === OperationType.contract_execution) {
    return 'Smart contract executed';
  } else if (data.operationType === OperationType.receive) {
    return 'Receive';
  }

  return 'Send';
}

function getTransferDirection(data: TEthTransaction, isIncome: boolean) {
  if (data.operationType === OperationType.contract_execution) {
    return 'Contract';
  } else if (isIncome) {
    return 'From';
  }

  return 'To';
}

function getTokenOrCoinSymbolLeft(
  data: TEthTransaction,
  chainId: string | number,
): string {
  if (data.operationType === OperationType.send) {
    return extractSymbol(data.send ? data.send[0] : data, chainId);
  } else if (data.operationType === OperationType.receive) {
    return extractSymbol(data.receive ? data.receive[0] : data, chainId);
  } else if (data.operationType === OperationType.swap) {
    return buildSwapTokenOrCoinSymbol(data, chainId);
  }

  return networkHelper.getNetworkSymbol(chainId);
}

function getTokenOrCoinSymbolRight(
  data: TEthTransaction,
  chainId: string | number,
): string {
  if (data.operationType === OperationType.receive) {
    return extractSymbol(data.receive ? data.receive[0] : data, chainId);
  } else if (data.operationType === OperationType.send) {
    return extractSymbol(data.send ? data.send[0] : data, chainId);
  }

  return extractSymbol(data, chainId);
}

function buildSwapTokenOrCoinSymbol(
  data: TEthTransaction,
  chainId: string | number,
) {
  const sendCoinsOrTokens = data.send || [data];

  const send = sendCoinsOrTokens.map((tx) => extractSymbol(tx, chainId)) || [];

  const receiveCoinsOrTokens = data.receive || [data];

  const receive =
    receiveCoinsOrTokens.map((tx) => extractSymbol(tx, chainId)) || [];

  return (
    [...new Set(send)].join(', ') + ' -> ' + [...new Set(receive)].join(', ')
  );
}

function extractSymbol(tx: TEthTransaction, chainId: string | number) {
  return tx.transactionType === TransactionType.erc20
    ? tx.tokenSymbol
    : networkHelper.getNetworkSymbol(chainId);
}

function getTokenOrCoinAmount(data: TEthTransaction): number {
  if (data.operationType === OperationType.send) {
    return data.send ? data.send[0].value : data.value;
  } else if (data.operationType === OperationType.receive) {
    return data.receive ? data.receive[0].value : data.value;
  }

  return data.value;
}
