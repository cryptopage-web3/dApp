<template>
  <div class="nft-form__stat">
    <div class="nft-form__stat-remove" @click="$emit('remove')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>
    <div class="nft-form__stat-fields">
      <div class="nft-form__stat-type">
        <input
          v-model="type"
          type="text"
          placeholder="Enter stats name"
          class="nft-form__stat-input nft-form__stat-input_type"
        />
      </div>
      <div class="nft-form__stat-values">
        <div class="nft-form__stat-value">
          <input
            v-model="value"
            type="text"
            placeholder="value"
            class="nft-form__stat-input nft-form__stat-input_value"
          />
        </div>
        <div class="nft-form__stat-delimiter">of</div>
        <div class="nft-form__stat-value">
          <input
            v-model="maxValue"
            type="text"
            placeholder="max value"
            class="nft-form__stat-input nft-form__stat-input_value"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'nuxt-property-decorator'
import { IAttributeStat, IAttributeStatFields } from '../types'

@Component({})
export default class NFTFormStat extends Vue {
  type = ''
  value = ''
  maxValue = ''

  @Prop({ type: Object, default: () => ({}) })
  readonly stat!: IAttributeStat

  // emit

  @Emit('change')
  emitStatChange(fields: IAttributeStatFields) {
    return fields
  }

  // watch

  @Watch('stat', { immediate: true })
  onStatChanged(stat: IAttributeStat) {
    if (stat.type !== this.type) {
      this.type = stat.type || ''
    }

    if (stat.value !== this.value) {
      this.value = stat.value || ''
    }

    if (stat.maxValue !== this.maxValue) {
      this.maxValue = stat.maxValue || ''
    }
  }

  @Watch('type')
  onTypeChanged(type: string) {
    this.emitStatChange({
      type,
      value: this.value,
      maxValue: this.maxValue
    })
  }

  @Watch('value')
  onValueChanged(value: string) {
    this.emitStatChange({
      value,
      type: this.type,
      maxValue: this.maxValue
    })
  }

  @Watch('maxValue')
  onMaxValueChanged(maxValue: string) {
    this.emitStatChange({
      maxValue,
      type: this.type,
      value: this.value
    })
  }
}
</script>
