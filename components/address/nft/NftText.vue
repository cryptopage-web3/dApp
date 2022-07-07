<template>
  <div
    v-if="description || title"
    class="profile-content__text"
    @click.prevent="$emit('show-modal')"
  >
    <div v-if="title" class="profile-content__title">
      {{ title }}
    </div>
    <div v-if="description" class="profile-content__desc">
      {{ description }}
      <span v-if="isLongDescription" @click.prevent.stop="switchFull">
        {{ showFull ? 'hide' : 'show more' }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INftTransaction } from '~/types';

type TNftTransaction = INftTransaction;

@Component({})
export default class NftText extends Vue {
  showFull = false;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  get isLongDescription(): boolean {
    return this.nft.description.length > 250;
  }

  get shortDescription(): string {
    return this.isLongDescription
      ? this.nft.description.slice(0, 200) + '...'
      : this.nft.description;
  }

  get description(): string {
    return this.showFull ? this.nft.description : this.shortDescription;
  }

  get title(): string {
    return this.nft.name;
  }

  switchFull() {
    this.showFull = !this.showFull;
  }
}
</script>
