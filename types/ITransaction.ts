export enum ETransactionType {
  external = 'external',
  erc20 = 'erc20',
}

/**
 * Данные которые получаем из api
 */
export interface ITransactionData {
  asset: string;
  blockNum: number;
  category: ETransactionType.erc20 | ETransactionType.external;
  date: string;
  from: string;
  hash: string;
  to: string;
  value: number;
}

/**
 * Данные подготовленные для отображения
 */
export interface ITransaction {
  transactionAddress: string;
  isIncome: boolean;

  /** E.g. 'Receive' | 'Send' | 'Swap' */
  transferType: string;
  tokenOrCoinSymbolLeft: string;
  tokenOrCoinSymbolRight: string;
  tokenOrCoinAmount: number;
  transferDirection: 'From' | 'To' | 'Contract';

  from: string;
  to: string;
  value: number;
  hash: string;

  valueUSD?: number;
}
