<template>
  <div
    ref="modal"
    class="modal fade global-modal onboarding-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="global-modal-body">
            <div class="d-flex align-items-center flex-column mb_20">
              <img
                class="mb_20"
                src="@/assets/img/onboarding-modal-sign_img3.svg"
                alt=""
              />
              <div class="global-zag">Attention</div>
            </div>
            <div class="global-text_14">
              <p>
                Identity verification (KYC/AML) is mandatory to participate in
                our token sale. Participation in the purchase of PAGE tokens
                will remain unavailable
              </p>
            </div>
            <div
              class="onboarding-welcome-btns d-flex align-items-center justify-content-center mt_md_20 mt_10"
            >
              <a
                href="#"
                role="button"
                class="btn btn-blue_button btn_large pr_30 pl_30 mr_10 ml_10"
                @click.prevent="home"
              >
                Home
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
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class AttentionModal extends Vue {
  $refs!: {
    modal: HTMLDivElement;
  };

  // methods

  show() {
    ($(this.$refs.modal) as any).modal('show');
  }

  hide() {
    ($(this.$refs.modal) as any).modal('hide');
  }

  home() {
    this.hide();

    this.$router.push(`/`);
  }
}
</script>
