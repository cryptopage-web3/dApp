import Vue from 'vue';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { AxiosError } from 'axios';

import { alertModule, authModule } from '.';
import { NftsService } from '~/services';
import {
  ETypeNft,
  INftTransaction,
  ENftTransactionAccessType,
  INftTransactionsPagination,
  EAttachmentType,
  EErrorType,
} from '~/types';
import { uniqueNftTransactionConcat } from '~/utils/array';
import {
  nftDashboardResAdapter,
  nftDetailsDashboardResAdapter,
} from '~/adapters';
import { saveError } from '~/utils/saveError';

type TNftTransactionsPagination = INftTransactionsPagination;
type TNftTransaction = INftTransaction;

type TNftTransactionDetailsParams = {
  index: number;
  nft: INftTransaction;
};

const nftsService = new NftsService();

const DEFAULT_CHAIN_SLUG = 'mumbai';

const defaultNewContent: TNftTransactionsPagination = {
  nfts: [],
  count: 0,
  pageSize: 10,
  sort: 'desc',
  page: 0,
  hasAllPages: false,
};

@Module({
  name: 'home',
  namespaced: true,
  stateFactory: true,
})
export default class HomeModule extends VuexModule {
  newContent: TNftTransactionsPagination = { ...defaultNewContent };

  @Mutation
  public setNewContent(data: TNftTransactionsPagination) {
    this.newContent = data;
  }

  @Mutation
  public setNewContentDetails({ index, nft }: TNftTransactionDetailsParams) {
    const { nfts } = this.newContent;

    Vue.set(nfts, index, nft);
  }

  @Action
  public async fetchNfts() {
    try {
      const { page, pageSize } = this.newContent;
      const nextPage = page + 1;

      const { tokens } = await nftsService.getDashboardList({
        chainSlug: DEFAULT_CHAIN_SLUG,
        page: nextPage,
        pageSize,
      });

      /** текущие NFTs достаем только перед объединением
       * за время запроса уже могли получить детали и обновить старые NFT
       */
      const { nfts: oldNfts } = this.newContent;
      const newNfts = uniqueNftTransactionConcat(
        oldNfts,
        tokens.map((t) => nftDashboardResAdapter(t)),
      );

      this.setNewContent({
        ...this.newContent,
        nfts: newNfts,
        count: newNfts.length,
        page: nextPage,
        hasAllPages: !tokens.length,
      });
    } catch (error) {
      const errorMessage =
        (error as AxiosError)?.response?.status === 429
          ? 'Content Dashboard: Too Many Requests. Rate limit 30 per second'
          : 'Error getting Content data';

      alertModule.error(errorMessage);

      saveError(EErrorType.getDashboardList, errorMessage, {
        chainSlug: DEFAULT_CHAIN_SLUG,
        page: this.newContent.page + 1,
        pageSize: this.newContent.pageSize,
      });

      this.setNewContent({
        ...this.newContent,
        hasAllPages: true,
      });
    }
  }

  @Action
  public updateNftDetails({
    nft,
    updatedDetails,
  }: {
    nft: TNftTransaction;
    updatedDetails: Record<string, any>;
  }) {
    const { nfts } = this.newContent;
    const index = nfts.findIndex((item) => item === nft);

    this.setNewContentDetails({
      index,
      nft: {
        ...nft,
        ...updatedDetails,
      },
    });
  }

  @Action
  public async fetchNftTransactionDetails(nft: TNftTransaction) {
    const { nfts } = this.newContent;
    const index = nfts.findIndex((item) => item === nft);

    try {
      const data = await nftsService.getTransactionDetails({
        chainSlug: DEFAULT_CHAIN_SLUG,
        contractAddress: nft.contractAddress,
        tokenId: nft.tokenId,
        blockNumber: nft.blockNumber,
      });

      const nftWithDetails = nftDetailsDashboardResAdapter(nft, data);
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
        index,
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
        index,
        nft: {
          ...nft,
          hasDetails: true,
        },
      });
    }
  }

  @Action
  public clear(): void {
    /** удаляем nfts */

    this.setNewContent({
      ...defaultNewContent,
      nfts: [],
    });
  }
}
