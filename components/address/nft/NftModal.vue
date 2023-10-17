<template>
  <div
    ref="modal"
    class="modal fade modal-post"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-post-top">
            <NftModalTopUser :nft="nft" />

            <div class="modal-post-top-right">
              <NftModalTopDropdown :nft="nft" />

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
            <div
              v-if="nft.type !== ETypeNft.text && nft.contentUrl"
              class="profile-content__media"
            >
              <NftVideo v-if="nft.type === ETypeNft.video" :nft="nft" />
              <NftAudio v-else-if="nft.type === ETypeNft.audio" :nft="nft" />
              <NftImage v-else-if="nft.type === ETypeNft.image" :nft="nft" />
              <div v-else class="profile-content__image">
                <div class="profile-content__image-empty">
                  <NftTextIcon />
                </div>
              </div>

              <NftAccessControl
                :loading="decryptLoading"
                :is-encrypted="nft.isEncrypted"
                :access-duration="nft.accessDuration"
                :access-price="nft.accessPrice"
                :access-type="nft.accessType"
                :is-transparent="true"
                @check-access="$emit('check-access')"
                @decrypt="$emit('decrypt')"
                @unlock="$emit('unlock')"
              />
            </div>

            <NftText :nft="nft" />

            <NftComments :hide-burn="true" :nft="nft" />
          </div>

          <NftModalCommentList v-if="hasComments" :nft="nft" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { ETypeNft, INftTransaction } from '~/types';
import CommentCloseIcon from '~/components/icon/nft/CommentCloseIcon.vue';
import NftComments from '~/components/address/nft/NftComments.vue';
import NftText from '~/components/address/nft/NftText.vue';
import NftImage from '~/components/address/nft/NftImage.vue';
import NftVideo from '~/components/address/nft/NftVideo.vue';
import NftAudio from '~/components/address/nft/NftAudio.vue';
import NftAccessControl from '~/components/shared/nft-access/NftAccessControl.vue';
import NftModalTopUser from '~/components/address/nft/NftModalTopUser.vue';
import NftModalTopDropdown from '~/components/address/nft/NftModalTopDropdown.vue';
import NftModalCommentList from '~/components/address/nft/NftModalCommentList.vue';
import NftTextIcon from '~/components/icon/nft/NftTextIcon.vue';

type TNftTransaction = INftTransaction;

@Component({
  components: {
    CommentCloseIcon,
    NftComments,
    NftText,
    NftImage,
    NftVideo,
    NftAudio,
    NftModalTopDropdown,
    NftModalTopUser,
    NftModalCommentList,
    NftAccessControl,
    NftTextIcon,
  },
})
export default class NftModal extends Vue {
  ETypeNft = ETypeNft;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  @Prop({ required: true })
  readonly decryptLoading!: boolean;

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
