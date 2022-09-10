import { BaseService } from './BaseService';
import { IToken, ITokensParams, ITokensResponse } from '~/types';
import { API_CHAIN_MAP } from '~/constants';

export class TokensService extends BaseService {
  readonly apiURL = '/tokens';

  getList = async (params: ITokensParams): Promise<IToken[]> => {
    const slugMap = API_CHAIN_MAP;

    if (!slugMap.has(params.chainSlug)) {
      return [];
    }

    const { data } = await this.get<ITokensResponse>(
      `${this.apiURL}/${slugMap.get(params.chainSlug)}/${params.address}`,
    );

    return data.tokens;
  };
}
