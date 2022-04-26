<template>
  <div class="market-sidebar">
    <div class="market-sidebar-top">
      <h3 class="market-sidebar__title">Activity</h3>
      <a href="#" class="market-sidebar__more">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="29"
            height="29"
            rx="14.5"
            stroke="#1886FF"
          />
          <path
            d="M15.6079 15.0206L12.6579 17.9706C12.5027 18.1267 12.4156 18.3379 12.4156 18.5581C12.4156 18.7782 12.5027 18.9895 12.6579 19.1456C12.7354 19.2237 12.8276 19.2857 12.9291 19.328C13.0307 19.3703 13.1396 19.3921 13.2496 19.3921C13.3596 19.3921 13.4685 19.3703 13.5701 19.328C13.6716 19.2857 13.7638 19.2237 13.8413 19.1456L17.3746 15.6123C17.4527 15.5348 17.5147 15.4426 17.557 15.3411C17.5993 15.2395 17.6211 15.1306 17.6211 15.0206C17.6211 14.9106 17.5993 14.8017 17.557 14.7001C17.5147 14.5986 17.4527 14.5064 17.3746 14.4289L13.8413 10.8539C13.7634 10.7767 13.671 10.7156 13.5695 10.6741C13.468 10.6326 13.3593 10.6116 13.2496 10.6123C13.1399 10.6116 13.0312 10.6326 12.9297 10.6741C12.8281 10.7156 12.7358 10.7767 12.6579 10.8539C12.5027 11.0101 12.4156 11.2213 12.4156 11.4414C12.4156 11.6616 12.5027 11.8728 12.6579 12.0289L15.6079 15.0206Z"
            fill="#1886FF"
          />
        </svg>
      </a>
    </div>
    <ul class="market-sidebar__list">
      <li>
        <a href="#">
          <div class="market-sidebar__left">
            <img
              src="@/assets/img/market-sidebar-thumb6.png"
              alt=""
              class="thumb"
            />
            <div>
              <div class="name">
                The FABO’s
                <img src="@/assets/img/market-header-search-ident.svg" alt="" />
              </div>
              <div class="article">The FABO’S 1934</div>
            </div>
          </div>
          <div class="market-sidebar__right">
            <div class="offer-list">
              <div class="offer-list__thumb">
                <img src="@/assets/img/offer-list__thumb_img1.svg" alt="" />
              </div>
              <span> Offer </span>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a href="#">
          <div class="market-sidebar__left">
            <img
              src="@/assets/img/market-sidebar-thumb7.png"
              alt=""
              class="thumb"
            />
            <div>
              <div class="name">mfers</div>
              <div class="article">The FABO’S 1934</div>
            </div>
          </div>
          <div class="market-sidebar__right">
            <div class="offer-list">
              <div class="offer-list__thumb">
                <img src="@/assets/img/offer-list__thumb_img2.svg" alt="" />
              </div>
              <span> List </span>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a href="#">
          <div class="market-sidebar__left">
            <img
              src="@/assets/img/market-sidebar-thumb8.png"
              alt=""
              class="thumb"
            />
            <div>
              <div class="name">
                NFT World
                <img src="@/assets/img/market-header-search-ident.svg" alt="" />
              </div>
              <div class="article">The FABO’S 1934</div>
            </div>
          </div>
          <div class="market-sidebar__right">
            <div class="offer-list">
              <div class="offer-list__thumb">
                <img src="@/assets/img/offer-list__thumb_img1.svg" alt="" />
              </div>
              <span> Offer </span>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a href="#">
          <div class="market-sidebar__left">
            <img
              src="@/assets/img/market-sidebar-thumb9.png"
              alt=""
              class="thumb"
            />
            <div>
              <div class="name">
                CLONE-X
                <img src="@/assets/img/market-header-search-ident.svg" alt="" />
              </div>
              <div class="article">The FABO’S 1934</div>
            </div>
          </div>
          <div class="market-sidebar__right">
            <div class="offer-list">
              <div class="offer-list__thumb">
                <img src="@/assets/img/offer-list__thumb_img1.svg" alt="" />
              </div>
              <span> Sale </span>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a href="#">
          <div class="market-sidebar__left">
            <img
              src="@/assets/img/market-sidebar-thumb10.png"
              alt=""
              class="thumb"
            />
            <div>
              <div class="name">
                Mutant Ape ...
                <img src="@/assets/img/market-header-search-ident.svg" alt="" />
              </div>
              <div class="article">The FABO’S 1934</div>
            </div>
          </div>
          <div class="market-sidebar__right">
            <div class="offer-list">
              <div class="offer-list__thumb">
                <img src="@/assets/img/offer-list__thumb_img1.svg" alt="" />
              </div>
              <span> Offer </span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class StartSidebarActivity extends Vue {}
</script>
