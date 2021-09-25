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
    <div v-if="isShow" class="tweet-add__attribute-container">
      <property
        v-for="property in properties"
        :key="property.id"
        :property="property"
        @remove="removeProperty(property.id)"
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
  data() {
    return {
      isShow: false,
      properties: []
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    },

    addProperty() {
      this.properties.push({
        id: Number(new Date())
      })
    },

    removeProperty(propertyId) {
      this.properties = this.properties.filter(({ id }) => id !== propertyId)
    }
  }
}
</script>
