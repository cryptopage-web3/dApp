<template>
  <div class="nft-form__boost">
    <div class="nft-form__boost-remove" @click="$emit('remove')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>
    <div class="nft-form__boost-name">
      <input
        v-model="type"
        type="text"
        placeholder="Enter type"
        class="nft-form__boost-name-input"
      />
    </div>
    <div class="nft-form__boost-type">
      <select v-model="displayType" class="nft-form__boost-type-input">
        <option value="boost_percentage">Percentage</option>
        <option value="boost_number">Number</option>
      </select>
    </div>
    <div class="nft-form__boost-progress">
      <Progress
        :value="progress"
        :radius="30"
        :stroke-width="7"
        stroke-color="#2a91ff"
      >
        <div class="nft-form__boost-progress-content">
          <input
            v-model="value"
            type="text"
            placeholder="XX"
            class="nft-form__boost-progress-input"
          />
        </div>
      </Progress>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'nuxt-property-decorator'
import { IAttributeBoost, IAttributeBoostFields } from '../types'
import { EAttributeDisplayType } from '~/logic/nft/types'

@Component({})
export default class NFTFormBoost extends Vue {
  type = ''
  value = ''
  displayType: EAttributeDisplayType = EAttributeDisplayType.boostPercentage

  @Prop({ type: Object, default: () => ({}) })
  readonly boost!: IAttributeBoost

  get progress(): number {
    return Number(this.value) > 100 ? 100 : Number(this.value)
  }

  // emit

  @Emit('change')
  emitBoostChange(fields: IAttributeBoostFields) {
    return fields
  }

  // watch

  @Watch('boost', { immediate: true })
  onBoostChanged(boost: IAttributeBoost) {
    if (boost.type !== this.type) {
      this.type = boost.type || ''
    }

    if (boost.value !== this.value) {
      this.value = boost.value || ''
    }

    if (boost.displayType !== this.displayType) {
      this.displayType =
        boost.displayType || EAttributeDisplayType.boostPercentage
    }
  }

  @Watch('displayType')
  onDisplayTypeChanged(displayType: EAttributeDisplayType) {
    this.emitBoostChange({
      displayType,
      type: this.type,
      value: this.value
    })
  }

  @Watch('type')
  onTypeChanged(type: string) {
    this.emitBoostChange({
      type,
      value: this.value,
      displayType: this.displayType
    })
  }

  @Watch('value')
  onValueChanged(value: string) {
    this.emitBoostChange({
      value,
      type: this.type,
      displayType: this.displayType
    })
  }
}
</script>
