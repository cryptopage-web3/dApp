<template>
  <div
    id="profile-tabs3"
    class="tab-pane fade"
    role="tabpanel"
    aria-labelledby="profile-tabs3-tab"
  >
    <div class="transactions__empty">No reactions</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class AddressReactions extends Vue {
  @Prop({ required: true })
  readonly isActive!: boolean;
}
</script>
