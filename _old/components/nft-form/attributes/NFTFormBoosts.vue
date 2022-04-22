<template>
  <div class="nft-form__attribute">
    <div class="nft-form__attribute-header" @click="toggle">
      <div
        ref="icon"
        class="nft-form__attribute-header-icon"
        title="Percentage traits that show as a progress bar"
      >
        <font-awesome-icon :icon="['fas', 'bolt']" />
      </div>
      <div class="nft-form__attribute-header-title">Boosts</div>
      <div class="nft-form__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
    <div v-show="isShow" class="nft-form__attribute-container">
      <boost
        v-for="boost in localBoosts"
        :key="boost.id"
        :boost="boost"
        @remove="removeBoost(boost.id)"
        @change="boostChangeHandler(boost.id, $event)"
      />
      <div class="nft-form__boost nft-form__boost_add" @click="addBoost">
        <font-awesome-icon :icon="['fas', 'plus-circle']" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'nuxt-property-decorator'
import { IAttributeBoost, IAttributeBoostFields } from '../types'
import NFTFormBoost from './NFTFormBoost.vue'
import { EAttributeDisplayType } from '~/logic/nft/types'

@Component({
  components: {
    boost: NFTFormBoost
  }
})
export default class NFTFormBoosts extends Vue {
  isShow = false
  localBoosts: IAttributeBoost[] = []

  $refs!: {
    icon: HTMLDivElement
  }

  @Prop({ type: Array, default: () => [] })
  readonly boosts!: IAttributeBoost[]

  // emit

  @Emit('change')
  emitChangeBoosts(boosts: IAttributeBoost[]) {
    return boosts
  }

  // watch

  @Watch('boosts', { immediate: true })
  onBoostsChanged(boosts: IAttributeBoost[]) {
    if (JSON.stringify(boosts) === JSON.stringify(this.localBoosts)) {
      return
    }

    this.localBoosts = boosts
  }

  @Watch('localBoosts')
  onLocalBoostsChanged(boosts: IAttributeBoost[]) {
    this.emitChangeBoosts(boosts)
  }

  mounted() {
    this.$nextTick(() => {
      ;($(this.$refs.icon) as any).tooltip({
        trigger: 'hover'
      })
    })
  }

  // methods

  toggle() {
    this.isShow = !this.isShow
  }

  hide() {
    this.isShow = false
  }

  show() {
    this.isShow = true
  }

  addBoost() {
    this.localBoosts.push({
      id: Number(new Date()),
      type: '',
      value: '',
      displayType: EAttributeDisplayType.boostPercentage
    })
  }

  removeBoost(boostId: number) {
    this.localBoosts = this.localBoosts.filter(({ id }) => id !== boostId)
  }

  boostChangeHandler(boostId: number, data: IAttributeBoostFields) {
    this.localBoosts = this.localBoosts.map((item) =>
      item.id === boostId
        ? {
            ...item,
            displayType: data.displayType,
            type: data.type,
            value: data.value
          }
        : item
    )
  }
}
</script>
