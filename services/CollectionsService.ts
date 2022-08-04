import { BaseService } from './BaseService';
import {
  ICollectionsParams,
  ICollectionsResponse,
  IMarketDashboardParams,
  IMarketDashboardResponse,
} from '~/types';

export class CollectionsService extends BaseService {
  readonly apiURL = '/collections';

  getList = async (
    params: ICollectionsParams,
  ): Promise<ICollectionsResponse> => {
    const { data } = await this.get<ICollectionsResponse>(`${this.apiURL}`, {
      params,
    });

    return data;
  };

  getMarketDashboard = async (
    params: IMarketDashboardParams,
  ): Promise<IMarketDashboardResponse> => {
    const { data } = await this.get<IMarketDashboardResponse>(
      `${this.apiURL}/market-dashboard`,
      {
        params,
      },
    );

    return data;
  };
}
