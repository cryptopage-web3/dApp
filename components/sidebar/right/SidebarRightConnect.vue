<template>
  <div class="connect-wallet-wr">
    <div ref="connect" class="connect-wallet-col connect-wallet__link-hover">
      <a
        href="#"
        data-toggle="modal"
        data-target="#modal-connect"
        role="button"
        class="connect-wallet__link"
      >
        <div class="connect-wallet__link-thumb">
          <img src="@/assets/img/connect-wallet__link_img2.png" alt="" />
        </div>
        <div class="connect-wallet__link-text">
          <div class="connect-wallet__link-tool">Etherum</div>
          <div class="connect-wallet__link-status">Connect wallet</div>
        </div>
      </a>
      <div class="connect-wallet-col-body">
        <ul class="connect-wallet__list">
          <li><a href="#">Activate layer 2</a></li>
          <li><a href="#">Copy Address</a></li>
          <li><a href="#">Transaction history</a></li>
          <li><a href="#">Claim</a></li>
          <li><a href="#">Change Wallet</a></li>
          <li><a href="#">Disconnect</a></li>
        </ul>
      </div>
    </div>
    <a href="#" class="dark-white">
      <img src="@/assets/img/dark-white_img2.png" alt="" />
    </a>
  </div>
</template>
<script>
export default {
  mounted() {
    $(this.$refs.connect).hover(
      function () {
        $(this).addClass('active')
        $(this).find('.connect-wallet-col-body').stop(true, true).slideDown(300)
      },
      function () {
        $(this).removeClass('active')
        $(this).find('.connect-wallet-col-body').slideUp(300)
      }
    )
  }
}
</script>
