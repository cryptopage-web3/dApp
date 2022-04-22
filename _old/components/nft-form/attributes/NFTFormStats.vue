<template>
  <div class="nft-form__attribute">
    <div class="nft-form__attribute-header" @click="toggle">
      <div
        ref="icon"
        class="nft-form__attribute-header-icon"
        title="Numerical traits that just show as numbers"
      >
        <font-awesome-icon :icon="['fas', 'chart-area']" />
      </div>
      <div class="nft-form__attribute-header-title">Stats</div>
      <div class="nft-form__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
    <div v-show="isShow" class="nft-form__attribute-container">
      <stat
        v-for="stat in localStats"
        :key="stat.id"
        :stat="stat"
        @remove="removeStat(stat.id)"
        @change="statChangeHandler(stat.id, $event)"
      />
      <div class="nft-form__stat nft-form__stat_add" @click="addStat">
        <font-awesome-icon :icon="['fas', 'plus-circle']" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'nuxt-property-decorator'
import { IAttributeStat, IAttributeStatFields } from '../types'
import NFTFormStat from './NFTFormStat.vue'

@Component({
  components: {
    stat: NFTFormStat
  }
})
export default class NFTFormStats extends Vue {
  isShow = false
  localStats: IAttributeStat[] = []

  $refs!: {
    icon: HTMLDivElement
  }

  @Prop({ type: Array, default: () => [] })
  readonly stats!: IAttributeStat[]

  // emit

  @Emit('change')
  emitChangeStats(stats: IAttributeStat[]) {
    return stats
  }

  // watch

  @Watch('stats', { immediate: true })
  onStatsChanged(stats: IAttributeStat[]) {
    if (JSON.stringify(stats) === JSON.stringify(this.localStats)) {
      return
    }

    this.localStats = stats
  }

  @Watch('localStats')
  onLocalStatsChanged(stats: IAttributeStat[]) {
    this.emitChangeStats(stats)
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

  addStat() {
    this.localStats.push({
      id: Number(new Date()),
      type: '',
      value: '',
      maxValue: ''
    })
  }

  removeStat(statId: number) {
    this.localStats = this.localStats.filter(({ id }) => id !== statId)
  }

  statChangeHandler(statId: number, data: IAttributeStatFields) {
    this.localStats = this.localStats.map((item) =>
      item.id === statId
        ? {
            ...item,
            type: data.type,
            value: data.value,
            maxValue: data.maxValue
          }
        : item
    )
  }
}
</script>
