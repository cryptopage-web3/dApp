export interface IToken {
  balance: number;
  balancePrice?: number;
  logo: string | null;
  name: string;
  percentChange?: number;
  price?: number;
  symbol: string;
  address?: string;
}
