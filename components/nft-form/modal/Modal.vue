<template>
  <div>
    <!-- Modal -->
    <div
      id="modal-creat-nft"
      class="modal fade modal-creat"
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
            <div class="modal-creat-row mb_20">
              <div class="modal-creat__title mb_20">Create new item</div>

              <ModalTitle />
              <ModalDescription />
              <ModalFile />
            </div>
            <div class="modal-creat-row">
              <div class="modal-creat__title mb_20">Addictional fields</div>

              <ModalExternalLink />
              <ModalCollection />
              <ModalComments />
              <ModalUnlockable />
              <ModalExplicit />
              <ModalProperties />
              <ModalStats />
              <ModalLevels />
              <ModalSupply />
              <ModalBlockchain />

              <div class="text-center">
                <div ref="sendBtn" class="d-inline-block">
                  <a
                    href="#"
                    class="btn btn_modal-creat btn_default btn_large w_164"
                    :class="{ 'btn-blue_button': isValid, disabled: !isValid }"
                    @click.prevent="createNft"
                  >
                    {{ isOwner ? 'Create' : 'Send' }}
                  </a>
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
import { Component, Watch } from 'nuxt-property-decorator';
import ModalTitle from './ModalTitle.vue';
import ModalDescription from './ModalDescription.vue';
import ModalFile from './ModalFile.vue';
import ModalExternalLink from './ModalExternalLink.vue';
import ModalCollection from './ModalCollection.vue';
import ModalComments from './ModalComments.vue';
import ModalUnlockable from './ModalUnlockable.vue';
import ModalExplicit from './ModalExplicit.vue';
import ModalProperties from './ModalProperties.vue';
import ModalStats from './ModalStats.vue';
import ModalLevels from './ModalLevels.vue';
import ModalSupply from './ModalSupply.vue';
import ModalBlockchain from './ModalBlockchain.vue';
import { addressModule, authModule, nftFormModule } from '~/store';
import ModalCloseIcon from '~/components/icon/nft-form/modal/ModalCloseIcon.vue';

@Component({
  components: {
    ModalCloseIcon,
    ModalTitle,
    ModalDescription,
    ModalFile,
    ModalExternalLink,
    ModalCollection,
    ModalComments,
    ModalUnlockable,
    ModalExplicit,
    ModalProperties,
    ModalStats,
    ModalLevels,
    ModalSupply,
    ModalBlockchain,
  },
})
export default class Modal extends Vue {
  $refs!: {
    sendBtn: HTMLDivElement;
  };

  get isOwner(): boolean {
    return (
      authModule.address.toLowerCase() ===
        addressModule.address.toLowerCase() &&
      authModule.chainSlug === addressModule.chainSlug
    );
  }

  get isValid(): boolean {
    return nftFormModule.isValid;
  }

  @Watch('isValid', { immediate: true })
  onIsValidChanged(isValid: boolean) {
    if (process.client) {
      ($(this.$refs.sendBtn) as any).tooltip(isValid ? 'disable' : 'enable');
    }
  }

  mounted() {
    ($(this.$refs.sendBtn) as any).tooltip({
      trigger: 'hover',
      title: 'Name and file are required',
    });
  }

  createNft() {
    console.log(nftFormModule.values);
  }
}
</script>
