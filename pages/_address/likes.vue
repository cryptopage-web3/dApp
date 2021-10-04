<template>
  <div class="transactions-body">
    <div class="like-link-parent">
      <div class="like-link-top">
        <div class="like-link__date">
          <img src="@/assets/img/like-link__date_img2.png" alt="" />
          <span> 17:11 / 18.12.2021 </span>
        </div>
        <div class="like-link__id">To: 0x655..97cd</div>
      </div>
      <a href="#" class="like-link">
        <div
          class="like-link__thumb"
          :style="{
            backgroundImage: `url(${require('@/assets/img/like-link__thumb_bg1.png')})`
          }"
        ></div>
        <div class="like-link-right">
          <div class="like-link-wr">
            <div class="like-link__title">
              Text comment for NFT: 0x7eE...3F5
            </div>
          </div>
          <div class="like-link__heart">
            <img src="@/assets/img/like-link__heart_img1.png" alt="" />
          </div>
        </div>
      </a>
    </div>
    <div class="like-link-parent">
      <div class="like-link-top">
        <div class="like-link__date">
          <img src="@/assets/img/like-link__date_img2.png" alt="" />
          <span> 17:11 / 18.12.2021 </span>
        </div>
        <div class="like-link__id">To: 0x655..97cd</div>
      </div>
      <a href="#" class="like-link">
        <div
          class="like-link__thumb"
          :style="{
            backgroundImage: `url(${require('@/assets/img/like-link__thumb_bg1.png')})`
          }"
        ></div>
        <div class="like-link-right">
          <div class="like-link-wr">
            <div class="like-link__title">
              Text comment for NFT: 0x7eE...3F5
            </div>
          </div>
          <div class="like-link__heart">
            <img src="@/assets/img/like-link__heart_img2.png" alt="" />
          </div>
        </div>
      </a>
    </div>
  </div>
  <!-- <div class="posts">
    <div class="under-maintenance-text">No transaction was found.</div>
  </div> -->
</template>
<script>
export default {}
</script>
<style>
.under-maintenance-text {
  text-align: center;
  margin: 2em;
  padding: 2em;
  color: #768895;
  font-size: 25px;
}
</style>
