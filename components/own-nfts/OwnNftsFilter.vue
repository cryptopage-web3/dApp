<template>
  <div class="result-filtrs-nav">
    <div class="count">{{ ownNftsCount }} items</div>
    <div class="result-filtrs-nav__right">
      <div class="drop-down result-filtrs-sort">
        <a
          data-toggle="collapse"
          href="#result-filtrs-sort"
          role="button"
          aria-expanded="false"
          class="drop-down__link"
          ><span>Sort by</span></a
        >
        <div id="result-filtrs-sort" class="collapse drop-down__col">
          <ul class="drop-down__list">
            <li>
              <a href="#"><span>Date</span></a>
            </li>
            <li>
              <a href="#"><span>ABC</span></a>
            </li>
            <li>
              <a href="#"><span>Price</span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { addressModule } from '~/store';

@Component({})
export default class OwnNftsFilter extends Vue {
  get ownNftsCount(): number {
    return addressModule.ownNfts.count || 0;
  }
}
</script>
