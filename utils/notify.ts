import Vue from 'vue';
import { saveError } from './saveError';
import { IAlertMessage, EAlertType, EErrorType } from '~/types';

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
    if (params.type === EAlertType.error) {
      saveError(EErrorType.notify, params.title || '');
    }

    Vue.notify(params);
  },
};
