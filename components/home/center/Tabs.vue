<template>
  <ul
    id="home-tabs"
    class="nav nav-tabs main-tabs spaces-tabs mb_20 scroll-el"
    role="tablist"
  >
    <li class="nav-item" role="presentation">
      <a
        id="spaces-tabs1-tab"
        href="#spaces-tabs1"
        class="spaces-tabs-link active"
        data-toggle="tab"
        role="tab"
        aria-controls="spaces-tabs1"
        aria-selected="true"
      >
        New content
      </a>
    </li>
    <li class="nav-item" role="presentation">
      <a
        id="spaces-tabs2-tab"
        href="#spaces-tabs2"
        class="spaces-tabs-link"
        data-toggle="tab"
        role="tab"
        aria-controls="spaces-tabs2"
        aria-selected="false"
      >
        For you
      </a>
    </li>
    <li class="nav-item" role="presentation">
      <a
        id="spaces-tabs3-tab"
        href="#spaces-tabs3"
        class="spaces-tabs-link disabled"
        data-toggle="tab"
        role="tab"
        aria-controls="spaces-tabs3"
        aria-selected="false"
      >
        Folowing
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { stickyModule } from '~/store';

@Component({})
export default class Tabs extends Vue {
  mounted() {
    $('#home-tabs .spaces-tabs-link').on('shown.bs.tab', () => {
      stickyModule.update();
    });
  }
}
</script>
