<template>
  <div>
    <div class="profile-iu mb_20">
      <div class="profile-iu__avatar">
        <jazzicon :seed="10211" :address="address" :diameter="diameter" />
      </div>
      <div class="profile-iu__right">
        <div class="profile-iu__top">
          <div class="profile-iu__nik">
            <a ref="address" href="#" @click.prevent="copyAddress">
              {{ address | shortAddress }}
            </a>
          </div>
          <div class="d-flex align-items-center">
            <a
              v-if="!isOwner"
              href="#"
              class="other-profile-share"
              @click.prevent=""
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6C20 7.10457 19.1046 8 18 8V10C20.2091 10 22 8.20914 22 6L20 6ZM16 6C16 4.89543 16.8954 4 18 4V2C15.7909 2 14 3.79086 14 6H16ZM18 4C19.1046 4 20 4.89543 20 6L22 6C22 3.79086 20.2091 2 18 2V4ZM20 18C20 19.1046 19.1046 20 18 20V22C20.2091 22 22 20.2091 22 18H20ZM18 20C16.8954 20 16 19.1046 16 18H14C14 20.2091 15.7909 22 18 22V20ZM18 16C19.1046 16 20 16.8954 20 18H22C22 15.7909 20.2091 14 18 14V16ZM6 14C4.89543 14 4 13.1046 4 12H2C2 14.2091 3.79086 16 6 16V14ZM4 12C4 10.8954 4.89543 10 6 10L6 8C3.79086 8 2 9.79086 2 12H4ZM8 12C8 12.3234 7.924 12.6261 7.78979 12.894L9.57795 13.7898C9.84831 13.2502 10 12.6414 10 12L8 12ZM7.78979 12.894C7.46021 13.5519 6.78153 14 6 14V16C7.56744 16 8.92246 15.0983 9.57795 13.7898L7.78979 12.894ZM6 10C6.78153 10 7.46021 10.4481 7.78979 11.106L9.57795 10.2102C8.92246 8.90173 7.56744 8 6 8L6 10ZM7.78979 11.106C7.924 11.3739 8 11.6766 8 12L10 12C10 11.3586 9.84831 10.7498 9.57795 10.2102L7.78979 11.106ZM9.13108 11.5525L15.7633 8.23636L14.8689 6.44751L8.23665 9.76364L9.13108 11.5525ZM18 8C17.2185 8 16.5398 7.5519 16.2102 6.89402L14.4221 7.78984C15.0775 9.09827 16.4326 10 18 10V8ZM16.2102 6.89402C16.076 6.62613 16 6.32338 16 6H14C14 6.64136 14.1517 7.25017 14.4221 7.78984L16.2102 6.89402ZM8.23665 14.2364L14.8689 17.5525L15.7633 15.7636L9.13108 12.4475L8.23665 14.2364ZM16 18C16 17.6766 16.076 17.3739 16.2102 17.106L14.4221 16.2102C14.1517 16.7498 14 17.3586 14 18H16ZM16.2102 17.106C16.5398 16.4481 17.2185 16 18 16V14C16.4326 14 15.0775 14.9017 14.4221 16.2102L16.2102 17.106Z"
                  fill="#687684"
                />
              </svg>
            </a>
            <nuxt-link
              v-if="isOwner"
              to="/profile/settings"
              class="btn_transparent btn_transparent-img profile-iu__status"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6668 14.1667V15.1667C17.0713 15.1667 17.4359 14.923 17.5907 14.5494C17.7455 14.1757 17.6599 13.7456 17.3739 13.4596L16.6668 14.1667ZM3.3335 14.1667L2.62639 13.4596C2.34039 13.7456 2.25484 14.1757 2.40962 14.5494C2.5644 14.923 2.92903 15.1667 3.3335 15.1667L3.3335 14.1667ZM4.50427 12.9959L5.21138 13.703L5.21138 13.703L4.50427 12.9959ZM8.3335 4.45118L8.66674 5.39402C9.06633 5.25278 9.3335 4.875 9.3335 4.45118H8.3335ZM11.6668 4.45118L10.6668 4.45118C10.6668 4.875 10.934 5.25278 11.3336 5.39402L11.6668 4.45118ZM4.0406 14.8738L5.21138 13.703L3.79717 12.2888L2.62639 13.4596L4.0406 14.8738ZM6.00016 11.7987L6.00016 9.16667H4.00016L4.00016 11.7987H6.00016ZM14.0002 9.16667V11.7987H16.0002V9.16667H14.0002ZM14.7889 13.703L15.9597 14.8738L17.3739 13.4596L16.2032 12.2888L14.7889 13.703ZM5.21138 13.703C5.71643 13.1979 6.00016 12.513 6.00016 11.7987H4.00016C4.00016 11.9825 3.92714 12.1588 3.79717 12.2888L5.21138 13.703ZM14.0002 11.7987C14.0002 12.513 14.2839 13.1979 14.7889 13.703L16.2032 12.2888C16.0732 12.1588 16.0002 11.9825 16.0002 11.7987H14.0002ZM8.00025 3.50834C5.67121 4.33154 4.00016 6.55267 4.00016 9.16667H6.00016C6.00016 7.42661 7.1118 5.94361 8.66674 5.39402L8.00025 3.50834ZM11.3336 5.39402C12.8885 5.94361 14.0002 7.42661 14.0002 9.16667H16.0002C16.0002 6.55267 14.3291 4.33154 12.0001 3.50834L11.3336 5.39402ZM12.6668 4.45118V4.16667L10.6668 4.16667V4.45118L12.6668 4.45118ZM7.3335 4.16667V4.45118H9.3335V4.16667H7.3335ZM10.0002 1.5C8.5274 1.5 7.3335 2.69391 7.3335 4.16667H9.3335C9.3335 3.79848 9.63197 3.5 10.0002 3.5V1.5ZM12.6668 4.16667C12.6668 2.69391 11.4729 1.5 10.0002 1.5V3.5C10.3684 3.5 10.6668 3.79848 10.6668 4.16667L12.6668 4.16667ZM11.5002 15C11.5002 15.8284 10.8286 16.5 10.0002 16.5V18.5C11.9332 18.5 13.5002 16.933 13.5002 15H11.5002ZM10.0002 16.5C9.17174 16.5 8.50016 15.8284 8.50016 15H6.50016C6.50016 16.933 8.06717 18.5 10.0002 18.5V16.5ZM16.6668 13.1667H12.5002V15.1667H16.6668V13.1667ZM13.5002 15V14.1667H11.5002V15H13.5002ZM12.5002 13.1667L7.50016 13.1667V15.1667L12.5002 15.1667V13.1667ZM7.50016 13.1667H3.3335L3.3335 15.1667H7.50016V13.1667ZM8.50016 15V14.1667H6.50016V15H8.50016Z"
                  fill="#687684"
                />
              </svg>
              Assign status
            </nuxt-link>
            <a
              v-else
              href="#"
              class="btn_transparent btn_transparent-img profile-iu__status"
              @click.prevent=""
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6668 14.1667V15.1667C17.0713 15.1667 17.4359 14.923 17.5907 14.5494C17.7455 14.1757 17.6599 13.7456 17.3739 13.4596L16.6668 14.1667ZM3.3335 14.1667L2.62639 13.4596C2.34039 13.7456 2.25484 14.1757 2.40962 14.5494C2.5644 14.923 2.92903 15.1667 3.3335 15.1667L3.3335 14.1667ZM4.50427 12.9959L5.21138 13.703L5.21138 13.703L4.50427 12.9959ZM8.3335 4.45118L8.66674 5.39402C9.06633 5.25278 9.3335 4.875 9.3335 4.45118H8.3335ZM11.6668 4.45118L10.6668 4.45118C10.6668 4.875 10.934 5.25278 11.3336 5.39402L11.6668 4.45118ZM4.0406 14.8738L5.21138 13.703L3.79717 12.2888L2.62639 13.4596L4.0406 14.8738ZM6.00016 11.7987L6.00016 9.16667H4.00016L4.00016 11.7987H6.00016ZM14.0002 9.16667V11.7987H16.0002V9.16667H14.0002ZM14.7889 13.703L15.9597 14.8738L17.3739 13.4596L16.2032 12.2888L14.7889 13.703ZM5.21138 13.703C5.71643 13.1979 6.00016 12.513 6.00016 11.7987H4.00016C4.00016 11.9825 3.92714 12.1588 3.79717 12.2888L5.21138 13.703ZM14.0002 11.7987C14.0002 12.513 14.2839 13.1979 14.7889 13.703L16.2032 12.2888C16.0732 12.1588 16.0002 11.9825 16.0002 11.7987H14.0002ZM8.00025 3.50834C5.67121 4.33154 4.00016 6.55267 4.00016 9.16667H6.00016C6.00016 7.42661 7.1118 5.94361 8.66674 5.39402L8.00025 3.50834ZM11.3336 5.39402C12.8885 5.94361 14.0002 7.42661 14.0002 9.16667H16.0002C16.0002 6.55267 14.3291 4.33154 12.0001 3.50834L11.3336 5.39402ZM12.6668 4.45118V4.16667L10.6668 4.16667V4.45118L12.6668 4.45118ZM7.3335 4.16667V4.45118H9.3335V4.16667H7.3335ZM10.0002 1.5C8.5274 1.5 7.3335 2.69391 7.3335 4.16667H9.3335C9.3335 3.79848 9.63197 3.5 10.0002 3.5V1.5ZM12.6668 4.16667C12.6668 2.69391 11.4729 1.5 10.0002 1.5V3.5C10.3684 3.5 10.6668 3.79848 10.6668 4.16667L12.6668 4.16667ZM11.5002 15C11.5002 15.8284 10.8286 16.5 10.0002 16.5V18.5C11.9332 18.5 13.5002 16.933 13.5002 15H11.5002ZM10.0002 16.5C9.17174 16.5 8.50016 15.8284 8.50016 15H6.50016C6.50016 16.933 8.06717 18.5 10.0002 18.5V16.5ZM16.6668 13.1667H12.5002V15.1667H16.6668V13.1667ZM13.5002 15V14.1667H11.5002V15H13.5002ZM12.5002 13.1667L7.50016 13.1667V15.1667L12.5002 15.1667V13.1667ZM7.50016 13.1667H3.3335L3.3335 15.1667H7.50016V13.1667ZM8.50016 15V14.1667H6.50016V15H8.50016Z"
                  fill="#687684"
                />
              </svg>
              Status not set
            </a>
          </div>
        </div>
        <div class="profile-iu__middle" :class="{ 'mb-0': isOwner }">
          <strong>286</strong> transactions<br />
          <strong>106</strong> inputs / <strong>58,4K</strong> outputs from
        </div>
        <div v-if="!isOwner" class="d-flex align-items-center flex-wrap">
          <a
            href="#"
            class="profile-iu__creat btn-blue-transparent_button btn_large"
            @click.prevent="sendMessage"
          >
            Send Message
          </a>
        </div>
      </div>
    </div>
    <nft-form />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { addressModule, authModule } from '~/store';
import { copyToClipboard } from '~/utils/copyToClipboard';

@Component({})
export default class AddressProfile extends Vue {
  diameter = process.browser
    ? Number($(window).width()) > 767
      ? 100
      : 50
    : 100;

  $refs!: {
    address: HTMLSpanElement;
  };

  get address(): string {
    return addressModule.address;
  }

  get isOwner(): boolean {
    return (
      authModule.address.toLowerCase() ===
        addressModule.address.toLowerCase() &&
      authModule.chainSlug === addressModule.chainSlug
    );
  }

  get isAuth(): boolean {
    return authModule.isAuth;
  }

  mounted() {
    this.$nextTick(() => {
      /** tooltip копирование адреса */
      ($(this.$refs.address) as any).tooltip({
        trigger: 'hover',
        title: 'Click to copy',
      });
    });
  }

  // methods

  copyAddress() {
    copyToClipboard(this.address);
    ($(this.$refs.address) as any).tooltip('hide');

    this.$notify({
      type: 'success',
      title: 'Address copied to clipboard',
    });
  }

  sendMessage() {
    if (!this.isAuth) {
      this.$notify({
        type: 'error',
        title: 'Need to connect a wallet to send a message',
      });

      return;
    }

    this.$notify({
      type: 'error',
      title: 'Sending a message is temporarily unavailable',
    });
  }
}
</script>