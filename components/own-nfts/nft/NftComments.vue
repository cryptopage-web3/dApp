<template>
  <div v-if="cryptoPageNft" class="market-product-bottom">
    <ul class="market-product-ld">
      <li>
        <a href="#" @click.prevent="$emit('select', 'like')">
          <CommentLikeIcon />
          <span> {{ likes }} </span>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="market-product-dislike"
          @click.prevent="$emit('select', 'dislike')"
        >
          <CommentDislikeIcon />
          <span> {{ dislikes }} </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import CommentLikeIcon from '~/components/icon/nft/CommentLikeIcon.vue';
import CommentDislikeIcon from '~/components/icon/nft/CommentDislikeIcon.vue';
import { nftContractAddress } from '~/contracts';
import { addressModule } from '~/store';

type TNft = INft;

@Component({
  components: {
    CommentLikeIcon,
    CommentDislikeIcon,
  },
})
export default class NftComments extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;

  get cryptoPageNft(): boolean {
    const address = nftContractAddress[addressModule.chainId] || '';

    return address.toLowerCase() === this.nft.contract_address?.toLowerCase();
  }

  get likes(): number {
    return (this.nft.comments || []).filter((item) => item.isUp).length;
  }

  get dislikes(): number {
    return (this.nft.comments || []).filter((item) => item.isDown).length;
  }
}
</script>
