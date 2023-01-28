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
            <ModalVideo v-if="nft.type === ETypeNft.video" :nft="nft" />
            <ModalAudio v-else-if="nft.type === ETypeNft.audio" :nft="nft" />
            <ModalImage v-else-if="nft.type === ETypeNft.image" :nft="nft" />

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
import CommentCloseIcon from '~/components/icon/nft/CommentCloseIcon.vue';
import { ETypeNft, INft } from '~/types';

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
  },
})
export default class Modal extends Vue {
  ETypeNft = ETypeNft;

  @Prop({ required: true })
  readonly nft!: TNft;

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
