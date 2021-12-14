<template>
  <div ref="attributes" class="nft-form__attributes">
    <properties-attribute
      ref="properties"
      :properties="properties"
      @change="propertiesChangeHandler"
    />
    <stats-attribute ref="stats" :stats="stats" @change="statsChangeHandler" />
    <levels-attribute
      ref="levels"
      :levels="levels"
      @change="levelsChangeHandler"
    />
    <dates-attribute ref="dates" :dates="dates" @change="datesChangeHandler" />
    <boosts-attribute
      ref="boosts"
      :boosts="boosts"
      @change="boostsChangeHandler"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'nuxt-property-decorator'
import {
  IAttributeBoost,
  IAttributeDate,
  IAttributeLevel,
  IAttributeProperty,
  IAttributesFront,
  IAttributeStat
} from '../types'
import NFTFormProperties from './NFTFormProperties.vue'
import NFTFormStats from './NFTFormStats.vue'
import NFTFormLevels from './NFTFormLevels.vue'
import NFTFormDates from './NFTFormDates.vue'
import NFTFormBoosts from './NFTFormBoosts.vue'

@Component({
  components: {
    'properties-attribute': NFTFormProperties,
    'stats-attribute': NFTFormStats,
    'levels-attribute': NFTFormLevels,
    'dates-attribute': NFTFormDates,
    'boosts-attribute': NFTFormBoosts
  }
})
export default class NFTFormAttributes extends Vue {
  isShown = false
  properties: IAttributeProperty[] = []
  levels: IAttributeLevel[] = []
  stats: IAttributeStat[] = []
  dates: IAttributeDate[] = []
  boosts: IAttributeBoost[] = []

  $refs!: {
    attributes: HTMLDivElement
    properties: NFTFormProperties
    stats: NFTFormStats
    levels: NFTFormLevels
    dates: NFTFormDates
    boosts: NFTFormBoosts
  }

  @Prop({ type: Object, default: () => ({}) })
  readonly attributes!: IAttributesFront

  // emit

  @Emit('change')
  emitChangeAttributes(attributes: IAttributesFront) {
    return attributes
  }

  // watch

  @Watch('isShown')
  onIsShownChanged(isShown: boolean) {
    if (isShown) {
      $(this.$refs.attributes).slideDown(200)
    } else {
      $(this.$refs.attributes).slideUp(100)
    }
  }

  @Watch('attributes', { immediate: true })
  onAttributesChanged(attributes: IAttributesFront) {
    const newProperties = attributes.properties || []
    const newLevels = attributes.levels || []
    const newStats = attributes.stats || []
    const newDates = attributes.dates || []
    const newBoosts = attributes.boosts || []

    if (JSON.stringify(newProperties) !== JSON.stringify(this.properties)) {
      this.properties = newProperties
    }

    if (JSON.stringify(newLevels) !== JSON.stringify(this.levels)) {
      this.levels = newLevels
    }

    if (JSON.stringify(newStats) !== JSON.stringify(this.stats)) {
      this.stats = newStats
    }

    if (JSON.stringify(newDates) !== JSON.stringify(this.dates)) {
      this.dates = newDates
    }

    if (JSON.stringify(newBoosts) !== JSON.stringify(this.boosts)) {
      this.boosts = newBoosts
    }
  }

  @Watch('properties')
  onPropertiesChanged(properties: IAttributeProperty[]) {
    this.emitChangeAttributes({
      ...this.attributes,
      properties
    })
  }

  @Watch('levels')
  onLevelsChanged(levels: IAttributeLevel[]) {
    this.emitChangeAttributes({
      ...this.attributes,
      levels
    })
  }

  @Watch('stats')
  onStatsChanged(stats: IAttributeStat[]) {
    this.emitChangeAttributes({
      ...this.attributes,
      stats
    })
  }

  @Watch('dates')
  onDatesChanged(dates: IAttributeDate[]) {
    this.emitChangeAttributes({
      ...this.attributes,
      dates
    })
  }

  @Watch('boosts')
  onBoostsChanged(boosts: IAttributeBoost[]) {
    this.emitChangeAttributes({
      ...this.attributes,
      boosts
    })
  }

  // methods

  toggle() {
    this.isShown = !this.isShown
  }

  hide() {
    this.isShown = false
  }

  show() {
    this.isShown = true
  }

  hideAll() {
    this.hide()
    this.$refs.properties.hide()
    this.$refs.stats.hide()
    this.$refs.levels.hide()
    this.$refs.dates.hide()
    this.$refs.boosts.hide()
  }

  propertiesChangeHandler(properties: IAttributeProperty[]) {
    this.properties = properties
  }

  levelsChangeHandler(levels: IAttributeLevel[]) {
    this.levels = levels
  }

  statsChangeHandler(stats: IAttributeStat[]) {
    this.stats = stats
  }

  datesChangeHandler(dates: IAttributeDate[]) {
    this.dates = dates
  }

  boostsChangeHandler(boosts: IAttributeBoost[]) {
    this.boosts = boosts
  }
}
</script>
