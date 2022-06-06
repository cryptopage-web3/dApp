import axios from 'axios';
import { API_URL } from '~/constants';

const apiOrigin = API_URL;

const baseAxios = axios.create();
baseAxios.defaults.baseURL = apiOrigin;

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
