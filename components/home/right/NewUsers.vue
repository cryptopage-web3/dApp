<template>
  <div class="market-sidebar">
    <div class="market-sidebar-top">
      <h3 class="market-sidebar__title">New users</h3>
    </div>
    <ul v-if="loading" class="spaces-sidebar-users">
      <li v-for="index in [1, 2, 3, 4, 5]" :key="index">
        <div class="spaces-sidebar-users__loading-item">
          <Skeleton class-name="spaces-sidebar-users__loading-photo" />
          <Skeleton class-name="spaces-sidebar-users__loading-text" />
        </div>
      </li>
    </ul>
    <ul v-else class="spaces-sidebar-users">
      <li v-for="user in users" :key="user.address">
        <nuxt-link
          :to="`/${chainSlug}/${user.address}`"
          class="spaces-sidebar-user-thumb"
        >
          <client-only>
            <jazzicon :seed="10211" :address="user.address" :diameter="40" />
          </client-only>
        </nuxt-link>
        <div class="right">
          <div
            class="d-flex align-items-start justify-content-between flex-wrap"
          >
            <nuxt-link :to="`/${chainSlug}/${user.address}`" class="id-user">
              <span> {{ user.address | shortAddress }} </span>
            </nuxt-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import Skeleton from '~/components/loaders/Skeleton.vue';
import { authModule, homeModule } from '~/store';
import { INewUser } from '~/types';

@Component({
  components: {
    Skeleton,
  },
})
export default class NewUsers extends Vue {
  loading = true;

  get users(): INewUser[] {
    return homeModule.newUsers.slice(0, 5);
  }

  get chainSlug(): string {
    return authModule.chainSlug;
  }

  mounted() {
    this.fetchNewUsers();
  }

  async fetchNewUsers() {
    this.loading = true;

    await homeModule.fetchNewUsers();

    this.loading = false;
  }
}
</script>
