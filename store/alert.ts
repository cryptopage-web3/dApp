import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { IAlertMessage, EAlertType } from '~/types';

@Module({
  name: 'alert',
  namespaced: true,
  stateFactory: true,
})
export default class AlertModule extends VuexModule {
  message: IAlertMessage | null = null;

  @Mutation
  public setMessage(message: IAlertMessage | null) {
    this.message = message;
  }

  @Action
  public success(title: string) {
    this.setMessage({
      type: EAlertType.success,
      title,
    });
  }

  @Action
  public error(title: string) {
    this.setMessage({
      type: EAlertType.error,
      title,
    });
  }

  @Action
  public info(title: string) {
    this.setMessage({
      type: EAlertType.info,
      title,
    });
  }

  @Action
  public clean() {
    this.setMessage(null);
  }
}
