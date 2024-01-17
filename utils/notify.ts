import Vue from 'vue';
import { IAlertMessage, EAlertType } from '~/types';

export const notify = {
  error(title: string) {
    this.send({
      type: EAlertType.error,
      title,
    });
  },

  success(title: string) {
    this.send({
      type: EAlertType.success,
      title,
    });
  },

  info(title: string) {
    this.send({
      type: EAlertType.info,
      title,
    });
  },

  send(params: IAlertMessage) {
    Vue.notify(params);
  },
};
