import { BaseService } from './BaseService';
import { EChainSlug, INft, INftsParams, INftsResponse } from '~/types';

export class NftService extends BaseService {
  readonly apiURL = '/nfts';

  getList = async (params: INftsParams): Promise<INft[]> => {
    const slugMap = new Map<string, string>()
      .set(EChainSlug.eth, 'eth')
      .set(EChainSlug.bsc, 'bsc')
      .set(EChainSlug.solana, 'sol')
      .set(EChainSlug.tron, 'tron')
      .set(EChainSlug.polygon, 'matic');

    if (!slugMap.has(params.chainSlug)) {
      return [];
    }

    const data = await new Promise<INftsResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          nfts: [
            // {
            //   id: 1,
            //   image: '123',
            // },
            // {
            //   id: 2,
            //   image: '123',
            // },
            // {
            //   id: 3,
            //   image: '123',
            // },
            // {
            //   id: 4,
            //   image: '123',
            // },
            // {
            //   id: 5,
            //   image: '123',
            // },
            // {
            //   id: 6,
            //   image: '123',
            // },
            // {
            //   id: 7,
            //   image: '123',
            // },
          ],
        });
      }, 1000);
    });

    return data.nfts;
  };
}
