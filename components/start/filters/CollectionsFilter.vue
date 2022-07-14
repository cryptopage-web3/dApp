<template>
  <div class="market-filtr">
    <a href="#" class="market-filtr__link">
      <div class="thumb">
        <img src="@/assets/img/market-filtr_thumb3.svg" alt="" />
      </div>
      <span> Collections </span>
    </a>
    <div class="market-filtr-body">
      <div class="market-filtr-wr">
        <input
          v-model="search"
          type="text"
          placeholder="Filter"
          class="global-input market-filtr-input_search w-100 mb_10"
        />

        <Loader v-if="loading" />
        <div v-else-if="!collections.length" class="market-filtr__empty">
          No Collections
        </div>
        <template v-else>
          <div
            v-for="collection in collections"
            :key="collection.id"
            class="market-filtr-ch2"
          >
            <input
              :id="`market-filtr-ch${collection.id}`"
              type="checkbox"
              :value="collection.id"
              class="market-filtr-ch2__input"
            />
            <label
              class="market-filtr-ch2__label"
              :for="`market-filtr-ch${collection.id}`"
            >
              <div class="thumb">
                <img :src="collection.imageUrl" alt="" />
              </div>
              <span> {{ collection.name }} </span>
            </label>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import { marketModule } from '~/store';
import { ICollection } from '~/types';
import Loader from '~/components/loaders/GrowLoader.vue';

@Component({
  components: {
    Loader,
  },
})
export default class CollectionsFilter extends Vue {
  loading = true;
  search = '';
  timeout: any = null;

  get collections(): ICollection[] {
    return marketModule.collections;
  }

  @Watch('search')
  onSearchChange() {
    this.timeout && clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.fetchCollections();
    }, 500);
  }

  mounted() {
    this.fetchCollections();
  }

  async fetchCollections() {
    this.loading = true;

    await marketModule.fetchCollections(this.search);

    this.loading = false;
  }
}
</script>
