<template>
  <div>
    <!-- Modal -->
    <div
      ref="modal"
      class="modal fade modal-profile-login"
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
            <div class="modal-profile-login__form">
              <ConnectForm @success="handleSuccess" />
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
import ModalCloseIcon from '~/components/icon/nft-form/modal/ModalCloseIcon.vue';
import ConnectForm from '~/components/connect/ConnectForm.vue';

@Component({
  components: {
    ModalCloseIcon,
    ConnectForm,
  },
})
export default class ConnectModal extends Vue {
  $refs!: {
    modal: HTMLDivElement;
  };

  handleSuccess() {
    ($(this.$refs.modal) as any).modal('hide');
  }
}
</script>
