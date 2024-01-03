import { BaseService } from './BaseService';
import { IErrorSaveParams, IErrorSaveResponse } from '~/types';

export class ErrorService extends BaseService {
  save = async (params: IErrorSaveParams) => {
    const { data } = await this.post<IErrorSaveResponse>(
      `/front-error`,
      params,
    );

    return data;
  };
}
