import { BaseService } from './BaseService';
import { EChainSlug, ITransaction, ITransactionsParams } from '~/types';

export class TransactionsService extends BaseService {
  readonly apiURL = '/transactions';

  getList = async (params: ITransactionsParams): Promise<ITransaction[]> => {
    const slugMap = new Map<string, string>()
      .set(EChainSlug.eth, 'eth')
      .set(EChainSlug.bsc, 'bsc')
      .set(EChainSlug.solana, 'sol')
      .set(EChainSlug.tron, 'tron')
      .set(EChainSlug.polygon, 'matic');

    if (!slugMap.has(params.chainSlug)) {
      return [];
    }

    const { data } = await this.get<ITransaction[]>(
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
