/**
 * Данные которые получаем из api
 */
export interface ITransactionData {
  date: string;
  explorerUrl: string;
  fee: number;
  from: string;
  to: string;
  type?: 'contract_execution' | 'swap' | 'send';
  description?: string;
  hash: string;
  title: string;
  tokenAddress: string;
  tokenAmount: number;
  tokenSymbol: string;
  value: number;
  valueUSD: number;
}

/**
 * Данные подготовленные для отображения
 */
export interface ITransaction extends ITransactionData {
  transactionAddress: string;
  isIncome: boolean;

  /** E.g. 'Receive' | 'Send' | 'Swap' */
  displayTransferType: string;
  displayTokenOrCoinSymbol: string;
  displayTokenOrCoinAmount: number;
  displayTransferDirection: 'From' | 'To' | 'Contract';
}
