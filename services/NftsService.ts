import { BaseService } from './BaseService';
import {
  EChainSlug,
  INftsParams,
  INftsResponse,
  INftTransactionsResponse,
} from '~/types';

export class NftsService extends BaseService {
  readonly apiURL = '/nfts';

  getList = async (params: INftsParams): Promise<INftsResponse> => {
    const slugMap = new Map<string, string>()
      .set(EChainSlug.eth, 'eth')
      .set(EChainSlug.bsc, 'bsc')
      .set(EChainSlug.solana, 'sol')
      .set(EChainSlug.tron, 'tron')
      .set(EChainSlug.polygon, 'matic');

    if (!slugMap.has(params.chainSlug)) {
      return {
        list: [],
        count: 0,
      };
    }

    const { data } = await this.get<INftsResponse>(
      `${this.apiURL}/${slugMap.get(params.chainSlug)}/${params.address}`,
      {
        params: {
          skip: params.skip,
          limit: params.limit,
        },
      },
    );

    return data;
  };

  getTransactionsList = async (
    params: INftsParams,
  ): Promise<INftTransactionsResponse> => {
    const slugMap = new Map<string, string>()
      .set(EChainSlug.eth, 'eth')
      .set(EChainSlug.bsc, 'bsc')
      .set(EChainSlug.solana, 'sol')
      .set(EChainSlug.tron, 'tron')
      .set(EChainSlug.polygon, 'matic');

    if (!slugMap.has(params.chainSlug)) {
      return {
        list: [],
        count: 0,
      };
    }

    const { data } = await this.get<INftTransactionsResponse>(
      `${this.apiURL}/transactions/${slugMap.get(params.chainSlug)}/${
        params.address
      }`,
      {
        params: {
          skip: params.skip,
          limit: params.limit,
        },
      },
    );

    return data;
  };
}
