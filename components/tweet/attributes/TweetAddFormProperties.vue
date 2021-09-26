<template>
  <div class="tweet-add__attribute">
    <div class="tweet-add__attribute-header" @click="toggle">
      <div class="tweet-add__attribute-header-icon">
        <font-awesome-icon :icon="['fas', 'tag']" />
      </div>
      <div class="tweet-add__attribute-header-title">Properties</div>
      <div class="tweet-add__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
    <div v-show="isShow" class="tweet-add__attribute-container">
      <property
        v-for="property in localProperties"
        :key="property.id"
        :property="property"
        @remove="removeProperty(property.id)"
        @change="propertyChangeHandler(property.id, $event)"
      />
      <div
        class="tweet-add__property tweet-add__property_add"
        @click="addProperty"
      >
        <font-awesome-icon :icon="['fas', 'plus-circle']" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    property: async () =>
      await import('@/components/tweet/attributes/TweetAddFormProperty.vue')
  },
  props: {
    properties: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: false,
      localProperties: []
    }
  },
  watch: {
    properties: {
      handler(properties) {
        if (
          JSON.stringify(properties) === JSON.stringify(this.localProperties)
        ) {
          return
        }

        this.localProperties = properties
      },
      immediate: true
    },

    localProperties(properties) {
      this.$emit('change', properties)
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    },

    addProperty() {
      this.localProperties.push({
        id: Number(new Date())
      })
    },

    removeProperty(propertyId) {
      this.localProperties = this.localProperties.filter(
        ({ id }) => id !== propertyId
      )
    },

    propertyChangeHandler(propertyId, data) {
      this.localProperties = this.localProperties.map((item) =>
        item.id === propertyId
          ? {
              ...item,
              type: data.type,
              value: data.value
            }
          : item
      )
    }
  }
}
</script>
