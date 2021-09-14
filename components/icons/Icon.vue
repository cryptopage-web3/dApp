<template>
  <div class="no-style" v-html="icon"></div>
</template>
<script>
import iconList from '@/constants/icons'
export default {
  props: ['type'],
  data: () => ({}),
  computed: {
    icon() {
      return iconList[this.type] || ''
    }
  }
}
</script>
<style>
.no-style {
  display: contents !important;
}
</style>
