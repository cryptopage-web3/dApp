import { BaseService } from './BaseService';
import { ITransactionsParams, ITransactionsResponse } from '~/types';
import { API_CHAIN_MAP } from '~/constants';

export class TransactionsService extends BaseService {
  readonly apiURL = '/transactions';

  getList = async (
    params: ITransactionsParams,
  ): Promise<ITransactionsResponse> => {
    const slugMap = API_CHAIN_MAP;

    if (!slugMap.has(params.chainSlug)) {
      return {
        transactions: [],
      };
    }

    const { data } = await this.get<ITransactionsResponse>(
      `${this.apiURL}/${slugMap.get(params.chainSlug)}/${params.address}`,
      {
        params: {
          pageSize: params.pageSize,
          continue: params.continue,
        },
      },
    );

    return data;
  };
}
