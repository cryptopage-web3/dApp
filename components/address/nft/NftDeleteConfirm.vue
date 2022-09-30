<template>
  <div
    ref="modal"
    class="modal fade modal-celar-history"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content nft-delete__modal-content">
        <div class="modal-body">
          <div class="modal-top mb_20">
            <div class="modal-creat__title">Delete post</div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <CommentCloseIcon />
            </button>
          </div>
          <div class="modal-celar-history__text">Are you sure?</div>
          <div class="modal-celar-history-btns mt_20">
            <a
              href="#"
              role="button"
              data-dismiss="modal"
              class="btn btn-blue-transparent_button btn_large w_110 mr_20"
            >
              No
            </a>
            <a
              href="#"
              role="button"
              class="btn btn-blue_button btn_large w_110"
              @click.prevent="deleteNft"
            >
              Yes
            </a>
          </div>
        </div>
        <div v-if="loading" class="nft-delete__loading">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import CommentCloseIcon from '~/components/icon/nft/CommentCloseIcon.vue';
import { INftTransaction } from '~/types';
import { Web3Service } from '~/services';
import { addressModule, authModule } from '~/store';
import { IDeleteNFTParams } from '~/types/nft-form';

type TNftTransaction = INftTransaction;

@Component({
  components: {
    CommentCloseIcon,
  },
})
export default class NftDeleteConfirm extends Vue {
  loading = false;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  $refs!: {
    modal: HTMLDivElement;
  };

  get addressChainName(): string {
    return addressModule.chainName;
  }

  get isSameChain(): boolean {
    return authModule.chainSlug === addressModule.chainSlug;
  }

  show() {
    ($(this.$refs.modal) as any).modal('show');
  }

  hide() {
    ($(this.$refs.modal) as any).modal('hide');
  }

  deleteNft() {
    if (!this.isSameChain) {
      this.$notify({
        type: 'error',
        title: `Need connect to ${this.addressChainName}`,
      });
      return;
    }

    this.loading = true;

    const deleteNFTParams: IDeleteNFTParams = {
      authChainSlug: authModule.chainSlug,
      authAddress: authModule.address,
      nftTokenId: this.nft.tokenId,
    };

    let txHash = '';
    const self = this;

    /** создаем web3 с провайдером авторизации */

    const web3Service = new Web3Service(authModule.provider);

    web3Service.burnPost({
      params: deleteNFTParams,
      callbacks: {
        onTransactionHash(hash: string) {
          txHash = hash;

          self.$notify({
            type: 'info',
            title: `${txHash}: Transaction on pending`,
          });
        },
        onReceipt() {
          self.$notify({
            type: 'success',
            title: 'Transaction completed',
          });

          self.loading = false;

          /** закрываем модалку и удаляем NFT из стора */

          self.hide();
        },
        onError() {
          self.$notify({
            type: 'error',
            title: 'Transaction has some error',
          });

          self.loading = false;
        },
      },
    });
  }
}
</script>
