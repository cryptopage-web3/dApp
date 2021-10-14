<template>
  <div class="tweet-add__level">
    <div class="tweet-add__level-remove" @click="$emit('remove')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>
    <div class="tweet-add__level-fields">
      <div class="tweet-add__level-type">
        <input
          v-model="type"
          type="text"
          placeholder="Enter level name"
          class="tweet-add__level-input tweet-add__level-input_type"
        />
      </div>
      <div class="tweet-add__level-values">
        <div class="tweet-add__level-value">
          <input
            v-model="value"
            type="text"
            placeholder="value"
            class="tweet-add__level-input tweet-add__level-input_value"
          />
        </div>
        <div class="tweet-add__level-delimiter">of</div>
        <div class="tweet-add__level-value">
          <input
            v-model="maxValue"
            type="text"
            placeholder="max value"
            class="tweet-add__level-input tweet-add__level-input_value"
          />
        </div>
      </div>
    </div>
    <div class="tweet-add__level-range">
      <div class="tweet-add__level-range-bar">
        <div
          class="tweet-add__level-range-bar__fill"
          :style="{
            width: (maxValue && value ? (value / maxValue) * 100 : 0) + '%'
          }"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    level: {
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
    level: {
      handler(level) {
        if (level.type !== this.type) {
          this.type = level.type || ''
        }

        if (level.value !== this.value) {
          this.value = level.value || ''
        }

        if (level.maxValue !== this.maxValue) {
          this.maxValue = level.maxValue || ''
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
