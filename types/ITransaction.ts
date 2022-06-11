export interface ITransaction {
  date: string;
  explorerUrl: string;
  fee: number;
  from: string;
  to: string;
  hash: string;
  title: string;
  tokenAddress: string;
  tokenAmount: number;
  tokenSymbol: string;
  value: number;
  valueUSD: number;
}
