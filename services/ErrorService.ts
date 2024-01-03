import { BaseService } from './BaseService';
import { IErrorSaveParams } from '~/types';

export class ErrorService extends BaseService {
  save = async (params: IErrorSaveParams) => {
    const data = await this.post<ILoginResponse>(`/front-error`, params);

    return data;
  };
}
