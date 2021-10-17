<template>
  <div ref="attributes" class="nft-form__attributes">
    <comment-attribute v-model="hasComment" />
    <properties-attribute
      :properties="properties"
      @change="propertiesChangeHandler"
    />
    <stats-attribute :stats="stats" @change="statsChangeHandler" />
    <levels-attribute :levels="levels" @change="levelsChangeHandler" />
    <dates-attribute />
    <boosts-attribute :boosts="boosts" @change="boostsChangeHandler" />
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
      await import('@/components/nft-form/attributes/NFTFormBoosts.vue'),
    'comment-attribute': async () =>
      await import('@/components/nft-form/attributes/NFTFormComment.vue')
  },
  props: {
    attributes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isShown: false,
      hasComment: false,
      properties: [],
      levels: [],
      stats: [],
      boosts: []
    }
  },
  watch: {
    isShown(isShown) {
      if (isShown) {
        $(this.$refs.attributes).slideDown(200)
      } else {
        $(this.$refs.attributes).slideUp(100)
      }
    },

    attributes: {
      handler(attributes) {
        const newProperties = attributes.properties || []
        const newLevels = attributes.levels || []
        const newStats = attributes.stats || []
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

        if (JSON.stringify(newBoosts) !== JSON.stringify(this.boosts)) {
          this.boosts = newBoosts
        }

        if (hasComment !== this.hasComment) {
          this.hasComment = hasComment
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
    },

    hasComment(hasComment) {
      this.$emit('change', {
        ...this.attributes,
        hasComment
      })
    }
  },
  methods: {
    toggle() {
      this.isShown = !this.isShown
    },

    hide() {
      this.isShown = false
    },

    show() {
      this.isShown = true
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
