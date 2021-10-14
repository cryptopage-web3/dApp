<template>
  <div class="tweet-add__boost">
    <div class="tweet-add__boost-remove" @click="$emit('remove')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>
    <div class="tweet-add__boost-name">
      <input
        v-model="type"
        type="text"
        placeholder="Enter type"
        class="tweet-add__boost-name-input"
      />
    </div>
    <div class="tweet-add__boost-type">
      <select v-model="displayType" class="tweet-add__boost-type-input">
        <option value="boost_percentage">Percentage</option>
        <option value="boost_number">Number</option>
      </select>
    </div>
    <div class="tweet-add__boost-progress">
      <Progress
        :value="progress"
        :radius="30"
        :stroke-width="7"
        stroke-color="#1da1f2"
      >
        <div class="tweet-add__boost-progress-content">
          <input
            v-model="value"
            type="text"
            placeholder="XX"
            class="tweet-add__boost-progress-input"
          />
        </div>
      </Progress>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    boost: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      type: '',
      value: '',
      displayType: 'boost_percentage'
    }
  },
  computed: {
    progress() {
      return this.value > 100 ? 100 : this.value
    }
  },
  watch: {
    boost: {
      handler(boost) {
        if (boost.type !== this.type) {
          this.type = boost.type || ''
        }

        if (boost.value !== this.value) {
          this.value = boost.value || ''
        }

        if (boost.displayType !== this.displayType) {
          this.displayType = boost.displayType || 'boost_percentage'
        }
      },
      immediate: true
    },

    displayType(displayType) {
      this.$emit('change', {
        displayType,
        type: this.type,
        value: this.value
      })
    },

    type(type) {
      this.$emit('change', {
        type,
        value: this.value,
        displayType: this.displayType
      })
    },

    value(value) {
      this.$emit('change', {
        value,
        type: this.type,
        displayType: this.displayType
      })
    }
  }
}
</script>
