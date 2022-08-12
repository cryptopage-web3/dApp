<template>
  <div>
    <!-- Modal -->
    <div
      id="modal-creat-nft"
      class="modal fade modal-creat"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <ModalCloseIcon />
            </button>
            <div class="modal-creat-row mb_20">
              <div class="modal-creat__title mb_20">Create new item</div>

              <ModalTitle />
              <ModalDescription />
              <ModalFile />
            </div>
            <div class="modal-creat-row">
              <div class="modal-creat__title mb_20">Addictional fields</div>

              <ModalExternalLink />
              <ModalCollection />
              <ModalComments />
              <ModalUnlockable />
              <ModalExplicit />
              <ModalProperties />
              <ModalStats />

              <div class="modal-creat-collapse mb_20">
                <a
                  href="#"
                  class="modal-creat-checkbox modal-creat-collapse-link"
                >
                  <div class="modal-creat-checkbox__left">
                    <div class="modal-creat-checkbox__icon">
                      <img
                        src="@/assets/img/modal-creat-checkbox_icon6.svg"
                        alt=""
                      />
                    </div>
                    <div class="modal-creat-checkbox__cont">
                      <div class="modal-creat-checkbox__title">Levels</div>
                      <div class="modal-creat-checkbox__text">
                        Numerical traits that show as a progress bar
                      </div>
                    </div>
                  </div>
                  <div class="modal-creat-collapse-link__arrow">
                    <img
                      src="@/assets/img/modal-creat-collapse-link_arrow_img.svg"
                      alt=""
                    />
                  </div>
                </a>
                <div class="modal-creat-collapse-body">
                  <div class="modal-creat__title2 mb_10">Add Levels</div>
                  <div class="modal-creat-add">
                    <a href="#" class="modal-creat-add__close disabled">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.500977"
                          width="29"
                          height="29"
                          rx="14.5"
                          stroke="#E4E4E4"
                        />
                        <path
                          d="M19.8731 11.5413C20.2636 11.1507 20.2636 10.5176 19.8731 10.127C19.4826 9.73652 18.8494 9.73652 18.4589 10.127L19.8731 11.5413ZM10.1256 18.4604C9.73505 18.8509 9.73505 19.4841 10.1256 19.8746C10.5161 20.2651 11.1493 20.2651 11.5398 19.8746L10.1256 18.4604ZM18.4589 19.8746C18.8494 20.2651 19.4826 20.2651 19.8731 19.8746C20.2636 19.4841 20.2636 18.8509 19.8731 18.4604L18.4589 19.8746ZM11.5398 10.127C11.1493 9.73652 10.5161 9.73652 10.1256 10.127C9.73505 10.5176 9.73505 11.1507 10.1256 11.5413L11.5398 10.127ZM18.4589 10.127L10.1256 18.4604L11.5398 19.8746L19.8731 11.5413L18.4589 10.127ZM19.8731 18.4604L11.5398 10.127L10.1256 11.5413L18.4589 19.8746L19.8731 18.4604Z"
                          fill="#A7A7A7"
                        />
                      </svg>
                    </a>
                    <div class="modal-creat-add-wrap modal-creat-add-wrap2">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        class="global-input modal-creat-add-input-js mr_5 mr_md_10"
                      />
                      <input
                        type="text"
                        placeholder="3"
                        name="from"
                        class="global-input modal-creat-add-input-js mr_5 mr_md_10"
                      />
                      <span class="d-inline-block mr_5 mr_md_10">of</span>
                      <input
                        type="text"
                        placeholder="5"
                        name="to"
                        class="global-input modal-creat-add-input-js mr_5 mr_md_10"
                      />
                      <a
                        href="#"
                        class="modal-creat-add__btn3 btn btn_default disabled"
                      >
                        Apply
                      </a>
                    </div>
                    <div class="modal-creat-add-cont"></div>
                  </div>
                </div>
              </div>
              <div class="modal-creat-text mb_20">
                <div class="modal-creat__title2">Supply</div>
                <div class="global-text">
                  The number of items that can be minted. No gas cost to you!
                </div>
                <input
                  type="text"
                  placeholder="1"
                  class="global-input global-input_large mt_10"
                />
              </div>
              <div class="modal-creat-text mb_20">
                <div class="modal-creat__title2">Blockchain</div>
                <div
                  class="profile-content-drop modal-creat-drop2 market-filtr__drop mt_5"
                >
                  <a href="#" class="profile-content-drop__link">
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-header__wallet_icon2.svg"
                        alt=""
                      />
                    </div>
                    <span> Ethereum </span>
                  </a>
                  <div class="drop-down__col">
                    <ul class="drop-down__list">
                      <li>
                        <a href="#">
                          <div class="thumb">
                            <img
                              src="@/assets/img/market-header__wallet_icon2.svg"
                              alt=""
                            />
                          </div>
                          <span> Ethereum </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div class="thumb">
                            <img
                              src="@/assets/img/market-header__wallet_icon3.svg"
                              alt=""
                            />
                          </div>
                          <span> Binance Smart Chain </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div class="thumb">
                            <img
                              src="@/assets/img/market-header__wallet_icon4.svg"
                              alt=""
                            />
                          </div>
                          <span> Polygon </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div class="thumb">
                            <img
                              src="@/assets/img/market-header__wallet_icon5.svg"
                              alt=""
                            />
                          </div>
                          <span> Tron </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div class="thumb">
                            <img
                              src="@/assets/img/market-header__wallet_icon6.svg"
                              alt=""
                            />
                          </div>
                          <span> Solana </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <a
                  href="#"
                  class="btn btn_modal-creat btn_default btn_large w_164"
                  :class="{ 'btn-blue_button': isValid, disabled: !isValid }"
                  @click.prevent="createNft"
                >
                  {{ isOwner ? 'Create' : 'Send' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import ModalTitle from './ModalTitle.vue';
import ModalDescription from './ModalDescription.vue';
import ModalFile from './ModalFile.vue';
import ModalExternalLink from './ModalExternalLink.vue';
import ModalCollection from './ModalCollection.vue';
import ModalComments from './ModalComments.vue';
import ModalUnlockable from './ModalUnlockable.vue';
import ModalExplicit from './ModalExplicit.vue';
import ModalProperties from './ModalProperties.vue';
import ModalStats from './ModalStats.vue';
import { addressModule, authModule, nftFormModule } from '~/store';
import ModalCloseIcon from '~/components/icon/nft-form/modal/ModalCloseIcon.vue';

@Component({
  components: {
    ModalCloseIcon,
    ModalTitle,
    ModalDescription,
    ModalFile,
    ModalExternalLink,
    ModalCollection,
    ModalComments,
    ModalUnlockable,
    ModalExplicit,
    ModalProperties,
    ModalStats,
  },
})
export default class Modal extends Vue {
  get isOwner(): boolean {
    return (
      authModule.address.toLowerCase() ===
        addressModule.address.toLowerCase() &&
      authModule.chainSlug === addressModule.chainSlug
    );
  }

  get isValid(): boolean {
    return nftFormModule.isValid;
  }

  createNft() {
    console.log(nftFormModule.values);
  }
}
</script>
