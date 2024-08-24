<template>
  <footer class="market-footer">
    <div class="container">
      <div class="market-footer-wrap">
        <div class="market-footer-left">
          <a href="#" class="market-footer-logo d-xl-inline-block d-none">
            <img src="@/assets/img/market-footer-logo_img.svg" alt="" />
          </a>
          <div class="market-footer-copyrite">
            Copyright © {{ new Date().getFullYear() }} The CryptoPage. All Rights Reserved
          </div>
        </div>
        <div class="market-footer-right">
          <a href="#" class="market-footer-logo d-xl-none">
            <img src="@/assets/img/market-footer-logo_img.svg" alt="" />
          </a>
          <div class="market-footer-search">
            <input
              type="text"
              placeholder="Search items, collections"
              class="global-input"
            />
          </div>
          <ul class="market-footer-list">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Terms of Exchange</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class LayoutFooter extends Vue {}
</script>
