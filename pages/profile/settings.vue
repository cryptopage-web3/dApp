<template>
  <div class="profil-settings">
    <h2 class="global-zag">Profile Settings</h2>
    <div class="profil-settings__info"><span>*</span> Required fields</div>
    <div class="profil-settings-form">
      <!--<div class="profil-settings-item">
            <div class="profil-settings-item__title">
              Image Profile
            </div>
            <div class="profil-settings-edit-avatar">
              <input type="file" id="profil-settings_input1">
              <div class="profil-settings-edit-avatar__default">
                NN
              </div>
              <label for="profil-settings_input1" class="profil-settings-edit-avatar__label">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.2677 3.73223L20.9748 3.02513V3.02513L20.2677 3.73223ZM6.5 21.0355V22.0355C6.76522 22.0355 7.01957 21.9301 7.20711 21.7426L6.5 21.0355ZM3 21.0355H2C2 21.5878 2.44772 22.0355 3 22.0355V21.0355ZM3 17.4644L2.29289 16.7573C2.10536 16.9448 2 17.1992 2 17.4644H3ZM15.9393 4.52513C15.5488 4.1346 14.9156 4.1346 14.5251 4.52513C14.1345 4.91565 14.1345 5.54882 14.5251 5.93934L15.9393 4.52513ZM18.0606 9.47487C18.4511 9.8654 19.0843 9.8654 19.4748 9.47487C19.8653 9.08435 19.8653 8.45118 19.4748 8.06066L18.0606 9.47487ZM17.4393 4.43934C18.0251 3.85355 18.9748 3.85355 19.5606 4.43934L20.9748 3.02513C19.608 1.65829 17.3919 1.65829 16.0251 3.02513L17.4393 4.43934ZM19.5606 4.43934C20.1464 5.02513 20.1464 5.97487 19.5606 6.56066L20.9748 7.97487C22.3417 6.60804 22.3417 4.39196 20.9748 3.02513L19.5606 4.43934ZM19.5606 6.56066L5.79289 20.3284L7.20711 21.7426L20.9748 7.97487L19.5606 6.56066ZM6.5 20.0355H3V22.0355H6.5V20.0355ZM16.0251 3.02513L2.29289 16.7573L3.70711 18.1715L17.4393 4.43934L16.0251 3.02513ZM2 17.4644V21.0355H4V17.4644H2ZM14.5251 5.93934L18.0606 9.47487L19.4748 8.06066L15.9393 4.52513L14.5251 5.93934Z" fill="white"/>
                </svg>
              </label>
            </div>
          </div>-->
      <div class="profil-settings-item">
        <div class="profil-settings-item__title">Image Profile</div>
        <div class="profil-settings-edit-avatar">
          <input id="profil-settings_input1" type="file" />
          <img src="@/assets/img/profil-settings-edit-avatar_img.png" alt="" />
          <label
            for="profil-settings_input1"
            class="profil-settings-edit-avatar__label"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.2677 3.73223L20.9748 3.02513V3.02513L20.2677 3.73223ZM6.5 21.0355V22.0355C6.76522 22.0355 7.01957 21.9301 7.20711 21.7426L6.5 21.0355ZM3 21.0355H2C2 21.5878 2.44772 22.0355 3 22.0355V21.0355ZM3 17.4644L2.29289 16.7573C2.10536 16.9448 2 17.1992 2 17.4644H3ZM15.9393 4.52513C15.5488 4.1346 14.9156 4.1346 14.5251 4.52513C14.1345 4.91565 14.1345 5.54882 14.5251 5.93934L15.9393 4.52513ZM18.0606 9.47487C18.4511 9.8654 19.0843 9.8654 19.4748 9.47487C19.8653 9.08435 19.8653 8.45118 19.4748 8.06066L18.0606 9.47487ZM17.4393 4.43934C18.0251 3.85355 18.9748 3.85355 19.5606 4.43934L20.9748 3.02513C19.608 1.65829 17.3919 1.65829 16.0251 3.02513L17.4393 4.43934ZM19.5606 4.43934C20.1464 5.02513 20.1464 5.97487 19.5606 6.56066L20.9748 7.97487C22.3417 6.60804 22.3417 4.39196 20.9748 3.02513L19.5606 4.43934ZM19.5606 6.56066L5.79289 20.3284L7.20711 21.7426L20.9748 7.97487L19.5606 6.56066ZM6.5 20.0355H3V22.0355H6.5V20.0355ZM16.0251 3.02513L2.29289 16.7573L3.70711 18.1715L17.4393 4.43934L16.0251 3.02513ZM2 17.4644V21.0355H4V17.4644H2ZM14.5251 5.93934L18.0606 9.47487L19.4748 8.06066L15.9393 4.52513L14.5251 5.93934Z"
                fill="white"
              />
            </svg>
          </label>
          <a href="#" class="profil-settings-edit-avatar__remove">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.9975 7.07125C20.0368 6.52037 19.6221 6.04189 19.0712 6.00254C18.5204 5.96319 18.0419 6.37787 18.0025 6.92875L19.9975 7.07125ZM18.1327 19.1425L17.1352 19.0712L18.1327 19.1425ZM5.86732 19.1425L6.86478 19.0712L5.86732 19.1425ZM5.99746 6.92875C5.95811 6.37787 5.47963 5.96319 4.92875 6.00254C4.37787 6.04189 3.96319 6.52037 4.00254 7.07125L5.99746 6.92875ZM11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11H11ZM9 17C9 17.5523 9.44772 18 10 18C10.5523 18 11 17.5523 11 17H9ZM15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11H15ZM13 17C13 17.5523 13.4477 18 14 18C14.5523 18 15 17.5523 15 17H13ZM14 7C14 7.55228 14.4477 8 15 8C15.5523 8 16 7.55228 16 7H14ZM8 7C8 7.55228 8.44772 8 9 8C9.55228 8 10 7.55228 10 7H8ZM4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8V6ZM20 8C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6V8ZM18.0025 6.92875L17.1352 19.0712L19.1301 19.2137L19.9975 7.07125L18.0025 6.92875ZM16.1378 20H7.86224V22H16.1378V20ZM6.86478 19.0712L5.99746 6.92875L4.00254 7.07125L4.86986 19.2137L6.86478 19.0712ZM7.86224 20C7.3376 20 6.90216 19.5946 6.86478 19.0712L4.86986 19.2137C4.982 20.7837 6.28832 22 7.86224 22V20ZM17.1352 19.0712C17.0978 19.5946 16.6624 20 16.1378 20V22C17.7117 22 19.018 20.7837 19.1301 19.2137L17.1352 19.0712ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM10 4H14V2H10V4ZM14 4V7H16V4H14ZM10 7V4H8V7H10ZM14 4H16C16 2.89543 15.1046 2 14 2V4ZM10 2C8.89543 2 8 2.89543 8 4H10V2ZM4 8H20V6H4V8Z"
                fill="#A7A7A7"
              />
            </svg>
          </a>
        </div>
      </div>
      <div class="profil-settings-item">
        <div class="profil-settings-item__title">
          Name Profile<span>*</span>
        </div>
        <div class="psi-status">
          <input
            type="text"
            placeholder="Enter name profile"
            class="global-input global-input_large profil-settings-item__text"
          />
          <div class="global-status global-status_blue">
            <img src="@/assets/img/global-status_icon1.svg" alt="" />
            <span> Verified </span>
          </div>
        </div>
      </div>
      <div class="profil-settings-item">
        <div class="profil-settings-item__title">
          Name Profile<span>*</span>
        </div>
        <div class="psi-status">
          <input
            type="text"
            placeholder="Enter name profile"
            value="Vitalik Buterin"
            class="global-input global-input_large profil-settings-item__text"
          />
          <div class="global-status global-status_red">
            <img src="@/assets/img/global-status_icon2.svg" alt="" />
            <span> Rejected </span>
          </div>
        </div>
      </div>
      <div class="profil-settings-item">
        <div class="profil-settings-item__title">
          Name Profile<span>*</span>
        </div>
        <div class="psi-status">
          <input
            type="text"
            placeholder="Enter name profile"
            value="Vitalik Buterin"
            class="global-input global-input_large profil-settings-item__text"
          />
          <div
            class="global-status global-status_grey global-status_unverified p-relative zindex-2"
          >
            <img src="@/assets/img/global-status_icon3.svg" alt="" />
            <span id="status-unverified" ref="hintRef"> Unverified </span>
          </div>
        </div>
      </div>
      <div class="profil-settings-item">
        <div class="profil-settings-item__title">Email</div>
        <div class="psi-status">
          <input
            type="email"
            placeholder="Enter you email"
            class="global-input global-input_large profil-settings-item__text"
          />
        </div>
      </div>
      <div class="profil-settings-item">
        <div class="profil-settings-item__title">
          {{ chainName }} Public Address<span>*</span>
        </div>
        <div class="global-copy">
          <input
            id="global-copy1"
            type="text"
            :value="address"
            readonly
            class="global-input global-input_large profil-settings-item__text"
          />
          <a
            href="#"
            data-clipboard-target="#global-copy1"
            class="global-copy__link"
            @click.prevent="copyAddress"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2929 3.29289L16 2.58579L16 2.58579L15.2929 3.29289ZM19.7071 7.70711L20.4142 7L19.7071 7.70711ZM10 4H14.5858V2H10V4ZM19 8.41421V15H21V8.41421H19ZM14.5858 4L19 8.41421L20.4142 7L16 2.58579L14.5858 4ZM21 8.41421C21 7.88378 20.7893 7.37507 20.4142 7L19 8.41421H19H21ZM14.5858 4L14.5858 4L16 2.58579C15.6249 2.21071 15.1162 2 14.5858 2V4ZM10 16C9.44772 16 9 15.5523 9 15H7C7 16.6569 8.34315 18 10 18V16ZM18 18C19.6569 18 21 16.6569 21 15H19C19 15.5523 18.5523 16 18 16V18ZM9 5C9 4.44772 9.44772 4 10 4V2C8.34315 2 7 3.34315 7 5H9ZM6 22H14V20H6V22ZM3 9V19H5V9H3ZM6 20C5.44772 20 5 19.5523 5 19H3C3 20.6569 4.34315 22 6 22V20ZM9 15V7H7V15H9ZM9 7V5H7V7H9ZM6 8H8V6H6V8ZM18 16H16V18H18V16ZM16 16H10V18H16V16ZM17 19V17H15V19H17ZM5 9C5 8.44772 5.44772 8 6 8V6C4.34315 6 3 7.34315 3 9H5ZM14 22C15.6569 22 17 20.6569 17 19H15C15 19.5523 14.5523 20 14 20V22Z"
                fill="#687684"
              />
            </svg>
          </a>
        </div>
      </div>
      <div class="profil-settings-item">
        <div class="profil-settings-item__title">Status</div>
        <input
          type="text"
          placeholder="Enter status"
          class="global-input global-input_large profil-settings-item__text"
        />
      </div>
    </div>
    <div class="profil-settings-btns">
      <button class="btn btn_default btn_large btn-blue">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { authModule } from '~/store';
import { copyToClipboard } from '~/utils/copyToClipboard';
import { popoverHintInit, popoverHintDestroy } from '~/utils/popoverHint';

@Component({
  head: {
    title: 'Profile settings | Crypto.Page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Profile settings | Crypto.Page',
      },
    ],
  },
  layout: 'account',
})
export default class ProfileSettingsPage extends Vue {
  $refs!: {
    hintRef: HTMLSpanElement;
  };

  get address(): string {
    return authModule.address;
  }

  get chainName() {
    return authModule.chainName;
  }

  mounted() {
    this.showHint();
  }

  beforeDestroy() {
    this.destroyHint();
  }

  copyAddress() {
    copyToClipboard(this.address);

    this.$notify({
      type: 'success',
      title: 'Address copied to clipboard',
    });
  }

  showHint() {
    popoverHintInit(this.$refs.hintRef, {
      title: 'Attention',
      content:
        'Identity verification (KYC/AML) is mandatory to participate in our token sale.',
    });
  }

  destroyHint() {
    popoverHintDestroy(this.$refs.hintRef);
  }
}
</script>
