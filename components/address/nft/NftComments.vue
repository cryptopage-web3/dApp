<template>
  <div>
    <ul class="market-product-ld">
      <li>
        <a href="#">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
              stroke="#687684"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <span> 8 607 </span>
        </a>
      </li>
      <li>
        <a href="#" class="market-product-dislike">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
              stroke="#687684"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <span> 2 342 </span>
        </a>
      </li>
    </ul>
    <div class="profile-content__comment">
      <input type="text" placeholder="Your comment text" class="global-input" />
      <a href="#" class="profile-content__comment-close">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM7.70711 17.7071L17.7071 7.70711L16.2929 6.29289L6.29289 16.2929L7.70711 17.7071ZM6.29289 7.70711L16.2929 17.7071L17.7071 16.2929L7.70711 6.29289L6.29289 7.70711Z"
            fill="#687684"
          ></path>
        </svg>
      </a>
      <button class="profile-content__comment-send">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" fill="white" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.68682 8.38219C2.75615 8.69274 2.77625 10.0163 3.71697 10.2977L11.2477 12.551L13.7071 20.2996C14.0015 21.2262 15.3111 21.2363 15.6187 20.3127L20.9484 4.32296C21.0074 4.14588 21.016 3.95585 20.9731 3.77418C20.9303 3.5925 20.8376 3.42635 20.7056 3.29436C20.5736 3.16237 20.4075 3.06974 20.2258 3.02687C20.0441 2.98399 19.8541 2.99256 19.677 3.05162L3.68682 8.3832V8.38219ZM7.33813 9.28369L18.4056 5.5953L14.689 16.7469L13.0035 11.4364C12.9539 11.2804 12.8669 11.1389 12.75 11.0241C12.6332 10.9094 12.4901 10.825 12.3332 10.7781L7.33813 9.28369V9.28369Z"
            fill="#1886FF"
          />
          <path
            d="M19.85 3.13672L20.8993 4.21911L12.0268 12.8049L10.9775 11.7225L19.85 3.13672V3.13672Z"
            fill="#1886FF"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';

type TNft = INft;

@Component({})
export default class NftComments extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;
}
</script>
