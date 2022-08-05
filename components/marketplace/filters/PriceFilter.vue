<template>
  <div class="market-filtr">
    <a href="#" class="market-filtr__link">
      <div class="thumb">
        <img src="@/assets/img/market-filtr_thumb2.svg" alt="" />
      </div>
      <span> Price </span>
    </a>
    <div class="market-filtr-body">
      <div class="market-filtr-wr">
        <div class="profile-content-drop market-filtr__drop mb_10">
          <a href="#" class="profile-content-drop__link">
            <span> USD </span>
          </a>
          <div class="drop-down__col">
            <ul class="drop-down__list">
              <li>
                <a href="#">
                  <span>ETH</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>BNB</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>BTC</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>ADA</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="market-filtr-min-max">
          <input type="text" class="global-input" placeholder="Min" />
          <span> to </span>
          <input type="text" class="global-input" placeholder="Max" />
        </div>
        <button class="btn_default mb_10 w-100">Apply</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class PriceFilter extends Vue {}
</script>
