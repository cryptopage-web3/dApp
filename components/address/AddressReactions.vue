<template>
  <div
    id="profile-tabs3"
    class="tab-pane fade"
    role="tabpanel"
    aria-labelledby="profile-tabs3-tab"
  >
    <EmptyNfts is-reaction @show-modal="showModal" />

    <client-only>
      <NftFormModal ref="modal" />
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import EmptyNfts from '~/components/empty-nfts/EmptyNfts.vue';
import NftFormModal from '~/components/nft-form/modal/Modal.vue';

@Component({
  components: {
    EmptyNfts,
  },
})
export default class AddressReactions extends Vue {
  @Prop({ required: true })
  readonly isActive!: boolean;

  $refs!: {
    modal: NftFormModal;
  };

  showModal() {
    this.$refs.modal.show();
  }
}
</script>
