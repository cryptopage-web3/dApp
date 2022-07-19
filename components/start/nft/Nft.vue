<template>
  <div class="col-xl-3 col-md-4 col-12">
    <div class="market-product">
      <div class="thumb">
        <NftImage :nft="nft" />
        <a href="#" class="market-product__fav">
          <StartFavoriteIcon />
          <StartFavoriteFillIcon />
        </a>
        <div class="market-product__nav">
          <a href="#">Creator</a>
          <a href="#">Owner</a>
          <a href="#">Collection</a>
        </div>
      </div>
      <div class="market-product-middle">
        <table class="market-product__table">
          <tbody>
            <tr>
              <td>
                <a href="#" class="market-product__title">
                  {{ nft.metaName }}
                </a>
              </td>
              <td class="market-product__price">Price</td>
            </tr>
            <tr>
              <td>
                <a href="#" class="market-product__name">
                  {{ nft.metaName }}
                </a>
              </td>
              <td>
                <div class="market-product__count">
                  <img
                    src="@/assets/img/market-header__wallet_icon1.svg"
                    alt=""
                  />
                  <span> 0 </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="market-product-bottom">
        <ul class="market-product-ld">
          <li>
            <a href="#">
              <CommentLikeIcon />
              <span> 0 </span>
            </a>
          </li>
          <li>
            <a href="#" class="market-product-dislike">
              <CommentDislikeIcon />
              <span> 0 </span>
            </a>
          </li>
        </ul>
        <a href="#" class="market-product__buy">Buy Now</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import NftImage from './NftImage.vue';
import { ICollectionNft } from '~/types';
import StartFavoriteIcon from '~/components/icon/start/StartFavoriteIcon.vue';
import StartFavoriteFillIcon from '~/components/icon/start/StartFavoriteFillIcon.vue';
import CommentLikeIcon from '~/components/icon/nft/CommentLikeIcon.vue';
import CommentDislikeIcon from '~/components/icon/nft/CommentDislikeIcon.vue';

@Component({
  components: {
    StartFavoriteIcon,
    StartFavoriteFillIcon,
    CommentLikeIcon,
    CommentDislikeIcon,
    NftImage,
  },
})
export default class Nft extends Vue {
  @Prop({ required: true })
  readonly nft!: ICollectionNft;
}
</script>
