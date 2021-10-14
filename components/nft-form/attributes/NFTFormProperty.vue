<template>
  <div class="tweet-add__property">
    <div class="tweet-add__property-remove" @click="$emit('remove')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>
    <div class="tweet-add__property-field">
      <input
        v-model="type"
        type="text"
        placeholder="Enter type"
        class="tweet-add__property-input tweet-add__property-input_type"
      />
    </div>
    <div class="tweet-add__property-field">
      <input
        v-model="value"
        type="text"
        placeholder="Enter value"
        class="tweet-add__property-input tweet-add__property-input_value"
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
