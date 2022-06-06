import { BaseService } from './BaseService';
import { EChainSlug, IToken, ITokensParams, ITokensResponse } from '~/types';

export class TokensService extends BaseService {
  readonly apiURL = '/tokens';

  getList = async (params: ITokensParams): Promise<IToken[]> => {
    const slugMap = new Map<string, string>()
      .set(EChainSlug.eth, 'eth')
      .set(EChainSlug.bsc, 'bsc')
      .set(EChainSlug.solana, 'sol')
      .set(EChainSlug.tron, 'tron')
      .set(EChainSlug.polygon, 'matic');

    if (!slugMap.has(params.chainSlug)) {
      return [];
    }

    const { data } = await this.get<ITokensResponse>(
      `${this.apiURL}/${slugMap.get(params.chainSlug)}/${params.address}`,
    );

    return data.tokens;
  };
}
