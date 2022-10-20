import { BaseService } from './BaseService';
import {
  INftDetailsParams,
  INftsParams,
  INftsResponse,
  INftTransactionDetailsResponse,
  INftTransactionsResponse,
} from '~/types';
import { API_CHAIN_MAP } from '~/constants';

export class NftsService extends BaseService {
  readonly apiURL = '/nfts';

  getList = async (params: INftsParams): Promise<INftsResponse> => {
    const slugMap = API_CHAIN_MAP;

    if (!slugMap.has(params.chainSlug)) {
      return {
        list: [],
        count: 0,
      };
    }

    const { data } = await this.get<INftsResponse>(
      `${this.apiURL}/${slugMap.get(params.chainSlug)}/${params.address}`,
      {
        params: {
          page: params.page,
          pageSize: params.pageSize,
        },
      },
    );

    return data;
  };

  getTransactionsList = async (
    params: INftsParams,
  ): Promise<INftTransactionsResponse> => {
    const slugMap = API_CHAIN_MAP;

    if (!slugMap.has(params.chainSlug)) {
      return {
        list: [],
        count: 0,
      };
    }

    const { data } = await this.get<INftTransactionsResponse>(
      `${this.apiURL}/transactions/${slugMap.get(params.chainSlug)}/${
        params.address
      }`,
      {
        params: {
          page: params.page,
          pageSize: params.pageSize,
        },
      },
    );

    return data;
  };

  getTransactionDetails = async (
    params: INftDetailsParams,
  ): Promise<INftTransactionDetailsResponse> => {
    const slugMap = API_CHAIN_MAP;

    if (!slugMap.has(params.chainSlug)) {
      return {};
    }

    const { data } = await this.get<INftTransactionDetailsResponse>(
      `${this.apiURL}/transaction/${slugMap.get(params.chainSlug)}/details/${
        params.contractAddress
      }/${params.tokenId}/${params.blockNumber}`,
    );

    return data;
  };

  getMimeType = async (url: string) => {
    const mimeType = await new Promise<string>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';

      xhr.onload = function () {
        resolve(xhr.response.type);
      };

      xhr.send();

      setTimeout(() => {
        resolve('');
      }, 30000);
    });

    return mimeType;
  };
}
