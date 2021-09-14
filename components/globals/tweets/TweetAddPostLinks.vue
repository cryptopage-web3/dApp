<template>
  <div class="tweet-add__post-links">
    <a class="post-link post-link_blue" @click="$emit('onImageClick')">
      <icon-image style="cursor: pointer" />
    </a>
    <a href="#" class="post-link post-link_blue">
      <giff />
    </a>
    <a href="#" class="post-link post-link_blue">
      <poll />
    </a>
    <a href="#" class="post-link post-link_blue">
      <emoji />
    </a>
    <a href="#" class="post-link post-link_blue">
      <scheduler />
    </a>
  </div>
</template>
<script>
export default {
  components: {
    scheduler: async () => await import('@/components/icons/Scheduler'),
    emoji: async () => await import('@/components/icons/Emoji'),
    poll: async () => await import('@/components/icons/Poll'),
    giff: async () => await import('@/components/icons/Giff'),
    'icon-image': async () => await import('@/components/icons/Image')
  }
}
</script>
