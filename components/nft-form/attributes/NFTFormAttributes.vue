<template>
  <div class="tweet-add__attributes">
    <div class="tweet-add__attributes-toggle" @click="toggle">
      <div class="tweet-add__attributes-toggle-icon">
        <font-awesome-icon
          :icon="['fas', isShow ? 'caret-up' : 'caret-down']"
        />
      </div>
      <div class="tweet-add__attributes-toggle-text">Extended fields</div>
    </div>
    <div v-show="isShow" class="tweet-add__attributes-container">
      <properties-attribute
        :properties="properties"
        @change="propertiesChangeHandler"
      />
      <stats-attribute :stats="stats" @change="statsChangeHandler" />
      <levels-attribute :levels="levels" @change="levelsChangeHandler" />
      <dates-attribute />
      <boosts-attribute :boosts="boosts" @change="boostsChangeHandler" />
    </div>
  </div>
</template>
<script>
export default {
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
      await import('@/components/nft-form/attributes/NFTFormBoosts.vue')
  },
  props: {
    attributes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isShow: false,
      properties: [],
      levels: [],
      stats: [],
      boosts: []
    }
  },
  watch: {
    attributes: {
      handler(attributes) {
        const newProperties = attributes.properties || []
        const newLevels = attributes.levels || []
        const newStats = attributes.stats || []
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

        if (JSON.stringify(newBoosts) !== JSON.stringify(this.boosts)) {
          this.boosts = newBoosts
        }
      },
      immediate: true
    },

    properties(properties) {
      this.$emit('change', {
        ...this.attributes,
        properties
      })
    },

    levels(levels) {
      this.$emit('change', {
        ...this.attributes,
        levels
      })
    },

    stats(stats) {
      this.$emit('change', {
        ...this.attributes,
        stats
      })
    },

    boosts(boosts) {
      this.$emit('change', {
        ...this.attributes,
        boosts
      })
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    },

    hide() {
      this.isShow = false
    },

    propertiesChangeHandler(properties) {
      this.properties = properties
    },

    levelsChangeHandler(levels) {
      this.levels = levels
    },

    statsChangeHandler(stats) {
      this.stats = stats
    },

    boostsChangeHandler(boosts) {
      this.boosts = boosts
    }
  }
}
</script>
