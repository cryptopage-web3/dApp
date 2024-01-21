import { BaseService } from './BaseService';
import { IUserListResponse, IUserSaveResponse } from '~/types';

export class UserService extends BaseService {
  readonly apiURL = '/user';

  save = async (address: string): Promise<IUserSaveResponse> => {
    const { data } = await this.post<IUserSaveResponse>(`${this.apiURL}/log`, {
      address,
    });

    return data;
  };

  getList = async (): Promise<IUserListResponse[]> => {
    const { data } = await this.get<IUserListResponse[]>(
      `${this.apiURL}/last-registered`,
    );

    return data;
  };
}
