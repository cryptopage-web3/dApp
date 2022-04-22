<template>
  <div class="nft-form__attribute">
    <div class="nft-form__attribute-header" @click="toggle">
      <div
        ref="icon"
        class="nft-form__attribute-header-icon"
        title="Numerical traits that show as a progress bar"
      >
        <font-awesome-icon :icon="['fas', 'star']" />
      </div>
      <div class="nft-form__attribute-header-title">Levels</div>
      <div class="nft-form__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
    <div v-show="isShow" class="nft-form__attribute-container">
      <level
        v-for="level in localLevels"
        :key="level.id"
        :level="level"
        @remove="removeLevel(level.id)"
        @change="levelChangeHandler(level.id, $event)"
      />
      <div class="nft-form__level nft-form__level_add" @click="addLevel">
        <font-awesome-icon :icon="['fas', 'plus-circle']" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'nuxt-property-decorator'
import { IAttributeLevel, IAttributeLevelFields } from '../types'
import NFTFormLevel from './NFTFormLevel.vue'

@Component({
  components: {
    level: NFTFormLevel
  }
})
export default class NFTFormLevels extends Vue {
  isShow = false
  localLevels: IAttributeLevel[] = []

  $refs!: {
    icon: HTMLDivElement
  }

  @Prop({ type: Array, default: () => [] })
  readonly levels!: IAttributeLevel[]

  // emit

  @Emit('change')
  emitChangeLevels(levels: IAttributeLevel[]) {
    return levels
  }

  // watch

  @Watch('levels', { immediate: true })
  onLevelsChanged(levels: IAttributeLevel[]) {
    if (JSON.stringify(levels) === JSON.stringify(this.localLevels)) {
      return
    }

    this.localLevels = levels
  }

  @Watch('localLevels')
  onLocalLevelsChanged(levels: IAttributeLevel[]) {
    this.emitChangeLevels(levels)
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

  addLevel() {
    this.localLevels.push({
      id: Number(new Date()),
      type: '',
      value: '',
      maxValue: ''
    })
  }

  removeLevel(levelId: number) {
    this.localLevels = this.localLevels.filter(({ id }) => id !== levelId)
  }

  levelChangeHandler(levelId: number, data: IAttributeLevelFields) {
    this.localLevels = this.localLevels.map((item) =>
      item.id === levelId
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
