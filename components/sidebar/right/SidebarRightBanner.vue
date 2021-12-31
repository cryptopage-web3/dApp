<template>
  <div class="banner">
    <a href="#" class="banner__close" @click.prevent="close">
      <img src="@/assets/img/banner__close_img.png" alt="" />
    </a>
    <div class="banner__text">
      Create NFT <br />
      and take part in the giveaway
      <span>10 000 PAGE</span>
    </div>
    <a href="#" class="btn btn_white btn_banner" @click.prevent="openNFTForm">
      <span> Create NFT </span>
    </a>
  </div>
</template>
<script>
export default {
  methods: {
    close(event) {
      $(event.target).closest('.banner').slideUp(300)
    },

    openNFTForm() {
      $('#nft-form-modal').modal('show')
    }
  }
}
</script>
