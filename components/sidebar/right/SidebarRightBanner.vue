<template>
  <div class="banner">
    <a href="#" class="banner__close" @click.prevent="close">
      <img src="@/assets/img/banner__close_img.png" alt="" />
    </a>
    <div class="banner__text">
      Создай NFT <br />
      и участвуй в розыгрыше <br />
      <span>10000 page</span>
    </div>
    <a href="#" class="btn btn_white btn_banner">
      <span> Создать NFT </span>
    </a>
  </div>
</template>
<script>
export default {
  methods: {
    close(event) {
      $(event.target).closest('.banner').slideUp(300)
    }
  }
}
</script>
