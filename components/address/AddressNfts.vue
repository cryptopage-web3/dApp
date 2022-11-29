<template>
  <div
    id="profile-tabs1"
    class="tab-pane fade show active"
    role="tabpanel"
    aria-labelledby="profile-tabs1-tab"
  >
    <Loader v-if="newNftLoading" />
    <Nft v-for="nft in nfts" :key="uniqueKey(nft)" :nft="nft" />
    <Loader v-if="$fetchState.pending || initLoading" />
    <div v-else-if="!nfts.length" class="transactions__empty-block">
      <div class="global-text mb_30 text-center">
        There is not a single NFT on
        {{ isOwner ? 'your' : 'user' }} address<br />
        you can {{ isOwner ? 'create' : 'send' }} it here
      </div>
      <div class="text-center">
        <a
          href="#"
          class="btn-blue_button btn_large"
          @click.prevent="showModal"
        >
          + {{ isOwner ? 'Create' : 'Send' }} NFT
        </a>
      </div>
    </div>

    <client-only>
      <NftFormModal ref="modal" />
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import Loader from '~/components/loaders/GrowLoader.vue';
import Nft from '~/components/address/nft/Nft.vue';
import NftFormModal from '~/components/nft-form/modal/Modal.vue';
import {
  addressModule,
  authModule,
  nftFormModule,
  stickyModule,
} from '~/store';
import { INftTransaction } from '~/types';
import { getNftTransactionUniqueKey } from '~/utils/array';

@Component({
  components: {
    Loader,
    Nft,
    NftFormModal,
  },
})
export default class AddressNfts extends Vue {
  initLoading = true;

  $refs!: {
    modal: NftFormModal;
  };

  @Prop({ required: true })
  readonly isActive!: boolean;

  scrollListener: null | (() => void) = null;

  get nfts(): INftTransaction[] {
    return addressModule.nftTransactions.nfts;
  }

  get hasAllPages(): boolean {
    return addressModule.nftTransactions.hasAllPages;
  }

  get newNftLoading(): boolean {
    return addressModule.syncNftTransactionsLoading;
  }

  get isFetchDisabled(): boolean {
    return Boolean(
      !this.isActive ||
        this.hasAllPages ||
        this.$fetchState.pending ||
        this.$fetchState.error,
    );
  }

  get isOwner(): boolean {
    return (
      authModule.address.toLowerCase() === addressModule.address.toLowerCase()
    );
  }

  get isAuth(): boolean {
    return authModule.isAuth;
  }

  get isSameChain(): boolean {
    return authModule.chainSlug === addressModule.chainSlug;
  }

  get authChainName(): string {
    return authModule.chainName;
  }

  get addressChainName(): string {
    return addressModule.chainName;
  }

  get txHash(): string | null {
    return nftFormModule.txHash;
  }

  @Watch('nfts')
  onNftsChanged() {
    stickyModule.update();
  }

  @Watch('isActive')
  onIsActiveChanged() {
    this.$fetch();
  }

  @Watch('txHash')
  onTxHashChanged(txHash: string | null) {
    if (!txHash) {
      return;
    }

    setTimeout(() => {
      this.$refs.modal.hide();
    }, 10);
  }

  // lifecycle hooks

  mounted() {
    /** делаем запрос при монтировании,
     * т.к. isActive = true по умолчанию и @Watch не отработает
     */
    this.initLoading = false;
    this.next();

    this.$nextTick(() => {
      this.scrollListener = this.scrollHandler.bind(this);
      $(window).on('scroll', this.scrollListener);
    });
  }

  beforeDestroy() {
    if (!this.scrollListener) {
      return;
    }

    $(window).off('scroll', this.scrollListener);
    this.scrollListener = null;
  }

  // methods

  next() {
    /** нельзя вызвать $fetch, если уже получили полный список транзакций,
     * либо текущий статус запроса pending или error */
    if (this.isFetchDisabled) return;

    this.$fetch();
  }

  scrollHandler() {
    /** пагинатор только для транзакций,
     * если доскролили до низа блока транзакций, то делаем запрос на следующую страницу
     */
    const windowHeight = Number($(window).height());
    const windowScrollTop = Number($(window).scrollTop());
    const elemOffsetTop = Number($('#profile-tabs1').offset()?.top);
    const elemHeight = Number($('#profile-tabs1').height());

    if (windowScrollTop + windowHeight > elemOffsetTop + elemHeight) {
      this.next();
    }
  }

  async fetch() {
    /** не делаем запрос:
     * если вкладка не активна
     * если уже получен полный список транзакций,
     */
    if (!this.isActive || this.hasAllPages || process.server) {
      return;
    }

    await addressModule.fetchNftTransactions();
  }

  uniqueKey(nft: INftTransaction) {
    return nft ? getNftTransactionUniqueKey(nft) : '_';
  }

  validateCreateNFT() {
    if (!this.isAuth) {
      this.$notify({
        type: 'error',
        title: 'Need to connect a wallet to create NFTs',
      });

      return false;
    }

    if (!this.isSameChain) {
      this.$notify({
        type: 'error',
        title: `Active chain - ${this.authChainName}<br>
          You are trying ${
            this.isOwner ? 'create' : 'send'
          } nft to account with chain ${this.addressChainName}<br>
          Please connect to ${this.addressChainName}
        `,
      });

      return false;
    }

    return true;
  }

  showModal() {
    if (!this.validateCreateNFT()) {
      return;
    }

    this.$refs.modal.show();
  }
}
</script>
