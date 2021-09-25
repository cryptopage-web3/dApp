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
  data() {
    return {
      type: '',
      value: ''
    }
  }
}
</script>
