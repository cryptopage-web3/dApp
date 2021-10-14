<template>
  <div class="tweet-add__stat">
    <div class="tweet-add__stat-remove" @click="$emit('remove')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>
    <div class="tweet-add__stat-fields">
      <div class="tweet-add__stat-type">
        <input
          v-model="type"
          type="text"
          placeholder="Enter stats name"
          class="tweet-add__stat-input tweet-add__stat-input_type"
        />
      </div>
      <div class="tweet-add__stat-values">
        <div class="tweet-add__stat-value">
          <input
            v-model="value"
            type="text"
            placeholder="value"
            class="tweet-add__stat-input tweet-add__stat-input_value"
          />
        </div>
        <div class="tweet-add__stat-delimiter">of</div>
        <div class="tweet-add__stat-value">
          <input
            v-model="maxValue"
            type="text"
            placeholder="max value"
            class="tweet-add__stat-input tweet-add__stat-input_value"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    stat: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      type: '',
      value: '',
      maxValue: ''
    }
  },
  watch: {
    stat: {
      handler(stat) {
        if (stat.type !== this.type) {
          this.type = stat.type || ''
        }

        if (stat.value !== this.value) {
          this.value = stat.value || ''
        }

        if (stat.maxValue !== this.maxValue) {
          this.maxValue = stat.maxValue || ''
        }
      },
      immediate: true
    },

    type(type) {
      this.$emit('change', {
        type,
        value: this.value,
        maxValue: this.maxValue
      })
    },

    value(value) {
      this.$emit('change', {
        value,
        type: this.type,
        maxValue: this.maxValue
      })
    },

    maxValue(maxValue) {
      this.$emit('change', {
        maxValue,
        type: this.type,
        value: this.value
      })
    }
  }
}
</script>
