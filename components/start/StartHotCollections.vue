<template>
  <div class="main-page-item">
    <div class="main-page-top">
      <div class="left">
        <h2 class="title">Hot collections</h2>
      </div>
      <a href="#" class="main-page-top__see"> See all </a>
    </div>
    <div class="main-page-collections">
      <div class="item">
        <a
          href="#"
          class="thumb"
          :style="{ backgroundImage: `url(${collectionThumbUrl})` }"
        ></a>
        <div class="bottom">
          <div class="left">
            <a href="#" class="title"> Highest bid by JP_99 </a>
            <div class="text">0.735 WETH$2,812 for 1 edition</div>
          </div>
          <div class="right">
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
      <div class="item">
        <a
          href="#"
          class="thumb"
          :style="{ backgroundImage: `url(${collectionThumbUrl})` }"
        ></a>
        <div class="bottom">
          <div class="left">
            <a href="#" class="title"> Highest bid by JP_99 </a>
            <div class="text">0.735 WETH$2,812 for 1 edition</div>
          </div>
          <div class="right">
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
      <div class="item">
        <a
          href="#"
          class="thumb"
          :style="{ backgroundImage: `url(${collectionThumbUrl})` }"
        ></a>
        <div class="bottom">
          <div class="left">
            <a href="#" class="title"> Highest bid by JP_99 </a>
            <div class="text">0.735 WETH$2,812 for 1 edition</div>
          </div>
          <div class="right">
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
      <div class="item">
        <a
          href="#"
          class="thumb"
          :style="{ backgroundImage: `url(${collectionThumbUrl})` }"
        ></a>
        <div class="bottom">
          <div class="left">
            <a href="#" class="title"> Highest bid by JP_99 </a>
            <div class="text">0.735 WETH$2,812 for 1 edition</div>
          </div>
          <div class="right">
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
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import collectionThumbPath from '~/assets/img/main-page-collections_thumb.jpg'

@Component({})
export default class StartHotCollections extends Vue {
  collectionThumbUrl = collectionThumbPath
}
</script>
