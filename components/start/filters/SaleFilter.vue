<template>
  <div class="market-filtr">
    <a href="#" class="market-filtr__link">
      <div class="thumb">
        <img src="@/assets/img/market-filtr_thumb6.svg" alt="" />
      </div>
      <span> On sale in </span>
    </a>
    <div class="market-filtr-body">
      <div class="market-filtr-wr">
        <input
          type="text"
          placeholder="Filter"
          class="global-input market-filtr-input_search w-100 mb_10"
        />
        <div class="market-filtr-ch3">
          <input
            id="market-filtr-ch17"
            type="checkbox"
            class="market-filtr-ch3__input"
          />
          <label class="market-filtr-ch3__label" for="market-filtr-ch17">
            ETH
          </label>
        </div>
        <div class="market-filtr-ch3">
          <input
            id="market-filtr-ch18"
            type="checkbox"
            class="market-filtr-ch3__input"
          />
          <label class="market-filtr-ch3__label" for="market-filtr-ch18">
            WETH
          </label>
        </div>
        <div class="market-filtr-ch3">
          <input
            id="market-filtr-ch19"
            type="checkbox"
            class="market-filtr-ch3__input"
          />
          <label class="market-filtr-ch3__label" for="market-filtr-ch19">
            $BASED
          </label>
        </div>
        <div class="market-filtr-ch3">
          <input
            id="market-filtr-ch20"
            type="checkbox"
            class="market-filtr-ch3__input"
          />
          <label class="market-filtr-ch3__label" for="market-filtr-ch20">
            $DG
          </label>
        </div>
        <div class="market-filtr-ch3">
          <input
            id="market-filtr-ch21"
            type="checkbox"
            class="market-filtr-ch3__input"
          />
          <label class="market-filtr-ch3__label" for="market-filtr-ch21">
            0xBTC
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
export default class SaleFilter extends Vue {}
</script>
