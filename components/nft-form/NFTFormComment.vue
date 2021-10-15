<template>
  <div class="nft-form__comment">
    <div class="custom-control custom-checkbox">
      <input
        id="nft-form-comment"
        type="checkbox"
        class="custom-control-input"
        :checked="value"
        @change="$emit('input', $event.target.checked)"
      />
      <label class="custom-control-label" for="nft-form-comment">
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
