import Vue from 'vue';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { AxiosError } from 'axios';

import { alertModule, authModule } from '.';
import { NftsService, UserService } from '~/services';
import {
  ETypeNft,
  INftTransaction,
  ENftTransactionAccessType,
  INftTransactionsPagination,
  EAttachmentType,
  EErrorType,
  INewUser,
  INftDashboardResponse,
  INftDashboardParams,
} from '~/types';
import { uniqueNftTransactionConcatByTokenId } from '~/utils/array';
import {
  nftDashboardResAdapter,
  nftDetailsDashboardResAdapter,
} from '~/adapters';
import { saveError } from '~/utils/saveError';
import { nftTokenDetailsCache } from '~/services/NftTokenDetailsCache';
import { getApiChainBySlug } from '~/constants';

type TNftTransactionsPagination = INftTransactionsPagination;
type TNftTransaction = INftTransaction;

type TNftTransactionDetailsParams = {
  nft: INftTransaction;
};

const nftsService = new NftsService();
const userService = new UserService();

const DEFAULT_CHAIN_SLUG = 'polygon';

const defaultNewContent: TNftTransactionsPagination = {
  nfts: [],
  count: 0,
  pageSize: 10,
  sort: 'desc',
  page: 0,
  hasAllPages: false,
};

function handleFetchNftsListError(
  errorType: EErrorType,
  saveCallback: (params: TNftTransactionsPagination) => void,
  storage: TNftTransactionsPagination,
) {
  return (error: any) => {
    const errorMessage =
      (error as AxiosError)?.response?.status === 429
        ? 'Content Dashboard: Too Many Requests. Rate limit 30 per second'
        : 'Error getting Content data';

    alertModule.error(errorMessage);

    saveError(errorType, errorMessage, {
      chainSlug: DEFAULT_CHAIN_SLUG,
      page: storage.page + 1,
      pageSize: storage.pageSize,
    });

    saveCallback({
      ...storage,
      hasAllPages: true,
    });

    return {};
  };
}

async function fetchNftList(
  fetchCallback: (
    params: INftDashboardParams,
  ) => Promise<INftDashboardResponse>,
  saveCallback: (params: TNftTransactionsPagination) => void,
  storage: TNftTransactionsPagination,
  errorType: EErrorType,
) {
  const { page, pageSize, nfts: oldNfts } = storage;
  const nextPage = page + 1;

  const { tokens } = (await fetchCallback({
    chainSlug: DEFAULT_CHAIN_SLUG,
    page: nextPage,
    pageSize,
  }).catch(
    handleFetchNftsListError(errorType, saveCallback, storage),
  )) as INftDashboardResponse;

  if (!tokens) {
    return;
  }

  /** текущие NFTs достаем только перед объединением
   * за время запроса уже могли получить детали и обновить старые NFT
   */
  const newNfts = uniqueNftTransactionConcatByTokenId(
    oldNfts,
    tokens.map((t) => nftDashboardResAdapter(t)),
  );

  saveCallback({
    ...storage,
    nfts: newNfts,
    count: newNfts.length,
    page: nextPage,
    hasAllPages: !tokens.length,
  });
}

@Module({
  name: 'home',
  namespaced: true,
  stateFactory: true,
})
export default class HomeModule extends VuexModule {
  newContent: TNftTransactionsPagination = { ...defaultNewContent };
  forYou: TNftTransactionsPagination = { ...defaultNewContent };
  newUsers: INewUser[] = [];

  @Mutation
  public setNewContent(data: TNftTransactionsPagination) {
    this.newContent = data;
  }

  @Mutation
  public setForYou(data: TNftTransactionsPagination) {
    this.forYou = data;
  }

  @Mutation
  public setNewUsers(data: INewUser[]) {
    this.newUsers = data;
  }

  @Mutation
  public setNewContentDetails({ nft }: TNftTransactionDetailsParams) {
    const { nfts } = this.newContent;

    const index = nfts.findIndex((item) => item.tokenId === nft.tokenId);

    if (index !== -1) {
      Vue.set(nfts, index, nft);
    }
  }

  @Mutation
  public setForMeDetails({ nft }: TNftTransactionDetailsParams) {
    const { nfts } = this.forYou;

    const index = nfts.findIndex((item) => item.tokenId === nft.tokenId);

    if (index !== -1) {
      Vue.set(nfts, index, nft);
    }
  }

  @Action
  public async fetchNewContent() {
    const saveCallback = (params: TNftTransactionsPagination) =>
      this.setNewContent(params);
    // const storage = this.newContent;
    // await new Promise<void>((resolve, reject) => resolve());
    await fetchNftList(
      (params) => nftsService.getLastPosts(params),
      saveCallback,
      this.newContent,
      EErrorType.getLastPosts,
    );
  }

  @Action
  public async fetchForYou() {
    const saveCallback = (params: TNftTransactionsPagination) =>
      this.setForYou(params);
    const storage = this.forYou;

    await fetchNftList(
      (params) => nftsService.getDashboardList(params),
      saveCallback,
      storage,
      EErrorType.getDashboardList,
    );
  }

  @Action
  public updateNftDetails({
    nft,
    updatedDetails,
  }: {
    nft: TNftTransaction;
    updatedDetails: Record<string, any>;
  }) {
    function update(sourceList: TNftTransaction[]) {
      const index = sourceList.findIndex(
        (item) => item.tokenId === nft.tokenId,
      );

      if (index === -1) {
        return;
      }

      const nftForUpdate = sourceList[index];

      Vue.set(sourceList, index, {
        ...nftForUpdate,
        ...updatedDetails,
      });
    }

    update(this.newContent.nfts);
    update(this.forYou.nfts);
  }

  @Action
  public async fetchNftTransactionDetails(nft: TNftTransaction) {
    try {
      let nftWithDetails = nftTokenDetailsCache.get(
        getApiChainBySlug(DEFAULT_CHAIN_SLUG as any) as any,
        nft.contractAddress,
        nft.tokenId,
      );

      if (!nftWithDetails) {
        const data = await nftsService.getOwnDetails({
          chainSlug: DEFAULT_CHAIN_SLUG,
          contractAddress: nft.contractAddress,
          tokenId: nft.tokenId,
        });

        nftWithDetails = nftDetailsDashboardResAdapter(nft, data);
        nftTokenDetailsCache.add(nftWithDetails);
      }

      const { contentUrl, isEncrypted, attachments } = nftWithDetails;

      const videoAttach = attachments?.find(
        (item) => item.type === EAttachmentType.video,
      );
      const audioAttach = attachments?.find(
        (item) => item.type === EAttachmentType.audio,
      );

      /** если attachments пустой, то значит это текстовое NFT */
      if (!attachments?.length) {
        nftWithDetails.type = ETypeNft.text;
      } else if (videoAttach) {
        /** в наших NFT в contentUrl для видео содержится картинка - нет изображения
         * поэтому достаем ссылки на видео из attachments
         */
        nftWithDetails.type = ETypeNft.video;
        nftWithDetails.contentUrl = videoAttach.data as string;
      } else if (audioAttach) {
        nftWithDetails.type = ETypeNft.audio;
        nftWithDetails.contentUrl = audioAttach.data as string;
      } else if (contentUrl) {
        const mimeType = await nftsService.getMimeType(contentUrl);

        if (/audio/.test(mimeType)) {
          nftWithDetails.type = ETypeNft.audio;
        }

        if (/video/.test(mimeType)) {
          nftWithDetails.type = ETypeNft.video;
        }

        /** если есть урл и не удалось определить mimeType,
         * то по умолчанию указываем картинку */
        if (/image/.test(mimeType) || !mimeType) {
          nftWithDetails.type = ETypeNft.image;
        }
      }

      if (isEncrypted) {
        if (
          nftWithDetails.to.toLocaleLowerCase() ===
          authModule.address.toLocaleLowerCase()
        ) {
          nftWithDetails.accessType = ENftTransactionAccessType.has_access;
        } else {
          nftWithDetails.accessType = ENftTransactionAccessType.not_requested;
        }
      } else {
        nftWithDetails.accessType = ENftTransactionAccessType.has_access;
      }

      this.setNewContentDetails({
        nft: nftWithDetails,
      });

      this.setForMeDetails({
        nft: nftWithDetails,
      });
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 429) {
        alertModule.error(
          'Content Details: Too Many Requests. Rate limit 30 per second',
        );
      }

      saveError(EErrorType.getDashboardDetails, '', {
        chainSlug: DEFAULT_CHAIN_SLUG,
        contractAddress: nft.contractAddress,
        tokenId: nft.tokenId,
        blockNumber: nft.blockNumber,
      });

      this.setNewContentDetails({
        nft: {
          ...nft,
          hasDetails: true,
        },
      });

      this.setForMeDetails({
        nft: {
          ...nft,
          hasDetails: true,
        },
      });
    }
  }

  @Action
  public async fetchNewUsers() {
    try {
      const data = await userService.getList();

      this.setNewUsers(data);
    } catch (error) {
      saveError(EErrorType.fetchNewUsers, '');
    }
  }

  @Action
  public clear(): void {
    /** удаляем nfts */

    this.setNewContent({
      ...defaultNewContent,
      nfts: [],
    });

    this.setForYou({
      ...defaultNewContent,
      nfts: [],
    });

    /** удаляем пользователей */

    this.setNewUsers([]);
  }
}
