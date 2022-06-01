<template>
  <div class="drop-down market-header__cabinet">
    <a
      data-toggle="collapse"
      href="#market-header__cabinet-col"
      role="button"
      aria-expanded="false"
      class="drop-down__link"
    >
      <div class="thumb">
        <jazzicon :seed="10211" :address="address" :diameter="24" />
      </div>
    </a>
    <div id="market-header__cabinet-col" class="collapse drop-down__col">
      <ul class="drop-down__list">
        <li>
          <nuxt-link :to="`/${chainSlug}/${address}`">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon2.svg" alt="" />
            </div>
            <span> Profile </span>
          </nuxt-link>
        </li>
        <li>
          <a href="#">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon3.svg" alt="" />
            </div>
            <span> Favorites </span>
          </a>
        </li>
        <li>
          <a href="#">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon4.svg" alt="" />
            </div>
            <span> My collections </span>
          </a>
        </li>
        <li>
          <a href="#">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon5.svg" alt="" />
            </div>
            <span> Messages </span>
          </a>
        </li>
        <li>
          <nuxt-link to="/profile/settings">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon6.svg" alt="" />
            </div>
            <span> Settings </span>
          </nuxt-link>
        </li>
        <li>
          <a href="#">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon7.svg" alt="" />
            </div>
            <span> Night Mode </span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="logout()">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon8.svg" alt="" />
            </div>
            <span> Log Out </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { authModule } from '~/store';

@Component({})
export default class HeaderAuthMenu extends Vue {
  get address(): string {
    return authModule.address;
  }

  get chainSlug(): string {
    return authModule.chainSlug;
  }

  async logout() {
    await authModule.logout();

    this.$router.push(`/`);
  }
}
</script>
