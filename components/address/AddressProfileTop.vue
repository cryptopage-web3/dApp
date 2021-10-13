<template>
  <div class="profile-top">
    <div class="profile-left">
      <div class="profile__thumb">
        <img
          v-if="$store.getters['address/image']"
          :src="$store.getters['address/image']"
          width="90"
          height="90"
        />
        <jazzicon
          v-else
          :seed="10211"
          :diameter="90"
          :address="$store.getters['address/address']"
        />
      </div>
      <div class="profile-info">
        <div class="profile-info__title">
          {{ $store.getters['address/address'] | shortAddress }}
        </div>
        <div class="profile-status">Status: <a href="#">Hello, World!</a></div>
        <div class="profile-info__text">
          {{ $store.getters['address/transactionsCount'] | humanizeCount }}
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
