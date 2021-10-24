<template>
  <div class="nft-form__date">
    <div class="nft-form__date-remove" @click="$emit('remove')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>
    <div class="nft-form__date-fields">
      <div class="nft-form__date-type">
        <input
          v-model="type"
          type="text"
          placeholder="Enter dates name"
          class="nft-form__date-input nft-form__date-input_type"
        />
      </div>
      <div class="nft-form__date-value">
        <date-picker
          v-model="value"
          value-type="format"
          placeholder="YYYY-MM-DD"
        ></date-picker>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'

export default {
  components: {
    DatePicker
  },
  props: {
    date: {
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
    date: {
      handler(date) {
        if (date.type !== this.type) {
          this.type = date.type || ''
        }

        if (date.value !== this.value) {
          this.value = date.value || ''
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
