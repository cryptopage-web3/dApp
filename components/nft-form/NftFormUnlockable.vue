<template>
  <div
    v-if="isUnlockable"
    id="form-creat-moneta"
    class="form-creat-moneta voite-collapse mt_15 mb_15"
  >
    <div class="mb_10">
      <div class="global-text_16 fw-700 main_black mb_5">
        NFT monetization settings
      </div>
      <div class="global-text_12">
        Include unlockable content that can only be revealed by the owner of the
        item
      </div>
    </div>
    <div class="voite-collapse-links-wrap">
      <a
        href="#voite-collapse50"
        class="btn btn_default voite-collapse-link active"
      >
        One-time
      </a>
      <a href="#voite-collapse60" class="btn btn_default voite-collapse-link">
        Subscribe
      </a>
      <a href="#voite-collapse70" class="btn btn_default voite-collapse-link">
        Time
      </a>
    </div>
    <div class="voite-collapse-wrap">
      <div
        id="voite-collapse50"
        class="voite-collapse-cont"
        style="display: block"
      >
        <div class="voite-collapse-body pt-0">
          <div class="global-text_12 mb_10">
            Enter the amount that the user will have to pay to view the content
          </div>
          <div class="form-field">
            <div class="form-field-with-drop">
              <input
                type="text"
                class="global-input global-input_large w-100"
                value="10 PAGE"
              />
              <div
                class="profile-content-drop modal-creat-drop market-filtr__drop"
              >
                <a href="#" class="form-field-with-drop__link">
                  <img src="img/modal-creat-unlocks-tabs-icon1.svg" alt="" />
                </a>
                <div class="drop-down__col">
                  <ul class="drop-down__list">
                    <li>
                      <a href="#">
                        <img
                          src="img/modal-creat-unlocks-tabs-icon1.svg"
                          alt=""
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="img/modal-creat-unlocks-tabs-icon1.svg"
                          alt=""
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="voite-collapse60" class="voite-collapse-cont">
        <div class="voite-collapse-body pt-0">
          <div class="global-text_12">
            This post will be paid as part of the payment for the entire
            subscription
          </div>
        </div>
      </div>
      <div id="voite-collapse70" class="voite-collapse-cont">
        <div class="voite-collapse-body pt-0">
          <div class="global-text_12 mb_10">
            This post will be paid as part of the payment for the entire
            subscription
          </div>
          <div class="row modal-creat-unlocks-tabs-row">
            <div class="col-sm-6 col-12 mb_10 mb_sm_0">
              <div class="form-field">
                <div class="form-field-with-drop form-field-with-drop_text">
                  <input
                    type="text"
                    class="global-input global-input_large w-100"
                    value="2"
                  />
                  <div
                    class="profile-content-drop modal-creat-drop market-filtr__drop"
                  >
                    <a href="#" class="form-field-with-drop__link"> Days </a>
                    <div class="drop-down__col">
                      <ul class="drop-down__list">
                        <li>
                          <a href="#"> Weeks </a>
                        </li>
                        <li>
                          <a href="#"> Months </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-12">
              <div class="form-field">
                <div class="form-field-with-drop">
                  <input
                    type="text"
                    class="global-input global-input_large w-100"
                    value="10 PAGE"
                  />
                  <div
                    class="profile-content-drop modal-creat-drop market-filtr__drop"
                  >
                    <a href="#" class="form-field-with-drop__link">
                      <img
                        src="img/modal-creat-unlocks-tabs-icon1.svg"
                        alt=""
                      />
                    </a>
                    <div class="drop-down__col">
                      <ul class="drop-down__list">
                        <li>
                          <a href="#">
                            <img
                              src="img/modal-creat-unlocks-tabs-icon1.svg"
                              alt=""
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img
                              src="img/modal-creat-unlocks-tabs-icon1.svg"
                              alt=""
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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
import { nftFormModule } from '~/store';

@Component({})
export default class NftFormUnlockable extends Vue {
  get isUnlockable(): boolean {
    return nftFormModule.values.isUnlockableContent;
  }
}
</script>
