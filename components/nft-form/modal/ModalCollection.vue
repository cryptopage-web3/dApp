<template>
  <div class="modal-creat-text mb_20">
    <div class="modal-creat__title2">Collection</div>
    <div class="global-text">
      This is the collection where your item will appear.
    </div>
    <div class="profile-content-drop modal-creat-drop market-filtr__drop mt_10">
      <a href="#" class="profile-content-drop__link">
        <span> Select collection </span>
      </a>
      <div class="drop-down__col">
        <ul class="drop-down__list">
          <li>
            <a href="#">
              <span>Select collection1</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>Select collection2</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>Select collection3</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>Select collection4</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ModalCollection extends Vue {}
</script>
