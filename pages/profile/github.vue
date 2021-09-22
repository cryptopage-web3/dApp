<template>
  <div class="block">
    <github />
  </div>
</template>
<script>
export default {
  components: {
    github: async () => await import('@/components/profile/ProfileSocialGitHub')
  }
}
</script>
<style scoped>
.block {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
</style>
