<template>
  <div class="market-sidebar">
    <div class="market-sidebar-top">
      <h3 class="market-sidebar__title">Recommendations</h3>
    </div>
    <ul class="spaces-empty-sidebar">
      <li>
        <div class="spaces-empty-sidebar-item">
          <a
            href="#"
            class="thumb"
            :style="{
              backgroundImage: `url(${homeSidebarImg1})`,
            }"
          ></a>
          <div class="right">
            <a href="#" class="title"> Punks / Rockers / Metalhea ... </a>
            <div
              class="d-flex align-items-center justify-content-between flex-wrap"
            >
              <div class="count">
                <span>598 345</span>
                <img
                  src="@/assets/img/spaces-empty-sidebar_count_img.svg"
                  alt=""
                />
              </div>
              <a href="#" class="blue status">Private</a>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="spaces-empty-sidebar-item">
          <a
            href="#"
            class="thumb"
            :style="{
              backgroundImage: `url(${homeSidebarImg2})`,
            }"
          ></a>
          <div class="right">
            <a href="#" class="title"> PZHWear. Russian Streetw ... </a>
            <div
              class="d-flex align-items-center justify-content-between flex-wrap"
            >
              <div class="count">
                <span>598 345</span>
                <img
                  src="@/assets/img/spaces-empty-sidebar_count_img.svg"
                  alt=""
                />
              </div>
              <a href="#" class="blue status">Public</a>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="spaces-empty-sidebar-item">
          <a
            href="#"
            class="thumb"
            :style="{
              backgroundImage: `url(${homeSidebarImg3})`,
            }"
          ></a>
          <div class="right">
            <a href="#" class="title"> Zubkov </a>
            <div
              class="d-flex align-items-center justify-content-between flex-wrap"
            >
              <div class="count">
                <span>598 345</span>
                <img
                  src="@/assets/img/spaces-empty-sidebar_count_img.svg"
                  alt=""
                />
              </div>
              <a href="#" class="blue status">30 day free</a>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="spaces-empty-sidebar-item">
          <a
            href="#"
            class="thumb"
            :style="{
              backgroundImage: `url(${homeSidebarImg4})`,
            }"
          ></a>
          <div class="right">
            <a href="#" class="title"> Nike official </a>
            <div
              class="d-flex align-items-center justify-content-between flex-wrap"
            >
              <div class="count">
                <span>598 345</span>
                <img
                  src="@/assets/img/spaces-empty-sidebar_count_img.svg"
                  alt=""
                />
              </div>
              <a href="#" class="blue status">Public</a>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="spaces-empty-sidebar-item">
          <a
            href="#"
            class="thumb"
            :style="{
              backgroundImage: `url(${homeSidebarImg5})`,
            }"
          ></a>
          <div class="right">
            <a href="#" class="title"> Monkeys community </a>
            <div
              class="d-flex align-items-center justify-content-between flex-wrap"
            >
              <div class="count">
                <span>598 345</span>
                <img
                  src="@/assets/img/spaces-empty-sidebar_count_img.svg"
                  alt=""
                />
              </div>
              <a href="#" class="red status">Deactivated</a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import homeSidebarImg1 from '~/assets/img/spaces-empty-sidebar_img1.png';
import homeSidebarImg2 from '~/assets/img/spaces-empty-sidebar_img2.png';
import homeSidebarImg3 from '~/assets/img/spaces-empty-sidebar_img3.png';
import homeSidebarImg4 from '~/assets/img/spaces-empty-sidebar_img4.png';
import homeSidebarImg5 from '~/assets/img/spaces-empty-sidebar_img5.png';

@Component({})
export default class Recommendations extends Vue {
  homeSidebarImg1 = homeSidebarImg1;
  homeSidebarImg2 = homeSidebarImg2;
  homeSidebarImg3 = homeSidebarImg3;
  homeSidebarImg4 = homeSidebarImg4;
  homeSidebarImg5 = homeSidebarImg5;
}
</script>
