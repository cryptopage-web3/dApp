<template>
  <div class="start-page">
    <span id="span" title="tooltip">start234</span>
    <div id="www">www</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({
  layout: 'start',
})
export default class IndexPage extends Vue {
  test: string | null = null;

  mounted() {
    setTimeout(() => {
      $('#www').hide();

      ($('#span') as any).tooltip({
        trigger: 'hover',
      });
    }, 2000);
  }
}
</script>
