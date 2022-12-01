<template>
  <div
    id="profile-tabs3"
    class="tab-pane fade"
    role="tabpanel"
    aria-labelledby="profile-tabs3-tab"
  >
    <EmptyNfts is-reaction />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import EmptyNfts from '~/components/empty-nfts/EmptyNfts.vue';

@Component({
  components: {
    EmptyNfts,
  },
})
export default class AddressReactions extends Vue {
  @Prop({ required: true })
  readonly isActive!: boolean;
}
</script>
