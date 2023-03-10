import { EProvider } from './EProvider';

export interface IConnectData {
  address: string;
  chainId: number | string;
  providerSlug: EProvider | null;
  /** объект подключения к провайдеру, для web3 */
  provider?: any;
}
