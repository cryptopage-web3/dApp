<template>
  <div class="market-sidebar">
    <div class="market-sidebar-top">
      <h3 class="market-sidebar__title">My Token's (erc20)</h3>
      <nuxt-link to="/network/address/tokens" class="market-sidebar__more">
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
      </nuxt-link>
    </div>
    <ul class="market-sidebar__list3">
      <li>
        <a href="#" class="my-token">
          <div class="my-token__top">
            <div class="my-token__icon">
              <img src="@/assets/img/my-token_img1.svg" alt="" />
            </div>
            <div class="right">
              <div class="my-token__kurs">5.321</div>
              <div class="my-token__wallet">USDT</div>
            </div>
          </div>
          <div class="my-token__bottom">
            <div class="my-token__procent my-token__procent-green">
              1.44%
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89044 10L11.1099 10C11.2964 10 11.4006 9.80376 11.2851 9.66979L8.17535 6.07713C8.08633 5.97429 7.91494 5.97429 7.82498 6.07713L4.71526 9.66979C4.59973 9.80376 4.7039 10 4.89044 10Z"
                  fill="#27BC6A"
                />
              </svg>
            </div>
            <div class="my-token__count">$ 11,2</div>
            <div class="my-token__value">Value: $ 2 237.24</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="my-token">
          <div class="my-token__top">
            <div class="my-token__icon">
              <img src="@/assets/img/my-token_img2.svg" alt="" />
            </div>
            <div class="right">
              <div class="my-token__kurs">179.422</div>
              <div class="my-token__wallet">SUSHI</div>
            </div>
          </div>
          <div class="my-token__bottom">
            <div class="my-token__procent my-token__procent-red">
              14.78%
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1096 6H4.89012C4.70357 6 4.59941 6.19624 4.71493 6.33021L7.82465 9.92287C7.91367 10.0257 8.08506 10.0257 8.17502 9.92287L11.2847 6.33021C11.4003 6.19624 11.2961 6 11.1096 6Z"
                  fill="#FF1818"
                />
              </svg>
            </div>
            <div class="my-token__count">$ 22563,24</div>
            <div class="my-token__value">Value: $ 237.24</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="my-token">
          <div class="my-token__top">
            <div class="my-token__icon">
              <img src="@/assets/img/my-token_img3.svg" alt="" />
            </div>
            <div class="right">
              <div class="my-token__kurs">0.22321</div>
              <div class="my-token__wallet">PAGE</div>
            </div>
          </div>
          <div class="my-token__bottom">
            <div class="my-token__procent my-token__procent-red">
              44.78%
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1096 6H4.89012C4.70357 6 4.59941 6.19624 4.71493 6.33021L7.82465 9.92287C7.91367 10.0257 8.08506 10.0257 8.17502 9.92287L11.2847 6.33021C11.4003 6.19624 11.2961 6 11.1096 6Z"
                  fill="#FF1818"
                />
              </svg>
            </div>
            <div class="my-token__count">$ 344,2</div>
            <div class="my-token__value">Value: $ 3 134.04</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="my-token">
          <div class="my-token__top">
            <div class="my-token__icon">
              <img src="@/assets/img/my-token_img4.svg" alt="" />
            </div>
            <div class="right">
              <div class="my-token__kurs">15.333</div>
              <div class="my-token__wallet">TFUEL</div>
            </div>
          </div>
          <div class="my-token__bottom">
            <div class="my-token__procent my-token__procent-green">
              59.03 %
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89044 10L11.1099 10C11.2964 10 11.4006 9.80376 11.2851 9.66979L8.17535 6.07713C8.08633 5.97429 7.91494 5.97429 7.82498 6.07713L4.71526 9.66979C4.59973 9.80376 4.7039 10 4.89044 10Z"
                  fill="#27BC6A"
                />
              </svg>
            </div>
            <div class="my-token__count">$ 2563,24</div>
            <div class="my-token__value">Value: $ 113</div>
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
export default class AccountSidebarTokens extends Vue {}
</script>
