<template>
  <div>
    <div class="modal-creat-checkbox mb_20">
      <div class="modal-creat-checkbox__left">
        <div class="modal-creat-checkbox__icon">
          <img src="@/assets/img/modal-creat-checkbox_icon2_2.svg" alt="" />
        </div>
        <div class="modal-creat-checkbox__cont">
          <div class="modal-creat-checkbox__title">Unlockable content</div>
          <div class="modal-creat-checkbox__text">
            Include unlockable content that can only be revealed by the owner of
            the item
          </div>
        </div>
      </div>
      <div class="modal-creat-checkbox__right">
        <label class="global-checkbox">
          <input
            type="checkbox"
            :checked="isUnlockable"
            @change="updateIsUnlockable"
          />
          <div class="global-checkbox__wrap">
            <div class="global-checkbox__circle"></div>
          </div>
        </label>
      </div>
    </div>
    <div
      v-show="isUnlockable"
      class="modal-creat-unlocks-tabs voite-collapse mb_20 checkbox-collapse"
    >
      <div class="voite-collapse-links-wrap">
        <a
          href="#"
          class="btn btn_default voite-collapse-link"
          :class="{
            active:
              unlockableContentAccessType ===
              ENftFormUnlockableContentAccessType.oneTime,
          }"
          @click.prevent="
            nftFormModule.setUnlockableContentAccessType(
              ENftFormUnlockableContentAccessType.oneTime,
            )
          "
        >
          One-time
        </a>
        <a
          href="#"
          class="btn btn_default voite-collapse-link"
          :class="{
            active:
              unlockableContentAccessType ===
              ENftFormUnlockableContentAccessType.customDuration,
          }"
          @click.prevent="
            nftFormModule.setUnlockableContentAccessType(
              ENftFormUnlockableContentAccessType.customDuration,
            )
          "
        >
          Time
        </a>
      </div>

      <div class="voite-collapse-wrap">
        <div
          v-show="
            unlockableContentAccessType ===
            ENftFormUnlockableContentAccessType.oneTime
          "
          class="voite-collapse-cont"
          style="display: block"
        >
          <div class="voite-collapse-body">
            <div class="global-text_12 mb_10">
              Enter the amount that the user will have to pay to view the
              content
            </div>
            <div class="form-field">
              <div class="form-field-with-drop">
                <input
                  v-model="unlockableContentPrice"
                  class="global-input global-input_large"
                  placeholder="Enter content price"
                />
                <div
                  class="profile-content-drop modal-creat-drop market-filtr__drop"
                >
                  <a
                    ref="onetimePriceDropLink"
                    href="#"
                    class="form-field-with-drop__link profile-content-drop__link"
                  >
                    <img
                      src="@/assets/img/modal-creat-unlocks-tabs-icon1.svg"
                      alt=""
                    />
                  </a>
                  <div class="drop-down__col">
                    <ul class="drop-down__list">
                      <li>
                        <a href="#" @click.prevent="selectOnetimeToken">
                          <img
                            src="@/assets/img/modal-creat-unlocks-tabs-icon1.svg"
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
        <div
          v-show="
            unlockableContentAccessType ===
            ENftFormUnlockableContentAccessType.customDuration
          "
          class="voite-collapse-cont"
          style="display: block"
        >
          <div class="voite-collapse-body">
            <div class="global-text_12 mb_10">
              This post will be paid as part of the payment for the entire
              subscription
            </div>
            <div class="row modal-creat-unlocks-tabs-row">
              <div class="col-sm-6 col-12 mb_10 mb_sm_0">
                <div class="form-field">
                  <div class="form-field-with-drop form-field-with-drop_text">
                    <input
                      v-model="unlockableContentAccessDuration"
                      class="global-input global-input_large"
                      placeholder="Enter access duration"
                    />
                    <div
                      class="profile-content-drop modal-creat-drop market-filtr__drop"
                    >
                      <a
                        ref="durationDropLink"
                        href="#"
                        class="form-field-with-drop__link profile-content-drop__link"
                      >
                        Days
                      </a>
                      <div class="drop-down__col">
                        <ul class="drop-down__list">
                          <li>
                            <a href="#"> Days </a>
                          </li>
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
                      v-model="unlockableContentPrice"
                      class="global-input global-input_large"
                      placeholder="Enter content price"
                    />
                    <div
                      class="profile-content-drop modal-creat-drop market-filtr__drop"
                    >
                      <a
                        ref="timePriceDropLink"
                        href="#"
                        class="form-field-with-drop__link profile-content-drop__link"
                      >
                        <img
                          src="@/assets/img/modal-creat-unlocks-tabs-icon1.svg"
                          alt=""
                        />
                      </a>
                      <div class="drop-down__col">
                        <ul class="drop-down__list">
                          <li>
                            <a href="#" @click.prevent="selectTimeToken">
                              <img
                                src="@/assets/img/modal-creat-unlocks-tabs-icon1.svg"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';
import {
  ENftFormUnlockableContentAccessType,
  INftForm,
} from '~/types/nft-form';
import {
  hideProfileContentDropTarget,
  profileContentDropTarget,
} from '~/utils/profileContentDrop';

@Component({})
export default class ModalUnlockable extends Vue {
  ENftFormUnlockableContentAccessType = ENftFormUnlockableContentAccessType;
  nftFormModule = nftFormModule;

  $refs!: {
    onetimePriceDropLink: HTMLDivElement;
    durationDropLink: HTMLDivElement;
    timePriceDropLink: HTMLDivElement;
  };

  get isUnlockable(): boolean {
    return nftFormModule.values.isUnlockableContent;
  }

  updateIsUnlockable(e: InputEvent) {
    nftFormModule.setIsUnlockableContent(
      (e.target as HTMLInputElement)?.checked || false,
    );
  }

  get unlockableContentAccessType(): INftForm['unlockableContentAccessType'] {
    return nftFormModule.values.unlockableContentAccessType;
  }

  get unlockableContentPrice(): string {
    return String(
      (nftFormModule.values.unlockableContentPrice || 0) / 10 ** 18,
    );
  }

  set unlockableContentPrice(v: string) {
    nftFormModule.setUnlockableContentPrice(parseInt(v) * 10 ** 18);
  }

  get unlockableContentAccessDuration(): string {
    return String(
      (nftFormModule.values.unlockableContentAccessDuration || 0) /
        (24 * 60 * 60),
    );
  }

  set unlockableContentAccessDuration(e) {
    nftFormModule.setUnlockableContentAccessDuration(
      parseInt(e) * (24 * 60 * 60),
    );
  }

  mounted() {
    this.$nextTick(() => {
      profileContentDropTarget(this.$refs.onetimePriceDropLink);
      profileContentDropTarget(this.$refs.durationDropLink);
      profileContentDropTarget(this.$refs.timePriceDropLink);
    });
  }

  selectOnetimeToken() {
    hideProfileContentDropTarget(this.$refs.onetimePriceDropLink);
  }

  selectTimeToken() {
    hideProfileContentDropTarget(this.$refs.timePriceDropLink);
  }
}
</script>
