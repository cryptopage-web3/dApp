<template>
  <div class="main-page-item">
    <div class="main-page-top">
      <div class="left">
        <h2 class="title">Top images</h2>
        <div class="main-page-dropdown">
          <button
            id="dropdownMenuButton"
            class="main-page-dropdown__btn"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            day
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">hour</a>
            <a class="dropdown-item" href="#">month</a>
            <a class="dropdown-item" href="#">year</a>
          </div>
        </div>
      </div>
      <a href="#" class="main-page-top__see"> See all </a>
    </div>
    <div class="main-page-sliders">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a
              href="#"
              class="thumb"
              :style="{ backgroundImage: `url(${slidersThumbUrl})` }"
            ></a>
            <div class="bottom">
              <div class="top">
                <a href="#" class="title"> Highest bid by JP_99 </a>
                <div class="text">0.735 WETH$2,812 for 1 edition</div>
              </div>
              <div class="like-dislike">
                <a href="#" class="post-like">
                  <img src="@/assets/img/post-like_img1.svg" alt="" />
                  <span> 8 607 </span>
                </a>
                <a href="#" class="post-dis" style="">
                  <img src="@/assets/img/post-like_img2.svg" alt="" />
                  <span> 2 342 </span>
                </a>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <a
              href="#"
              class="thumb"
              :style="{ backgroundImage: `url(${slidersThumbUrl})` }"
            ></a>
            <div class="bottom">
              <div class="top">
                <a href="#" class="title"> Highest bid by JP_99 </a>
                <div class="text">0.735 WETH$2,812 for 1 edition</div>
              </div>
              <div class="like-dislike">
                <a href="#" class="post-like">
                  <img src="@/assets/img/post-like_img1.svg" alt="" />
                  <span> 8 607 </span>
                </a>
                <a href="#" class="post-dis" style="">
                  <img src="@/assets/img/post-like_img2.svg" alt="" />
                  <span> 2 342 </span>
                </a>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <a
              href="#"
              class="thumb"
              :style="{ backgroundImage: `url(${slidersThumbUrl})` }"
            ></a>
            <div class="bottom">
              <div class="top">
                <a href="#" class="title"> Highest bid by JP_99 </a>
                <div class="text">0.735 WETH$2,812 for 1 edition</div>
              </div>
              <div class="like-dislike">
                <a href="#" class="post-like">
                  <img src="@/assets/img/post-like_img1.svg" alt="" />
                  <span> 8 607 </span>
                </a>
                <a href="#" class="post-dis" style="">
                  <img src="@/assets/img/post-like_img2.svg" alt="" />
                  <span> 2 342 </span>
                </a>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <a
              href="#"
              class="thumb"
              :style="{ backgroundImage: `url(${slidersThumbUrl})` }"
            ></a>
            <div class="bottom">
              <div class="top">
                <a href="#" class="title"> Highest bid by JP_99 </a>
                <div class="text">0.735 WETH$2,812 for 1 edition</div>
              </div>
              <div class="like-dislike">
                <a href="#" class="post-like">
                  <img src="@/assets/img/post-like_img1.svg" alt="" />
                  <span> 8 607 </span>
                </a>
                <a href="#" class="post-dis" style="">
                  <img src="@/assets/img/post-like_img2.svg" alt="" />
                  <span> 2 342 </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-button-prev">
        <icon type="start_top_images_prev" />
      </div>
      <div class="swiper-button-next">
        <icon type="start_top_images_next" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import slidersThumbPath from '~/assets/img/main-page-sliders_thumb.jpg'

@Component({
  components: {
    icon: async () => await import('@/components/icons/Icon.vue')
  }
})
export default class StartTopImages extends Vue {
  slidersThumbUrl = slidersThumbPath
}
</script>
