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
      <stats-attribute />
      <levels-attribute :levels="levels" @change="levelsChangeHandler" />
      <dates-attribute />
      <boosts-attribute />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    'properties-attribute': async () =>
      await import('@/components/tweet/attributes/TweetAddFormProperties.vue'),
    'stats-attribute': async () =>
      await import('@/components/tweet/attributes/TweetAddFormStats.vue'),
    'levels-attribute': async () =>
      await import('@/components/tweet/attributes/TweetAddFormLevels.vue'),
    'dates-attribute': async () =>
      await import('@/components/tweet/attributes/TweetAddFormDates.vue'),
    'boosts-attribute': async () =>
      await import('@/components/tweet/attributes/TweetAddFormBoosts.vue')
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
      levels: []
    }
  },
  watch: {
    attributes: {
      handler(attributes) {
        const newProperties = attributes.properties || []
        const newLevels = attributes.levels || []

        if (JSON.stringify(newProperties) !== JSON.stringify(this.properties)) {
          this.properties = newProperties
        }

        if (JSON.stringify(newLevels) !== JSON.stringify(this.levels)) {
          this.levels = newLevels
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
    }
  }
}
</script>
