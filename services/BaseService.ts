import axios from 'axios';
import qs from 'qs';
import { API_URL } from '~/constants';

const apiOrigin = API_URL;

const baseAxios = axios.create();
baseAxios.defaults.baseURL = apiOrigin;

/** Преобразует переданные данные params в строку запроса */
baseAxios.defaults.paramsSerializer = (data: any) => {
  return qs.stringify(data);
};

type BaseGETArgs = Parameters<typeof baseAxios.get>;
type BasePOSTArgs = Parameters<typeof baseAxios.post>;

/** Базовый класс для создания сервиса */
export class BaseService {
  /** Исполнитель запросов к API, базируется на реализации axios. Singleton */
  protected api = baseAxios;

  get = async <T>(...args: BaseGETArgs) => {
    const data = await this.api.get<T>(...args);

    return data;
  };

  post = async <T>(...args: BasePOSTArgs) => {
    const data = await this.api.post<T>(...args);

    return data;
  };
}
