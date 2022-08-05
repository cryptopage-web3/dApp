<template>
  <div class="market-filtr">
    <a href="#" class="market-filtr__link">
      <div class="thumb">
        <img src="@/assets/img/market-filtr_thumb5.svg" alt="" />
      </div>
      <span> Categories </span>
    </a>
    <div class="market-filtr-body">
      <div class="market-filtr-wr">
        <div class="market-filtr-ch2">
          <input
            id="market-filtr-ch12"
            type="checkbox"
            class="market-filtr-ch2__input"
          />
          <label class="market-filtr-ch2__label" for="market-filtr-ch12">
            <div class="thumb">
              <img src="@/assets/img/market-filtr-ch2_img8.svg" alt="" />
            </div>
            <span> Art </span>
          </label>
        </div>
        <div class="market-filtr-ch2">
          <input
            id="market-filtr-ch13"
            type="checkbox"
            class="market-filtr-ch2__input"
          />
          <label class="market-filtr-ch2__label" for="market-filtr-ch13">
            <div class="thumb">
              <img src="@/assets/img/market-filtr-ch2_img8.svg" alt="" />
            </div>
            <span> Collectibles </span>
          </label>
        </div>
        <div class="market-filtr-ch2">
          <input
            id="market-filtr-ch14"
            type="checkbox"
            class="market-filtr-ch2__input"
          />
          <label class="market-filtr-ch2__label" for="market-filtr-ch14">
            <div class="thumb">
              <img src="@/assets/img/market-filtr-ch2_img8.svg" alt="" />
            </div>
            <span> Domain Names </span>
          </label>
        </div>
        <div class="market-filtr-ch2">
          <input
            id="market-filtr-ch15"
            type="checkbox"
            class="market-filtr-ch2__input"
          />
          <label class="market-filtr-ch2__label" for="market-filtr-ch15">
            <div class="thumb">
              <img src="@/assets/img/market-filtr-ch2_img8.svg" alt="" />
            </div>
            <span> Music </span>
          </label>
        </div>
        <div class="market-filtr-ch2">
          <input
            id="market-filtr-ch16"
            type="checkbox"
            class="market-filtr-ch2__input"
          />
          <label class="market-filtr-ch2__label" for="market-filtr-ch16">
            <div class="thumb">
              <img src="@/assets/img/market-filtr-ch2_img8.svg" alt="" />
            </div>
            <span> Photography </span>
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
export default class CategoriesFilter extends Vue {}
</script>
