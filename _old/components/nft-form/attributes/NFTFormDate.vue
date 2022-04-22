<template>
  <div class="nft-form__date">
    <div class="nft-form__date-remove" @click="$emit('remove')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>
    <div class="nft-form__date-fields">
      <div class="nft-form__date-type">
        <input
          v-model="type"
          type="text"
          placeholder="Enter dates name"
          class="nft-form__date-input nft-form__date-input_type"
        />
      </div>
      <div class="nft-form__date-value">
        <date-picker
          v-model="value"
          value-type="format"
          placeholder="YYYY-MM-DD"
        ></date-picker>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import DatePicker from 'vue2-datepicker'
import { Component, Emit, Prop, Watch } from 'nuxt-property-decorator'
import { IAttributeDate, IAttributeDateFields } from '../types'

@Component({
  components: {
    DatePicker
  }
})
export default class NFTFormDate extends Vue {
  type = ''
  value = ''

  @Prop({ type: Object, default: () => ({}) })
  readonly date!: IAttributeDate

  // emit

  @Emit('change')
  emitDateChange(fields: IAttributeDateFields) {
    return fields
  }

  // watch

  @Watch('date', { immediate: true })
  onDateChanged(date: IAttributeDate) {
    if (date.type !== this.type) {
      this.type = date.type || ''
    }

    if (date.value !== this.value) {
      this.value = date.value || ''
    }
  }

  @Watch('type')
  onTypeChanged(type: string) {
    this.emitDateChange({
      type,
      value: this.value
    })
  }

  @Watch('value')
  onValueChanged(value: string) {
    this.emitDateChange({
      value,
      type: this.type
    })
  }
}
</script>
