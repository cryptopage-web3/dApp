<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { ELocalStorageKey, ILandingMessageBroadcast } from '~/types';

@Component({
  layout: 'empty',
})
export default class LandingMessagePage extends Vue {
  mounted() {
    window.addEventListener(
      'message',
      ({ data: { target, params } }: ILandingMessageBroadcast) => {
        console.log(target, params);

        if (target !== ELocalStorageKey.landingMessage) {
          return;
        }

        const file = params.files && params.files[0];
        const reader = new FileReader();

        if (file) {
          reader.onload = (event) => {
            const dataUrl = event.target?.result || '';

            this.save(params, String(dataUrl));
          };

          reader.readAsDataURL(file);

          return;
        }

        this.save(params, '');
      },
    );
  }

  save(data: ILandingMessageBroadcast['data']['params'], file: string) {
    const params = {
      currency: data.currency,
      duration: data.duration,
      file,
      network: data.network,
      price: data.price,
      title: data.title,
    };

    localStorage.setItem(
      ELocalStorageKey.landingMessage,
      JSON.stringify(params),
    );
  }
}
</script>
