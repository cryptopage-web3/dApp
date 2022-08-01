<template>
  <div class="market-filtr">
    <a href="#" class="market-filtr__link">
      <div class="thumb">
        <img src="@/assets/img/market-filtr_thumb1.svg" alt="" />
      </div>
      <span> Status </span>
    </a>
    <div class="market-filtr-body">
      <div class="market-filtr-wr">
        <div class="market-filtr-ch1">
          <input
            id="market-filtr-ch1"
            type="checkbox"
            checked
            class="market-filtr-ch1__input"
          />
          <label class="market-filtr-ch1__label" for="market-filtr-ch1">
            Buy now
          </label>
        </div>
        <div class="market-filtr-ch1">
          <input
            id="market-filtr-ch2"
            type="checkbox"
            class="market-filtr-ch1__input"
          />
          <label class="market-filtr-ch1__label" for="market-filtr-ch2">
            On auction
          </label>
        </div>
        <div class="market-filtr-ch1">
          <input
            id="market-filtr-ch3"
            type="checkbox"
            class="market-filtr-ch1__input"
          />
          <label class="market-filtr-ch1__label" for="market-filtr-ch3">
            New
          </label>
        </div>
        <div class="market-filtr-ch1">
          <input
            id="market-filtr-ch4"
            type="checkbox"
            class="market-filtr-ch1__input"
          />
          <label class="market-filtr-ch1__label" for="market-filtr-ch4">
            Has offers
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
export default class StatusFilter extends Vue {}
</script>
