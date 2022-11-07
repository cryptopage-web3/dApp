<template>
  <div>
    <div class="main-profile-inbox-top">
      <h3 class="market-sidebar__title">Inbox</h3>
    </div>
    <a href="#" class="main-profile-inbox-item online pt-0">
      <div
        class="chat-list-item-thumb"
        :style="{
          backgroundImage: `url(${chatThumb1})`,
        }"
      ></div>
      <div class="chat-list-item-right">
        <div class="d-flex align-items-start justify-content-between mb_2">
          <div class="chat-list-item__nik">
            <span>0xfB9...687</span> / Bernard Show
          </div>
        </div>
        <div class="chat-list-item__text">
          Added the creation of a group chat, the principle is...
        </div>
      </div>
    </a>
    <a href="#" class="main-profile-inbox-item">
      <div
        class="chat-list-item-thumb"
        :style="{
          backgroundImage: `url(${chatThumb2})`,
        }"
      ></div>
      <div class="chat-list-item-right">
        <div class="d-flex align-items-start justify-content-between mb_2">
          <div class="chat-list-item__nik">Punk Brew chat company</div>
        </div>
        <div class="chat-list-item__text">
          Added the creation of a group chat, the principle is...
        </div>
      </div>
    </a>
    <a href="#" class="main-profile-inbox-item">
      <div
        class="chat-list-item-thumb"
        :style="{
          backgroundImage: `url(${chatThumb3})`,
        }"
      ></div>
      <div class="chat-list-item-right">
        <div class="d-flex align-items-start justify-content-between mb_2">
          <div class="chat-list-item__nik">
            <span>0xf3D...667</span> / Katerine Laskala
          </div>
        </div>
        <div class="chat-list-item__text">
          Added the creation of a group chat, the principle is...
        </div>
      </div>
    </a>
    <a href="#" class="main-profile-inbox-item online">
      <div
        class="chat-list-item-thumb"
        :style="{
          backgroundImage: `url(${chatThumb4})`,
        }"
      ></div>
      <div class="chat-list-item-right">
        <div class="d-flex align-items-start justify-content-between mb_2">
          <div class="chat-list-item__nik">
            <span>0xf3D...667</span> / Katerine Laskala
          </div>
        </div>
        <div class="chat-list-item__text">
          Added the creation of a group chat, the principle is...
        </div>
      </div>
    </a>
    <a href="#" class="main-profile-inbox-item online">
      <div
        class="chat-list-item-thumb"
        :style="{
          backgroundImage: `url(${chatThumb5})`,
        }"
      ></div>
      <div class="chat-list-item-right">
        <div class="d-flex align-items-start justify-content-between mb_2">
          <div class="chat-list-item__nik">Fuck the police</div>
        </div>
        <div class="chat-list-item__text">
          Added the creation of a group chat, the principle is...
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import chatThumb1 from '~/assets/img/chat-list-item-thumb1.png';
import chatThumb2 from '~/assets/img/chat-list-item-thumb2.png';
import chatThumb3 from '~/assets/img/chat-list-item-thumb3.png';
import chatThumb4 from '~/assets/img/chat-list-item-thumb4.png';
import chatThumb5 from '~/assets/img/chat-list-item-thumb5.png';

@Component({})
export default class ProfileInbox extends Vue {
  chatThumb1 = chatThumb1;
  chatThumb2 = chatThumb2;
  chatThumb3 = chatThumb3;
  chatThumb4 = chatThumb4;
  chatThumb5 = chatThumb5;
}
</script>
