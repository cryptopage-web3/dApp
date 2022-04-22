<template>
  <div class="nft-form__property">
    <div class="nft-form__property-remove" @click="$emit('remove')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>
    <div class="nft-form__property-field">
      <input
        v-model="type"
        type="text"
        placeholder="Enter type"
        class="nft-form__property-input nft-form__property-input_type"
      />
    </div>
    <div class="nft-form__property-field">
      <input
        v-model="value"
        type="text"
        placeholder="Enter value"
        class="nft-form__property-input nft-form__property-input_value"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'nuxt-property-decorator'
import { IAttributeProperty, IAttributePropertyFields } from '../types'

@Component({})
export default class NFTFormProperty extends Vue {
  type = ''
  value = ''

  @Prop({ type: Object, default: () => ({}) })
  readonly property!: IAttributeProperty

  // emit

  @Emit('change')
  emitPropertyChange(fields: IAttributePropertyFields) {
    return fields
  }

  // watch

  @Watch('property', { immediate: true })
  onPropertyChanged(property: IAttributeProperty) {
    if (property.type !== this.type) {
      this.type = property.type || ''
    }

    if (property.value !== this.value) {
      this.value = property.value || ''
    }
  }

  @Watch('type')
  onTypeChanged(type: string) {
    this.emitPropertyChange({
      type,
      value: this.value
    })
  }

  @Watch('value')
  onValueChanged(value: string) {
    this.emitPropertyChange({
      value,
      type: this.type
    })
  }
}
</script>
