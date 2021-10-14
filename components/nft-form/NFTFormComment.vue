<template>
  <div class="tweet-add__comment">
    <div class="custom-control custom-checkbox">
      <input
        id="tweet-add-comment"
        type="checkbox"
        class="custom-control-input"
        :checked="value"
        @change="$emit('input', $event.target.checked)"
      />
      <label class="custom-control-label" for="tweet-add-comment">
        Сomment available
      </label>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean
    }
  }
}
</script>
