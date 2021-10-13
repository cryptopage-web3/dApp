<template>
  <div class="profile-top">
    <div class="profile-left">
      <div class="profile__thumb">
        <img
          v-if="$store.getters['transactions/image']"
          :src="$store.getters['transactions/image']"
          :width="diameter"
          :height="diameter"
        />
        <jazzicon
          v-else
          :seed="10211"
          :diameter="diameter"
          :address="$store.getters['transactions/address']"
        />
      </div>
      <div class="profile-info">
        <div class="profile-info__title">
          {{ $store.getters['transactions/address'] | shortAddress }}
        </div>
        <div class="profile-status">Status: <a href="#">Hello, World!</a></div>
        <div class="profile-info__text">
          {{ $store.getters['transactions/count'] | humanizeCount }}
          transactions<br />
          0 inputs / 0 outputs
        </div>
      </div>
    </div>
    <div class="profile-right">
      <a href="#" class="profile-ring active">
        <img src="@/assets/img/profile-ring_img2.png" alt="" />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    diameter: $(window).width() > 767 ? '90' : '40'
  })
}
</script>
