<template>
  <div class="unlockable-fields-container">
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

    <div class="voite-collapse-wrap mb_15">
      <div
        v-show="
          unlockableContentAccessType ===
          ENftFormUnlockableContentAccessType.oneTime
        "
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
                v-model="priceLocal"
                class="global-input global-input_large"
                placeholder="Enter content price"
                @blur="handlePriceBlur"
                @focus="handlePriceFocus"
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
        <div class="voite-collapse-body pt-0">
          <div class="global-text_12 mb_10">
            This post will be paid as part of the payment for the entire
            subscription (price per day)
          </div>
          <div class="row modal-creat-unlocks-tabs-row">
            <div class="col-sm-6 col-12 mb_10 mb_sm_0">
              <div class="form-field">
                <div class="form-field-with-drop form-field-with-drop_text">
                  <input
                    v-model="durationLocal"
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
                      {{ durationTypeLabel }}
                    </a>
                    <div class="drop-down__col">
                      <ul class="drop-down__list">
                        <li v-for="item in durationTypeList" :key="item.slug">
                          <a
                            href="#"
                            @click.prevent="selectDurationType(item.slug)"
                          >
                            {{ item.label }}
                          </a>
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
                    v-model="priceLocal"
                    class="global-input global-input_large"
                    placeholder="Enter content price"
                    @blur="handlePriceBlur"
                    @focus="handlePriceFocus"
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
    <div>
      <div class="global-text_14 light_grey">Public description</div>
      <div class="mt_4 p-relative">
        <input
          type="text"
          placeholder="Enter a description of the encrypted content"
          class="global-input global-input_large w-100 pr_45"
          :value="description"
          @input="updateDescription"
        />
        <a
          ref="publicDescription"
          href="#"
          class="global-info"
          title="Description is shown to the user to explain what is hidden in the post"
        >
          <img src="@/assets/img/global-status_icon4.svg" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';
import {
  ENftFormUnlockableContentAccessDurationType,
  ENftFormUnlockableContentAccessType,
  INftForm,
} from '~/types/nft-form';
import {
  hideProfileContentDropTarget,
  profileContentDropTarget,
} from '~/utils/profileContentDrop';
import { durationTypeList } from '~/utils/durationType';

@Component({})
export default class UnlockableFields extends Vue {
  ENftFormUnlockableContentAccessType = ENftFormUnlockableContentAccessType;
  nftFormModule = nftFormModule;
  durationTypeList = durationTypeList;
  priceLocal = '';
  durationLocal = '';

  $refs!: {
    onetimePriceDropLink: HTMLDivElement;
    durationDropLink: HTMLDivElement;
    timePriceDropLink: HTMLDivElement;
    publicDescription: HTMLAnchorElement;
  };

  get durationTypeLabel() {
    const find = durationTypeList.find(
      (item) => item.slug === this.unlockableContentAccessDurationType,
    );

    return find?.label || '';
  }

  get unlockableContentAccessType(): INftForm['unlockableContentAccessType'] {
    return nftFormModule.values.unlockableContentAccessType;
  }

  get unlockableContentPrice() {
    return nftFormModule.values.unlockableContentPrice;
  }

  get description(): string {
    return nftFormModule.values.unlockableContentDescription;
  }

  @Watch('priceLocal')
  onPriceLocalChanged(priceLocal: string) {
    if (priceLocal.includes('PAGE')) {
      return;
    }

    if (/[^0-9.]/.test(priceLocal)) {
      let cleanPrice = priceLocal.replace(/[^0-9,.]/g, '');
      cleanPrice = cleanPrice.replace(/,/g, '.');
      this.priceLocal = cleanPrice;

      return;
    }

    const numPrice = parseFloat(priceLocal);

    if (!priceLocal || isNaN(numPrice)) {
      nftFormModule.setUnlockableContentPrice(0);
      this.priceLocal = '';
      return;
    }

    nftFormModule.setUnlockableContentPrice(numPrice);
  }

  @Watch('unlockableContentPrice', { immediate: true })
  onUnlockableContentPriceChanged(unlockableContentPrice: number | null) {
    if ((unlockableContentPrice || 0) !== parseFloat(this.priceLocal || '0')) {
      this.priceLocal = `${String(unlockableContentPrice)} PAGE`;
    }
  }

  get unlockableContentAccessDuration() {
    return nftFormModule.values.unlockableContentAccessDuration;
  }

  @Watch('durationLocal')
  onDurationLocalChanged(durationLocal: string) {
    const numDuration = parseInt(durationLocal);

    if (!durationLocal || isNaN(numDuration)) {
      nftFormModule.setUnlockableContentAccessDuration(0);
      this.durationLocal = '';
      return;
    }

    if (durationLocal !== String(numDuration)) {
      this.durationLocal = String(numDuration);
      return;
    }

    nftFormModule.setUnlockableContentAccessDuration(numDuration);
  }

  @Watch('unlockableContentAccessDuration', { immediate: true })
  onUnlockableContentAccessDurationChanged(
    unlockableContentAccessDuration: number | null,
  ) {
    if (String(unlockableContentAccessDuration || '') !== this.durationLocal) {
      this.durationLocal = String(unlockableContentAccessDuration);
    }
  }

  get unlockableContentAccessDurationType(): ENftFormUnlockableContentAccessDurationType | null {
    return nftFormModule.values.unlockableContentAccessDurationType;
  }

  mounted() {
    this.$nextTick(() => {
      profileContentDropTarget(this.$refs.onetimePriceDropLink);
      profileContentDropTarget(this.$refs.durationDropLink);
      profileContentDropTarget(this.$refs.timePriceDropLink);

      ($(this.$refs.publicDescription) as any).tooltip({
        trigger: 'hover',
        title:
          'Description is shown to the user to explain what is hidden in the post',
      });
    });
  }

  selectOnetimeToken() {
    hideProfileContentDropTarget(this.$refs.onetimePriceDropLink);
  }

  selectTimeToken() {
    hideProfileContentDropTarget(this.$refs.timePriceDropLink);
  }

  selectDurationType(slug: ENftFormUnlockableContentAccessDurationType) {
    nftFormModule.setUnlockableContentAccessDurationType(slug);

    /** закрываем дропдаун */

    hideProfileContentDropTarget(this.$refs.durationDropLink);
  }

  updateDescription(e: InputEvent) {
    nftFormModule.setUnlockableContentDescription(
      (e.target as HTMLTextAreaElement)?.value || '',
    );
  }

  handlePriceBlur() {
    this.priceLocal = this.priceLocal
      ? `${parseFloat(this.priceLocal)} PAGE`
      : '';
  }

  handlePriceFocus() {
    this.priceLocal = this.priceLocal.replace(' PAGE', '');
  }
}
</script>
