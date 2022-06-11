import { BaseService } from './BaseService';
import {
  EChainSlug,
  ITransactionsParams,
  ITransactionsResponse,
} from '~/types';

export class TransactionsService extends BaseService {
  readonly apiURL = '/transactions';

  getList = async (
    params: ITransactionsParams,
  ): Promise<ITransactionsResponse> => {
    const slugMap = new Map<string, string>()
      .set(EChainSlug.eth, 'eth')
      .set(EChainSlug.bsc, 'bsc')
      .set(EChainSlug.solana, 'sol')
      .set(EChainSlug.tron, 'tron')
      .set(EChainSlug.polygon, 'matic');

    if (!slugMap.has(params.chainSlug)) {
      return {
        transactions: [],
        count: 0,
      };
    }

    const { data } = await this.get<ITransactionsResponse>(
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
}