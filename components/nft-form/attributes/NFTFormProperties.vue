<template>
  <div class="nft-form__attribute">
    <div class="nft-form__attribute-header" @click="toggle">
      <div
        ref="icon"
        class="nft-form__attribute-header-icon"
        title="Textual traits that show up as rectangles"
      >
        <font-awesome-icon :icon="['fas', 'tag']" />
      </div>
      <div class="nft-form__attribute-header-title">Properties</div>
      <div class="nft-form__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
    <div v-show="isShow" class="nft-form__attribute-container">
      <property
        v-for="property in localProperties"
        :key="property.id"
        :property="property"
        @remove="removeProperty(property.id)"
        @change="propertyChangeHandler(property.id, $event)"
      />
      <div
        class="nft-form__property nft-form__property_add"
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
      await import('@/components/nft-form/attributes/NFTFormProperty.vue')
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
  mounted() {
    this.$nextTick(() => {
      $(this.$refs.icon).tooltip({
        trigger: 'hover'
      })
    })
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
