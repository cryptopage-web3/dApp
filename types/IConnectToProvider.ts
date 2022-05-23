import { IConnectData } from './IConnectData';
import { EChainSlug, EProvider } from '.';

export interface IConnectToProviderParams {
  chain: EChainSlug;
  provider: EProvider;
}

export interface IConnectToProviderResponse {
  status: string;
  message?: {
    title: string;
    text: string;
  };
  connectData?: IConnectData;
}

export interface IConnectChangeParams {
  chainId: string | number;
  address: string;
}

export interface ITronRequestResponse {
  code: number;
  message: string;
}
