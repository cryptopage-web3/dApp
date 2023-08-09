<template>
  <div
    class="profile-content__desc"
    :class="{ 'profile-content__desc_mt': hasMargin }"
  >
    {{ description }}
    <span v-if="isLongDescription" @click.prevent.stop="switchFull">
      {{ showFull ? 'hide' : 'show more' }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class NftTextDescription extends Vue {
  showFull = false;

  @Prop({ required: true })
  readonly text!: string;

  @Prop({ required: true })
  readonly hasMargin!: boolean;

  get originDescription(): string {
    return this.text || '';
  }

  get isLongDescription(): boolean {
    return this.originDescription.length > 250;
  }

  get shortDescription(): string {
    return this.isLongDescription
      ? this.originDescription.slice(0, 200) + '...'
      : this.originDescription;
  }

  get description(): string {
    return this.showFull ? this.originDescription : this.shortDescription;
  }

  switchFull() {
    this.showFull = !this.showFull;
  }
}
</script>
