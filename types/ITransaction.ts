export enum EOperationType {
  send = 'send',
  receive = 'receive',
  swap = 'swap',
  contract_execution = 'contract_execution',
}

export enum ETransactionType {
  normal = 'normal',
  erc20 = 'erc20',
}

/**
 * Данные которые получаем из api
 */
export interface IErc20TransactionData {
  transactionType: ETransactionType.erc20;
  operationType: EOperationType;
  blockNumber: number;
  timeStamp: number;
  hash: string;
  nonce: number;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: number;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: number;
  transactionIndex: number;
  gas: number;
  gasPrice: number;
  gasUsed: number;
  cumulativeGasUsed: number;
  input: string;
  confirmations: number;
  send?: IErc20TransactionData[];
  receive?: IErc20TransactionData[];
}

/**
 * Данные которые получаем из api
 */
export interface IEthTransactionData {
  transactionType: ETransactionType.normal;
  operationType: EOperationType;
  blockNumber: number;
  timeStamp: number;
  hash: string;
  nonce: number;
  blockHash: number;
  transactionIndex: number;
  from: string;
  to: string;
  value: number;
  gas: number;
  gasPrice: number;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: number;
  gasUsed: string;
  confirmations: number;
  methodId: string;
  functionName: string;
  send?: IErc20TransactionData[];
  receive?: IErc20TransactionData[];
}

export type TEthTransaction = IEthTransactionData | IErc20TransactionData;

/**
 * Данные которые получаем из api
 */
export interface ITransactionData {
  transactionType: ETransactionType.erc20 | ETransactionType.normal;
  date: string;
  explorerUrl: string;
  fee: number;
  from: string;
  to: string;
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
