<template>
  <div ref="attributes" class="nft-form__attributes">
    <comment-attribute v-model="hasComment" />
    <properties-attribute
      :properties="properties"
      @change="propertiesChangeHandler"
    />
    <stats-attribute :stats="stats" @change="statsChangeHandler" />
    <levels-attribute :levels="levels" @change="levelsChangeHandler" />
    <dates-attribute :dates="dates" @change="datesChangeHandler" />
    <boosts-attribute :boosts="boosts" @change="boostsChangeHandler" />
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

@Component({
  components: {
    'properties-attribute': async () =>
      await import('@/components/nft-form/attributes/NFTFormProperties.vue'),
    'stats-attribute': async () =>
      await import('@/components/nft-form/attributes/NFTFormStats.vue'),
    'levels-attribute': async () =>
      await import('@/components/nft-form/attributes/NFTFormLevels.vue'),
    'dates-attribute': async () =>
      await import('@/components/nft-form/attributes/NFTFormDates.vue'),
    'boosts-attribute': async () =>
      await import('@/components/nft-form/attributes/NFTFormBoosts.vue'),
    'comment-attribute': async () =>
      await import('@/components/nft-form/attributes/NFTFormComment.vue')
  }
})
export default class NFTFormAttributes extends Vue {
  isShown = false
  hasComment = false
  properties: IAttributeProperty[] = []
  levels: IAttributeLevel[] = []
  stats: IAttributeStat[] = []
  dates: IAttributeDate[] = []
  boosts: IAttributeBoost[] = []

  $refs!: {
    attributes: HTMLDivElement
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
    const hasComment = attributes.hasComment || false

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

    if (hasComment !== this.hasComment) {
      this.hasComment = hasComment
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

  @Watch('hasComment')
  onHasCommentChanged(hasComment: boolean) {
    this.emitChangeAttributes({
      ...this.attributes,
      hasComment
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
