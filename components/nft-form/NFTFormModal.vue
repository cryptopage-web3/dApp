<template>
  <div id="__modal">
    <div class="modal-close d-flex align-center">
      <div
        class="modal-close__btn d-flex align-center justify-center"
        @click="$modal.hide('nft')"
      >
        <icon type="close" />
      </div>
    </div>
    <nft-form />
  </div>
</template>
<script>
export default {
  components: {
    icon: async () => await import('@/components/icons/Icon'),
    'nft-form': () => import('@/components/nft-form/NFTForm.vue')
  }
}
</script>
