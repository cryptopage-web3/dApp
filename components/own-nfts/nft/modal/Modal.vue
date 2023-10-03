<template>
  <div
    ref="modal"
    class="modal fade modal-post own-nft-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-post-top">
            <ModalTopUser :nft="nft" />

            <div class="modal-post-top-right">
              <ModalTopDropdown :nft="nft" />

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <CommentCloseIcon />
              </button>
            </div>
          </div>

          <div
            class="profile-content"
            :class="{ 'profile-content_no-border': !hasComments }"
          >
            <div class="profile-content__media">
              <ModalVideo v-if="nft.type === ETypeNft.video" :nft="nft" />
              <ModalAudio v-else-if="nft.type === ETypeNft.audio" :nft="nft" />
              <ModalImage v-else-if="nft.type === ETypeNft.image" :nft="nft" />
              <div v-else class="profile-content__image">
                <div class="profile-content__image-empty">No Media Content</div>
              </div>

              <NftAccessControl
                :loading="decryptLoading"
                :is-encrypted="isEncrypted"
                :access-duration="accessDuration"
                :access-price="accessPrice"
                :access-type="accessType"
                :is-transparent="true"
                @check-access="$emit('check-access')"
                @decrypt="$emit('decrypt')"
                @unlock="$emit('unlock')"
              />
            </div>

            <ModalText :nft="nft" />

            <ControlComments :hide-burn="true" :nft="nft" />
          </div>

          <ModalCommentList v-if="hasComments" :nft="nft" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import ModalTopUser from './ModalTopUser.vue';
import ModalTopDropdown from './ModalTopDropdown.vue';
import ModalCommentList from './ModalCommentList.vue';
import ControlComments from './ControlComments.vue';
import ModalText from './ModalText.vue';
import ModalImage from './ModalImage.vue';
import ModalVideo from './ModalVideo.vue';
import ModalAudio from './ModalAudio.vue';
import NftAccessControl from '~/components/shared/nft-access/NftAccessControl.vue';
import CommentCloseIcon from '~/components/icon/nft/CommentCloseIcon.vue';
import { ENftTransactionAccessType, ETypeNft, INft } from '~/types';

type TNft = INft;

@Component({
  components: {
    CommentCloseIcon,
    ControlComments,
    ModalText,
    ModalImage,
    ModalVideo,
    ModalAudio,
    ModalTopDropdown,
    ModalTopUser,
    ModalCommentList,
    NftAccessControl,
  },
})
export default class Modal extends Vue {
  ETypeNft = ETypeNft;

  @Prop({ required: true })
  readonly nft!: TNft;

  @Prop({ required: true })
  readonly decryptLoading!: boolean;

  get isEncrypted(): boolean {
    return this.nft.isEncrypted || false;
  }

  get accessType(): ENftTransactionAccessType {
    return this.nft.accessType || ENftTransactionAccessType.has_access;
  }

  get accessPrice(): number {
    return this.nft.accessPrice || 0;
  }

  get accessDuration(): number {
    return this.nft.accessDuration || 0;
  }

  $refs!: {
    modal: HTMLDivElement;
  };

  get hasComments(): boolean {
    return !!(this.nft.comments || []).length;
  }

  show() {
    ($(this.$refs.modal) as any).modal('show');
  }
}
</script>
