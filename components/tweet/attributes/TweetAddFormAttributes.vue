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
      <levels-attribute />
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
      properties: []
    }
  },
  watch: {
    attributes: {
      handler(attributes) {
        const newValue = attributes.properties || []

        if (JSON.stringify(newValue) === JSON.stringify(this.properties)) {
          return
        }

        this.properties = attributes.properties || []
      },
      immediate: true
    },

    properties(properties) {
      this.$emit('change', {
        ...this.attributes,
        properties
      })
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    },

    propertiesChangeHandler(properties) {
      this.properties = properties
    }
  }
}
</script>
