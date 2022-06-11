export interface ITransaction {
  name: string;
  from: string;
  to: string;
  fee: number;
  value: number;
  tokenSymbol: string;
  tokenAmount: number;
  tokenAddress: string;
  hash: string;
  explorerUrl: string;
}
