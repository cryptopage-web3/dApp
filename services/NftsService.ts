import { BaseService } from './BaseService';
import {
  INftDashboardParams,
  INftDashboardResponse,
  INftDetailsParams,
  INftsParams,
  INftsResponse,
  INftTransactionDetailsResponse,
  INftTransactionsParams,
  INftTransactionsResponse,
  IOwnNftDetailsParams,
  IOwnNftDetailsResponse,
} from '~/types';
import { API_CHAIN_MAP } from '~/constants';

export class NftsService extends BaseService {
  readonly apiURL = '/nfts';

  getList = async (params: INftsParams): Promise<INftsResponse> => {
    const slugMap = API_CHAIN_MAP;

    if (!slugMap.has(params.chainSlug)) {
      return {
        list: [],
      };
    }

    const { data } = await this.get<INftsResponse>(
      `${this.apiURL}/${slugMap.get(params.chainSlug)}/${params.address}`,
      {
        params: {
          pageSize: params.pageSize,
          continue: params.continue,
        },
      },
    );

    return data;
  };

  getOwnDetails = async (
    params: IOwnNftDetailsParams,
  ): Promise<IOwnNftDetailsResponse | null> => {
    const slugMap = API_CHAIN_MAP;

    if (!slugMap.has(params.chainSlug)) {
      return null;
    }

    const { data } = await this.get<IOwnNftDetailsResponse>(
      `${this.apiURL}/token-details/${slugMap.get(params.chainSlug)}/contract/${
        params.contractAddress
      }/token/${params.tokenId}`,
    );

    return data;
  };

  getTransactionsList = async (
    params: INftTransactionsParams,
  ): Promise<INftTransactionsResponse> => {
    const slugMap = API_CHAIN_MAP;

    if (!slugMap.has(params.chainSlug)) {
      return {
        transactions: [],
      };
    }

    const { data } = await this.get<INftTransactionsResponse>(
      `${this.apiURL}/transactions/${slugMap.get(params.chainSlug)}/${
        params.address
      }`,
      {
        params: {
          pageSize: params.pageSize,
          continue: params.continue,
        },
      },
    );

    return data;
  };

  getDashboardList = async (
    params: INftDashboardParams,
  ): Promise<INftDashboardResponse> => {
    const slugMap = API_CHAIN_MAP;

    if (!slugMap.has(params.chainSlug)) {
      return {
        tokens: [],
      };
    }

    const { data } = await this.get<INftDashboardResponse>(
      `${this.apiURL}/dashboard/${slugMap.get(params.chainSlug)}`,
      {
        params: {
          page: params.page,
          pageSize: params.pageSize,
        },
      },
    );

    return data;
  };

  getLastPosts = async (
    params: INftDashboardParams,
  ): Promise<INftDashboardResponse> => {
    const slugMap = API_CHAIN_MAP;

    if (!slugMap.has(params.chainSlug)) {
      return {
        tokens: [],
      };
    }

    const { data } = await this.get<INftDashboardResponse>(
      `${this.apiURL}/last-posts/${slugMap.get(params.chainSlug)}`,
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
    let mimeType = '';

    try {
      const callGetMethod = (): Promise<string> =>
        new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);

          xhr.onprogress = () => {
            const contentType = xhr.getResponseHeader('Content-Type');
            xhr.abort();
            resolve(contentType || '');
          };

          xhr.onerror = reject;

          xhr.send();
        });

      mimeType = await new Promise<string>((resolve, reject) => {
        callGetMethod().then(resolve).catch(reject);

        setTimeout(() => {
          resolve('');
        }, 30000);
      });
    } catch {
      mimeType = '';
    }

    if (!mimeType) {
      if (/\.(gif|jpeg|jpg|png|webp|bmp|svg)$/i.test(url)) {
        mimeType = 'image/jpeg';
      }

      if (/\.(avi|mp4|mov|webm|mpeg|wmv)$/i.test(url)) {
        mimeType = 'video/mp4';
      }

      if (/\.(mp3|wav|ogg|flac)$/i.test(url)) {
        mimeType = 'audio/mp3';
      }
    }

    return mimeType;
  };
}
