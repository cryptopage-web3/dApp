<template>
  <div ref="root" class="col-xl-4 col-md-4 col-12">
    <div class="market-product">
      <div class="thumb">
        <Skeleton
          v-if="loading || !visible"
          class-name="market-product__media-loading"
        />
        <div v-else class="market-product__media">
          <NftVideo v-if="nft.type === ETypeNft.video" :nft="nft" />
          <NftAudio v-else-if="nft.type === ETypeNft.audio" :nft="nft" />
          <NftImage v-else-if="nft.type === ETypeNft.image" :nft="nft" />
          <div v-else class="market-product__media-image">
            <div class="market-product__media-image-empty">No NFT Content</div>
          </div>
        </div>
        <NftFavorite :nft="nft" />
        <NftDropdown />
      </div>
      <NftText :nft="nft" />
      <NftComments :nft="nft" @select="selectReaction" />
    </div>

    <NftCommentsModal ref="modal" :nft="nft" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { ETypeNft, INft } from '~/types';
import NftDropdown from '~/components/own-nfts/nft/NftDropdown.vue';
import NftText from '~/components/own-nfts/nft/NftText.vue';
import NftComments from '~/components/own-nfts/nft/NftComments.vue';
import NftImage from '~/components/own-nfts/nft/NftImage.vue';
import NftVideo from '~/components/own-nfts/nft/NftVideo.vue';
import NftAudio from '~/components/own-nfts/nft/NftAudio.vue';
import NftFavorite from '~/components/own-nfts/nft/NftFavorite.vue';
import NftCommentsModal from '~/components/own-nfts/nft/NftCommentsModal.vue';
import Skeleton from '~/components/loaders/Skeleton.vue';
import { addressModule } from '~/store';
import { TCommentType } from '~/types/comment-form';

type TNft = INft;

@Component({
  components: {
    NftFavorite,
    NftDropdown,
    NftText,
    NftComments,
    NftImage,
    NftVideo,
    NftAudio,
    Skeleton,
    NftCommentsModal,
  },
})
export default class Nft extends Vue {
  loading = true;
  visible = false;
  ETypeNft = ETypeNft;

  scrollListener: null | (() => void) = null;

  @Prop({ required: true })
  readonly nft!: TNft;

  $refs!: {
    modal: NftCommentsModal;
    root: HTMLDivElement;
  };

  mounted() {
    if (this.nft.hasDetails) {
      this.loading = false;
      return;
    }

    this.$nextTick(() => {
      this.scrollListener = this.scrollHandler.bind(this);
      this.scrollListener();

      $(window).on('scroll', this.scrollListener);
    });
  }

  beforeDestroy() {
    if (!this.scrollListener) {
      return;
    }

    $(window).off('scroll', this.scrollListener);
    this.scrollListener = null;
  }

  scrollHandler() {
    /** если NFT была показана, то ничего не делаем */
    if (this.visible) {
      return;
    }

    /**
     * NFT имеет некорректное расположение относительно страницы
     * скорее всего скрыто. Например, активен другой таб
     * */
    if (!$(this.$refs.root).offset()?.top) {
      return;
    }

    const windowHeight = Number($(window).height());
    const windowScrollTop = Number($(window).scrollTop());
    const elemOffsetTop = Number($(this.$refs.root).offset()?.top);
    const nftHeight = 530;

    /** если до видимости NFT осталось проскроллить больше одной NFT, то ничего не делаем */
    if (windowScrollTop + windowHeight < elemOffsetTop - nftHeight) {
      return;
    }

    /** если NFT скоро покажется, то помечаем ее видимой и делаем запрос на детали */
    this.visible = true;
    this.fetchDetails();
  }

  selectReaction(type: TCommentType) {
    this.$refs.modal.show(type);
  }

  async fetchDetails() {
    this.loading = true;

    await addressModule.fetchOwnNftDetails(this.nft);

    this.loading = false;
  }
}
</script>
