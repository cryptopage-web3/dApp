<template>
  <div
    ref="modal"
    class="modal fade global-modal onboarding-modal verify-confirm-modal"
    tabindex="1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-backdrop="static"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="global-modal-body">
            <div class="d-flex align-items-center flex-column mb_20">
              <img
                class="mb_20"
                src="@/assets/img/onboarding-modal-sign_img.svg"
                alt=""
              />
              <div class="global-zag">Confirm to Sign</div>
            </div>
            <div class="global-text_14 text-center">
              Sign the message to get access to Crypto.Page sevices.
            </div>
            <div
              class="onboarding-welcome-btns d-flex align-items-center justify-content-center mt_md_20 mt_10"
            >
              <a
                href="#"
                role="button"
                class="btn btn-blue-transparent_button btn_large pr_30 pl_30 mr_10 ml_10"
                @click.prevent="cancel"
              >
                Cancel
              </a>
              <a
                href="#"
                role="button"
                class="btn btn-blue_button btn_large pr_30 pl_30 mr_10 ml_10"
                @click.prevent="accept"
              >
                Accept and Sign
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit } from 'nuxt-property-decorator';

@Component({})
export default class ConfirmSignModal extends Vue {
  $refs!: {
    modal: HTMLDivElement;
  };

  // emit

  @Emit('cancel')
  emitCancel() {
    return true;
  }

  @Emit('accept')
  emitAccept() {
    return true;
  }

  // methods

  show() {
    ($(this.$refs.modal) as any).modal('show');
  }

  hide() {
    ($(this.$refs.modal) as any).modal('hide');
  }

  cancel() {
    this.emitCancel();
    this.hide();
  }

  accept() {
    this.emitAccept();
    this.hide();
  }
}
</script>
