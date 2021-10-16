<template>
  <div class="nft-form__property">
    <div class="nft-form__property-remove" @click="$emit('remove')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>
    <div class="nft-form__property-field">
      <input
        v-model="type"
        type="text"
        placeholder="Enter type"
        class="nft-form__property-input nft-form__property-input_type"
      />
    </div>
    <div class="nft-form__property-field">
      <input
        v-model="value"
        type="text"
        placeholder="Enter value"
        class="nft-form__property-input nft-form__property-input_value"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    property: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      type: '',
      value: ''
    }
  },
  watch: {
    property: {
      handler(property) {
        if (property.type !== this.type) {
          this.type = property.type || ''
        }

        if (property.value !== this.value) {
          this.value = property.value || ''
        }
      },
      immediate: true
    },

    type(type) {
      this.$emit('change', {
        type,
        value: this.value
      })
    },

    value(value) {
      this.$emit('change', {
        value,
        type: this.type
      })
    }
  }
}
</script>
