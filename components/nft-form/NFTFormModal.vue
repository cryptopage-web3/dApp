<template>
  <div
    id="nft-form-modal"
    ref="modal"
    class="modal fade nft-form-modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered nft-form-modal__dialog">
      <div class="modal-content">
        <div class="modal-header nft-form-modal__header">
          <h5 class="modal-title">Create NFT</h5>
          <button
            type="button"
            class="close nft-form-modal__close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <icon type="close_modal" />
          </button>
        </div>
        <div class="modal-body nft-form-modal__body">
          <nft-form @submited="hide" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import NFTForm from './NFTForm.vue'

@Component({
  components: {
    icon: async () => await import('@/components/icons/Icon.vue'),
    'nft-form': NFTForm
  }
})
export default class NFTFormModal extends Vue {
  $refs!: {
    modal: HTMLDivElement
  }

  hide() {
    ;($(this.$refs.modal) as any).modal('hide')
  }
}
</script>
