<template>
  <div class="market-sidebar">
    <div class="market-sidebar-top">
      <h3 class="market-sidebar__title">New users</h3>
    </div>
    <ul class="spaces-sidebar-users">
      <li class="pt-0">
        <a
          href="#"
          class="spaces-sidebar-user-thumb"
          :style="{
            backgroundImage: `url(${homeSidebarImg1})`,
          }"
        ></a>
        <div class="right">
          <div
            class="d-flex align-items-start justify-content-between flex-wrap"
          >
            <a href="#" class="id-user">
              <span> 0kl3S...D45 </span>
              <img src="@/assets/img/market-header-search-ident.svg" alt="" />
            </a>
            <a href="#" class="follow"> +Follow </a>
          </div>
          <div class="nik mt_4">Vladimir Kanevalin</div>
        </div>
      </li>
      <li>
        <a
          href="#"
          class="spaces-sidebar-user-thumb"
          :style="{
            backgroundImage: `url(${homeSidebarImg2})`,
          }"
        ></a>
        <div class="right">
          <div
            class="d-flex align-items-start justify-content-between flex-wrap"
          >
            <a href="#" class="id-user">
              <span> 0kl3S...D44 </span>
              <img src="@/assets/img/market-header-search-ident.svg" alt="" />
            </a>
            <a href="#" class="follow"> +Follow </a>
          </div>
          <div class="nik mt_4">Angelika Pravsberry</div>
        </div>
      </li>
      <li>
        <a
          href="#"
          class="spaces-sidebar-user-thumb"
          :style="{
            backgroundImage: `url(${homeSidebarImg3})`,
          }"
        ></a>
        <div class="right">
          <div
            class="d-flex align-items-start justify-content-between flex-wrap"
          >
            <a href="#" class="id-user">
              <span> 0kl3S...D43 </span>
              <img src="@/assets/img/market-header-search-ident.svg" alt="" />
            </a>
            <a href="#" class="follow"> +Follow </a>
          </div>
          <div class="nik mt_4">Ivan Naumov</div>
        </div>
      </li>
      <li>
        <a
          href="#"
          class="spaces-sidebar-user-thumb"
          :style="{
            backgroundImage: `url(${homeSidebarImg4})`,
          }"
        ></a>
        <div class="right">
          <div
            class="d-flex align-items-start justify-content-between flex-wrap"
          >
            <a href="#" class="id-user">
              <span> 0kl3S...D42 </span>
              <img src="@/assets/img/market-header-search-ident.svg" alt="" />
            </a>
            <a href="#" class="follow"> +Follow </a>
          </div>
          <div class="nik mt_4">J.D.</div>
        </div>
      </li>
      <li>
        <a
          href="#"
          class="spaces-sidebar-user-thumb"
          :style="{
            backgroundImage: `url(${homeSidebarImg5})`,
          }"
        ></a>
        <div class="right">
          <div
            class="d-flex align-items-start justify-content-between flex-wrap"
          >
            <a href="#" class="id-user">
              <span> 0kl3S...D41 </span>
            </a>
            <a href="#" class="follow"> +Follow </a>
          </div>
          <div class="nik mt_4">Perry Koks</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import homeSidebarImg1 from '~/assets/img/spaces-sidebar-user_img1.png';
import homeSidebarImg2 from '~/assets/img/spaces-sidebar-user_img2.png';
import homeSidebarImg3 from '~/assets/img/spaces-sidebar-user_img3.png';
import homeSidebarImg4 from '~/assets/img/spaces-sidebar-user_img4.png';
import homeSidebarImg5 from '~/assets/img/spaces-sidebar-user_img5.png';

@Component({})
export default class NewUsers extends Vue {
  homeSidebarImg1 = homeSidebarImg1;
  homeSidebarImg2 = homeSidebarImg2;
  homeSidebarImg3 = homeSidebarImg3;
  homeSidebarImg4 = homeSidebarImg4;
  homeSidebarImg5 = homeSidebarImg5;
}
</script>
