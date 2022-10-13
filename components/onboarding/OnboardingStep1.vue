<template>
  <div
    id="onboarding-modal-step1"
    ref="modal"
    class="modal fade global-modal onboarding-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="global-modal-body">
            <div class="global-text_12 text-uppercase mb_10">Step 1 of 5</div>
            <h3 class="global-zag mb_xl_20 mb_md_15 mb_10">
              What is your name?
            </h3>
            <div class="global-text_12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              congue volutpat mauris, ac scelerisque ante feugiat a.
            </div>
            <div class="form-field mt_md_20 mt_10">
              <div class="form-field__title">Your name</div>
              <input
                type="text"
                class="w-100 global-input global-input_large"
                placeholder="Enter your name"
              />
            </div>
            <div
              class="onboarding-welcome-btns d-flex align-items-center justify-content-center mt_md_20 mt_10"
            >
              <a
                href="#"
                role="button"
                data-dismiss="modal"
                class="btn btn-blue-transparent_button btn_large mr_20 pr_30 pl_30"
                @click.prevent="skip"
              >
                Skip
              </a>
              <a
                href="#"
                role="button"
                data-toggle="modal"
                data-target="#onboarding-modal-step2"
                data-dismiss="modal"
                class="btn btn-blue_button btn_large pr_30 pl_30"
                @click.prevent="next"
              >
                Next
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
import { Component, Emit } from 'nuxt-property-decorator';

@Component({})
export default class OnboardingStep1 extends Vue {
  $refs!: {
    modal: HTMLDivElement;
  };

  // emit

  @Emit('skip')
  emitSkip() {
    return true;
  }

  @Emit('next')
  emitNext() {
    return true;
  }

  // methods

  show() {
    ($(this.$refs.modal) as any).modal('show');
  }

  hide() {
    ($(this.$refs.modal) as any).modal('hide');
  }

  skip() {
    this.emitSkip();
    this.hide();
  }

  next() {
    this.emitNext();
    this.hide();
  }
}
</script>
