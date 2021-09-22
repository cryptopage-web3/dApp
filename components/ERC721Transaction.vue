<template>
  <div class="post">
    <div class="post-cont">
      <div v-if="transaction.nft" class="post-right">
        <post-account :address="transaction.nft.owner" />
        <post-title :title="transaction.nft.title" />
        <post-title :title="transaction.nft.description" />
        <post-thumbs :src="transaction.nft.image" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    postAccount: async () => await import('@/components/post/PostAccount'),
    postTitle: async () => await import('@/components/post/PostTitle'),
    postThumbs: async () => await import('@/components/post/PostThumbs')
  },
  props: {
    transaction: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
