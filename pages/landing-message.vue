<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { ILandingMessageBroadcast } from '~/types';

@Component({
  layout: 'empty',
})
export default class LandingMessagePage extends Vue {
  mounted() {
    const channel = new BroadcastChannel('cp-landing-message');

    channel.addEventListener(
      'message',
      ({ data }: ILandingMessageBroadcast) => {
        const file = data.files && data.files[0];
        const reader = new FileReader();

        if (file) {
          reader.onload = (base64) => {
            this.save(data, String(base64));
          };
          reader.readAsDataURL(file);

          return;
        }

        this.save(data, '');
      },
    );
  }

  save(data: ILandingMessageBroadcast['data'], file: string) {
    const params = {
      currency: data.currency,
      duration: data.duration,
      file,
      network: data.network,
      price: data.price,
      title: data.title,
    };

    localStorage.setItem('cp-landing-message', JSON.stringify(params));
  }
}
</script>
