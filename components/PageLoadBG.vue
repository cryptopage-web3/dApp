<template>
  <div class="page-load">
    <Icon type="logo" />
  </div>
</template>
<script>
export default {
  components: {
    Icon: async () => await import('@/components/icons/Icon')
  }
}
</script>
