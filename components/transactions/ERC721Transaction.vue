<template>
  <div class="post post-image">
    <top :address="transaction.nft.owner" :date="transaction.timeStamp" />
    <a
      href="#"
      :style="{ backgroundImage: `url(${transaction.nft.image})` }"
      class="post-image__link"
    />
    <text-block :text="transaction.nft.description" />
    <bottom />
  </div>
</template>
<script>
export default {
  components: {
    top: async () => await import('@/components/post/PostTop'),
    textBlock: async () => await import('@/components/post/PostTextBlock'),
    bottom: async () => await import('@/components/post/PostBottom')
  },
  props: {
    transaction: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
