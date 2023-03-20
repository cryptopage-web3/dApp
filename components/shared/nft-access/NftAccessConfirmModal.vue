<template>
  <div
    ref="modal"
    class="modal fade global-modal onboarding-modal confirm-buy-access-modal"
    tabindex="1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-backdrop="static"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="global-modal-body">
            <h3 class="global-zag mb_xl_20 mb_md_15 mb_10">Buy Access</h3>
            <div class="global-text_12">
              Unlock post for {{ price }} PAGE<br />
              <template v-if="duration">
                Access will be active - {{ duration }} days
              </template>
            </div>
            <div
              class="onboarding-welcome-btns d-flex align-items-center justify-content-center mt_md_20 mt_10"
            >
              <a
                href="#"
                role="button"
                class="btn btn-blue-transparent_button btn_large mr_20 pr_30 pl_30"
                @click.prevent="cancel"
              >
                Cancel
              </a>
              <a
                href="#"
                role="button"
                class="btn btn-blue_button btn_large pr_30 pl_30"
                @click.prevent="accept"
              >
                Buy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'nuxt-property-decorator';

@Component({})
export default class NftAccessConfirmModal extends Vue {
  @Prop({ required: true })
  readonly accessPrice!: number;

  @Prop({ required: true })
  readonly accessDuration!: number;

  $refs!: {
    modal: HTMLDivElement;
  };

  get price(): number {
    return this.accessPrice / 10 ** 18;
  }

  get duration(): string {
    return this.accessDuration
      ? String(Math.round(this.accessDuration / (24 * 60 * 60)))
      : '';
  }

  // emit

  @Emit('cancel')
  emitCancel() {
    return true;
  }

  @Emit('accept')
  emitAccept() {
    return true;
  }

  // methods

  show() {
    ($(this.$refs.modal) as any).modal('show');
  }

  hide() {
    ($(this.$refs.modal) as any).modal('hide');
  }

  cancel() {
    this.emitCancel();
    this.hide();
  }

  accept() {
    this.emitAccept();
    this.hide();
  }
}
</script>
