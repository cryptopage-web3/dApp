<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({
  layout: 'empty',
})
export default class LandingMessagePage extends Vue {
  mounted() {
    window.addEventListener('message', (event) => {
      if (event.data) {
        console.log(event.data);
      }
    });
  }
}
</script>
