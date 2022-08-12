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
              <ModalLevels />

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
import ModalLevels from './ModalLevels.vue';
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
    ModalLevels,
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
