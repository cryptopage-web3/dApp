<template>
  <div>
    <div class="modal-creat-checkbox mb_20">
      <div class="modal-creat-checkbox__left">
        <div class="modal-creat-checkbox__icon">
          <img src="@/assets/img/modal-creat-checkbox_icon2.svg" alt="" />
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
    <div v-if="isUnlockable" class="form-field modal-creat-text-content mb_20">
      <div class="">
        <a
          href="#"
          class="btn btn_default"
          :class="
            unlockableContentAccessType ===
            ENftFormUnlockableContentAccessType.oneTime
              ? 'btn-blue_button'
              : 'btn_grey'
          "
          @click="
            nftFormModule.setUnlockableContentAccessType(
              ENftFormUnlockableContentAccessType.oneTime,
            )
          "
        >
          One-time
        </a>
        <a
          href="#"
          class="btn btn_default"
          :class="
            unlockableContentAccessType ===
            ENftFormUnlockableContentAccessType.customDuration
              ? 'btn-blue_button'
              : 'btn_grey'
          "
          @click="
            nftFormModule.setUnlockableContentAccessType(
              ENftFormUnlockableContentAccessType.customDuration,
            )
          "
        >
          Time
        </a>
      </div>

      <div
        v-if="
          unlockableContentAccessType ===
          ENftFormUnlockableContentAccessType.oneTime
        "
      ></div>
      <div
        v-else-if="
          unlockableContentAccessType ===
          ENftFormUnlockableContentAccessType.customDuration
        "
      >
        <input
          v-model.number="unlockableContentAccessDuration"
          type="number"
          class="global-input global-input_large mt_10"
          placeholder="Enter access duration days count"
        />
      </div>

      <input
        v-model.number="unlockableContentPrice"
        type="number"
        class="global-input global-input_large mt_10"
        placeholder="Enter content price..."
      />

      <!--      <div class="form-field__title">Text content</div>-->
      <!--      <textarea-->
      <!--        class="global-input global-input_textarea"-->
      <!--        placeholder="Enter text"-->
      <!--        :value="text"-->
      <!--        @input="updateText"-->
      <!--      />-->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import {
  ENftFormUnlockableContentAccessType,
  INftForm,
} from '../../../types/nft-form';
import { nftFormModule } from '~/store';

@Component({})
export default class ModalUnlockable extends Vue {
  ENftFormUnlockableContentAccessType = ENftFormUnlockableContentAccessType;
  nftFormModule = nftFormModule;
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

  get unlockableContentPrice(): INftForm['unlockableContentPrice'] {
    return nftFormModule.values.unlockableContentPrice / 10 ** 18;
  }

  set unlockableContentPrice(v) {
    nftFormModule.setUnlockableContentPrice(parseInt(v) * 10 ** 18);
  }

  get unlockableContentAccessDuration(): INftForm['unlockableContentAccessDuration'] {
    return (
      nftFormModule.values.unlockableContentAccessDuration / (24 * 60 * 60)
    );
  }

  set unlockableContentAccessDuration(e) {
    nftFormModule.setUnlockableContentAccessDuration(
      parseInt(e) * (24 * 60 * 60),
    );
  }
}
</script>
