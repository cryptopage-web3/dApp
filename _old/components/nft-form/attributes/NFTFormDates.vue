<template>
  <div class="nft-form__attribute">
    <div class="nft-form__attribute-header" @click="toggle">
      <div
        ref="icon"
        class="nft-form__attribute-header-icon"
        title="Traits with date"
      >
        <font-awesome-icon :icon="['fas', 'calendar']" />
      </div>
      <div class="nft-form__attribute-header-title">Dates</div>
      <div class="nft-form__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
    <div v-show="isShow" class="nft-form__attribute-container">
      <date
        v-for="date in localDates"
        :key="date.id"
        :date="date"
        @remove="removeDate(date.id)"
        @change="dateChangeHandler(date.id, $event)"
      />
      <div class="nft-form__date nft-form__date_add" @click="addDate">
        <font-awesome-icon :icon="['fas', 'plus-circle']" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'nuxt-property-decorator'
import { IAttributeDate, IAttributeDateFields } from '../types'
import NFTFormDate from './NFTFormDate.vue'

@Component({
  components: {
    date: NFTFormDate
  }
})
export default class NFTFormDates extends Vue {
  isShow = false
  localDates: IAttributeDate[] = []

  $refs!: {
    icon: HTMLDivElement
  }

  @Prop({ type: Array, default: () => [] })
  readonly dates!: IAttributeDate[]

  // emit

  @Emit('change')
  emitChangeDates(dates: IAttributeDate[]) {
    return dates
  }

  // watch

  @Watch('dates', { immediate: true })
  onDatesChanged(dates: IAttributeDate[]) {
    if (JSON.stringify(dates) === JSON.stringify(this.localDates)) {
      return
    }

    this.localDates = dates
  }

  @Watch('localDates')
  onLocalDatesChanged(dates: IAttributeDate[]) {
    this.emitChangeDates(dates)
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

  addDate() {
    this.localDates.push({
      id: Number(new Date()),
      type: '',
      value: ''
    })
  }

  removeDate(dateId: number) {
    this.localDates = this.localDates.filter(({ id }) => id !== dateId)
  }

  dateChangeHandler(dateId: number, data: IAttributeDateFields) {
    this.localDates = this.localDates.map((item) =>
      item.id === dateId
        ? {
            ...item,
            type: data.type,
            value: data.value
          }
        : item
    )
  }
}
</script>
