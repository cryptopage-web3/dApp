<template>
  <a
    href="#"
    :style="{
      backgroundImage: `url(${sidebarBg1})`,
    }"
  ></a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import marketSidebarBg1 from '~/assets/img/market-sidebar__list2_bg1.jpg';

type TNft = INft;

@Component({})
export default class SidebarNft extends Vue {
  sidebarBg1 = marketSidebarBg1;

  @Prop({ required: true })
  readonly nft!: TNft;
}
</script>
