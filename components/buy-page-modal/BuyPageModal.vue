<template>
  <div>
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
              <h3 class="global-zag mb_xl_20 mb_md_15 mb_10">Buy PAGE</h3>
              <div class="global-text_12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                congue volutpat mauris, ac scelerisque ante feugiat a.
              </div>
              <div
                class="onboarding-welcome-btns d-flex align-items-center justify-content-center mt_md_20 mt_10"
              >
                <a
                  href="#"
                  role="button"
                  class="btn btn-blue-transparent_button btn_large mr_20 pr_30 pl_30"
                  @click.prevent="hide"
                >
                  Skip
                </a>
                <a
                  href="#"
                  role="button"
                  class="btn btn-blue_button btn_large pr_30 pl_30"
                  @click.prevent="buy"
                >
                  Buy PAGE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <KycVerificationModal ref="kycModal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import KycVerificationModal from './KycVerificationModal.vue';
import { authModule } from '~/store';
import { EVerifiedStatus } from '~/types';
import { BUYPAGEMODAL_VERIFIED_URL } from '~/constants';

@Component({
  components: {
    KycVerificationModal,
  },
})
export default class BuyPageModal extends Vue {
  $refs!: {
    modal: HTMLDivElement;
    kycModal: KycVerificationModal;
  };

  get showModal(): boolean {
    return authModule.showBuyPageModal;
  }

  get isVerified() {
    return authModule.verifiedStatus.status === EVerifiedStatus.verified;
  }

  @Watch('showModal')
  onShowModalChanged(showModal: boolean) {
    if (showModal) {
      this.show();
    } else {
      this.hide();
    }
  }

  mounted() {
    ($(this.$refs.modal) as any).on('hide.bs.modal', function () {
      authModule.setShowBuyPageModal(false);
    });
  }

  // methods

  show() {
    ($(this.$refs.modal) as any).modal('show');
  }

  hide() {
    ($(this.$refs.modal) as any).modal('hide');
  }

  buy() {
    this.hide();

    if (this.isVerified) {
      window.open(BUYPAGEMODAL_VERIFIED_URL, '_blank');
    } else {
      this.$refs.kycModal.show();
    }
  }
}
</script>
