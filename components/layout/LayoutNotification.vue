<template>
  <notifications width="350" />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import { alertModule } from '~/store';
import { IAlertMessage } from '~/types';
import { notify } from '~/utils/notify';

@Component({})
export default class LayoutNotification extends Vue {
  get message() {
    return alertModule.message;
  }

  @Watch('message')
  onMessageChange(message: IAlertMessage | null) {
    if (!message) {
      return;
    }

    notify.send(message);
    alertModule.clean();
  }
}
</script>
