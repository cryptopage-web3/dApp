import { BaseService } from './BaseService';
import {
  IEthTransactionsParams,
  IEthTransactionsResponse,
  ITransactionsParams,
  ITransactionsResponse,
} from '~/types';
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
        count: 0,
      };
    }

    const { data } = await this.get<ITransactionsResponse>(
      `${this.apiURL}/${slugMap.get(params.chainSlug)}/${params.address}`,
      {
        params: {
          page: params.page,
          pageSize: params.pageSize,
          continue: params.continue,
        },
      },
    );

    return data;
  };

  getEthList = async (
    params: IEthTransactionsParams,
  ): Promise<IEthTransactionsResponse> => {
    const { data } = await this.get<IEthTransactionsResponse>(
      `${this.apiURL}/eth/${params.address}`,
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
