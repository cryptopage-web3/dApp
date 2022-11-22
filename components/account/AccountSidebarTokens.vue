<template>
  <div v-if="show" class="market-sidebar">
    <div class="market-sidebar-top">
      <h3 class="market-sidebar__title">
        {{ isOwner ? 'My' : 'Account' }} Token's (erc20)
      </h3>
      <nuxt-link
        :to="`/${chainSlug}/${address}/tokens`"
        class="market-sidebar__more"
      >
        <SidebarArrowIcon />
      </nuxt-link>
    </div>
    <ul class="market-sidebar__list3">
      <template v-if="loading">
        <li>
          <Skeleton class-name="market-sidebar__list3-loading-item" />
        </li>
        <li>
          <Skeleton class-name="market-sidebar__list3-loading-item" />
        </li>
        <li>
          <Skeleton class-name="market-sidebar__list3-loading-item" />
        </li>
        <li>
          <Skeleton class-name="market-sidebar__list3-loading-item" />
        </li>
      </template>
      <template v-else-if="!visibleTokens.length">
        <li class="market-sidebar__list3-empty">You don't have token’s</li>
      </template>
      <template v-else>
        <li v-for="(token, index) in visibleTokens" :key="index">
          <Token :token="token" />
        </li>
      </template>
    </ul>
    <a
      v-if="!isFullList && tokens.length > 6"
      href="#"
      class="market-sidebar__show-more"
      @click.prevent="showMore"
    >
      Show more
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import Token from './token/Token.vue';
import Skeleton from '~/components/loaders/Skeleton.vue';
import { addressModule, authModule, stickyModule } from '~/store';
import { IAddressInfo, IToken } from '~/types';
import SidebarArrowIcon from '~/components/icon/account/SidebarArrowIcon.vue';

type TAddressInfo = IAddressInfo;

@Component({
  components: {
    Skeleton,
    Token,
    SidebarArrowIcon,
  },
})
export default class AccountSidebarTokens extends Vue {
  loading = false;
  isFullList = false;

  get show() {
    return this.$route.name !== 'network-address-tokens';
  }

  get isOwner(): boolean {
    return (
      authModule.address.toLowerCase() ===
        addressModule.address.toLowerCase() &&
      authModule.chainSlug === addressModule.chainSlug
    );
  }

  get chainSlug(): string {
    return addressModule.chainSlug;
  }

  get address(): string {
    return addressModule.address;
  }

  get info(): TAddressInfo {
    return addressModule.info;
  }

  get tokens(): IToken[] {
    return addressModule.tokens;
  }

  get visibleTokens(): IToken[] {
    return this.isFullList ? this.tokens : this.tokens.slice(0, 6);
  }

  @Watch('tokens')
  onTokensChanged() {
    stickyModule.update();
  }

  @Watch('info', { immediate: true })
  async onInfoChanged(info: TAddressInfo) {
    if (!info.address || !info.chainId) {
      return;
    }

    this.loading = true;

    await addressModule.fetchTokens();

    this.loading = false;
  }

  showMore() {
    this.isFullList = true;

    this.$nextTick(() => {
      $('.market-sidebar__list3').animate(
        {
          scrollTop: 120,
        },
        500,
      );
    });
  }
}
</script>
