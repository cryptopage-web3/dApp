import { BaseService } from './BaseService';
import {
  ICollectionsParams,
  ICollectionsResponse,
  ILastUpdatedParams,
  ILastUpdatedResponse,
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

  getLastUpdated = async (
    params: ILastUpdatedParams,
  ): Promise<ILastUpdatedResponse> => {
    const { data } = await this.get<ILastUpdatedResponse>(
      `${this.apiURL}/last-updated`,
      {
        params,
      },
    );

    return data;
  };
}
