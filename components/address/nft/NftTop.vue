<template>
  <div class="profile-content-top">
    <a href="#" class="profile-content__user">
      <img src="@/assets/img/profile-content__user_img.png" alt="" />
      <div>
        From:
        <span>
          {{ nft.from | shortAddress }}
        </span>
      </div>
    </a>
    <div class="right">
      <div class="profile-content__date">
        {{ nft.date | formatDate }}
      </div>

      <NftDropdown :nft="nft" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import NftDropdown from '~/components/address/nft/NftDropdown.vue';

type TNft = INft;

@Component({
  components: {
    NftDropdown,
  },
})
export default class NftTop extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;
}
</script>
