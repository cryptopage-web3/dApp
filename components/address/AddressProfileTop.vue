<template>
  <div class="profile-top">
    <div class="profile-left">
      <div class="profile__thumb">
        <jazzicon :seed="10211" :diameter="90" :address="address" />
      </div>
      <div class="profile-info">
        <div class="profile-info__title">{{ address | shortAddress }}</div>
        <div class="profile-status">Status: <a href="#">Hello, World!</a></div>
        <div class="profile-info__text">
          {{ transactionsCount | humanizeCount }} transactions<br />
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
  props: {
    address: {
      type: String,
      required: true
    },
    transactionsCount: {
      type: Number,
      required: true
    }
  }
}
</script>
