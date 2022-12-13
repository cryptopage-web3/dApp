<template>
  <div>
    <!-- Modal -->
    <div
      ref="modal"
      class="modal fade modal-creat-result"
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
            <div class="modal-creat-result-wrap">
              <div class="modal-creat-result__title">
                You created “{{ title }}”
              </div>
              <div class="modal-creat-result__thumb">
                <img :src="fileLink" alt="" />
              </div>
              <div v-if="description" class="modal-creat-result__text">
                {{ description }}
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
import { Component, Watch } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';
import ModalCloseIcon from '~/components/icon/nft-form/modal/ModalCloseIcon.vue';
import { INftForm } from '~/types/nft-form';

@Component({
  components: {
    ModalCloseIcon,
  },
})
export default class ModalSuccess extends Vue {
  $refs!: {
    modal: HTMLDivElement;
  };

  get showModal(): boolean {
    return nftFormModule.showSuccessModal.status;
  }

  get nftData(): undefined | INftForm {
    return nftFormModule.showSuccessModal.data;
  }

  get title(): string {
    return this.nftData?.title || '';
  }

  get description(): string {
    return this.nftData?.description || '';
  }

  get file(): File | null {
    return this.nftData?.file || null;
  }

  get fileType(): string | null {
    return this.file ? this.file.type.split('/')[0] : null;
  }

  get fileLink(): string | null {
    return this.file ? window.URL.createObjectURL(this.file) : null;
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
      nftFormModule.setShowSuccessModal({
        status: false,
      });
    });
  }

  show() {
    ($(this.$refs.modal) as any).modal('show');
  }

  hide() {
    ($(this.$refs.modal) as any).modal('hide');
  }
}
</script>
