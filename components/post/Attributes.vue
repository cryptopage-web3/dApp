<template>
  <div ref="root" class="post-attributes">
    <div
      v-if="propertiesCount"
      class="post-attributes__item"
      :title="`Properties: ${propertiesCount}`"
    >
      <div class="post-attributes__item-icon">
        <font-awesome-icon :icon="['fas', 'tag']" />
      </div>
      <div class="post-attributes__item-count">
        {{ propertiesCount }}
      </div>
    </div>
    <div
      v-if="statsCount"
      class="post-attributes__item"
      :title="`Stats: ${statsCount}`"
    >
      <div class="post-attributes__item-icon">
        <font-awesome-icon :icon="['fas', 'chart-area']" />
      </div>
      <div class="post-attributes__item-count">
        {{ statsCount }}
      </div>
    </div>
    <div
      v-if="levelsCount"
      class="post-attributes__item"
      :title="`Levels: ${levelsCount}`"
    >
      <div class="post-attributes__item-icon">
        <font-awesome-icon :icon="['fas', 'star']" />
      </div>
      <div class="post-attributes__item-count">
        {{ levelsCount }}
      </div>
    </div>
    <div
      v-if="datesCount"
      class="post-attributes__item"
      :title="`Dates: ${datesCount}`"
    >
      <div class="post-attributes__item-icon">
        <font-awesome-icon :icon="['fas', 'calendar']" />
      </div>
      <div class="post-attributes__item-count">
        {{ datesCount }}
      </div>
    </div>
    <div
      v-if="boostsCount"
      class="post-attributes__item"
      :title="`Boosts: ${boostsCount}`"
    >
      <div class="post-attributes__item-icon">
        <font-awesome-icon :icon="['fas', 'bolt']" />
      </div>
      <div class="post-attributes__item-count">
        {{ boostsCount }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { NFTAttributesType } from '~/logic/nft/types'

@Component({})
export default class Attributes extends Vue {
  @Prop({ required: true }) readonly attributes?: NFTAttributesType

  $refs!: {
    root: HTMLDivElement
  }

  get propertiesCount(): number {
    return Number(this.attributes?.properties.length)
  }

  get statsCount(): number {
    return Number(this.attributes?.stats.length)
  }

  get levelsCount(): number {
    return Number(this.attributes?.levels.length)
  }

  get datesCount(): number {
    return Number(this.attributes?.dates.length)
  }

  get boostsCount(): number {
    return Number(this.attributes?.boosts.length)
  }

  mounted() {
    this.$nextTick(() => {
      ;($(this.$refs.root) as any).find('.post-attributes__item').tooltip({
        trigger: 'hover'
      })
    })
  }
}
</script>
