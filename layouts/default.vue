<template>
  <div>
    <layout-notification />
    <layout-cookies />
    <layout-header />

    <nuxt />

    <layout-footer />
    <onboarding-modals />

    <client-only>
      <NftFormModal />
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import NftFormModal from '~/components/nft-form/modal/Modal.vue';

@Component({
  components: {
    NftFormModal,
  },
})
export default class DefaultLayout extends Vue {}
</script>
