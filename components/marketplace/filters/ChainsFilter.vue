<template>
  <div class="market-filtr">
    <a href="#" class="market-filtr__link">
      <div class="thumb">
        <img src="@/assets/img/market-filtr_thumb4.svg" alt="" />
      </div>
      <span> Chains </span>
    </a>
    <div class="market-filtr-body">
      <div class="market-filtr-wr">
        <div class="market-filtr-ch2">
          <input
            id="market-filtr-ch9"
            type="checkbox"
            class="market-filtr-ch2__input"
          />
          <label class="market-filtr-ch2__label" for="market-filtr-ch9">
            <div class="thumb">
              <img src="@/assets/img/market-filtr-ch2_img5.svg" alt="" />
            </div>
            <span> Ethereum </span>
          </label>
        </div>
        <div class="market-filtr-ch2">
          <input
            id="market-filtr-ch10"
            type="checkbox"
            class="market-filtr-ch2__input"
          />
          <label class="market-filtr-ch2__label" for="market-filtr-ch10">
            <div class="thumb">
              <img src="@/assets/img/market-filtr-ch2_img6.svg" alt="" />
            </div>
            <span> Polygon </span>
          </label>
        </div>
        <div class="market-filtr-ch2">
          <input
            id="market-filtr-ch11"
            type="checkbox"
            class="market-filtr-ch2__input"
          />
          <label class="market-filtr-ch2__label" for="market-filtr-ch11">
            <div class="thumb">
              <img src="@/assets/img/market-filtr-ch2_img7.svg" alt="" />
            </div>
            <span> Klaytn </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ChainsFilter extends Vue {}
</script>
