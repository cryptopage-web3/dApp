<template>
  <div
    id="onboarding-modal1"
    ref="modal"
    class="modal fade global-modal onboarding-welcome"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-backdrop="static"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="onboarding-welcome__thumb-container">
            <img
              src="@/assets/img-custom/onboarding-welcome_img3.jpg"
              alt=""
              class="onboarding-welcome__thumb"
            />
            <img
              src="@/assets/img-custom/onboarding-welcome_img-title.svg"
              alt=""
              class="onboarding-welcome__thumb-title"
            />
          </div>
          <div class="global-modal-body">
            <h3 class="global-zag mb_xl_20 mb_md_15 mb_10">
              Create an account using your<br />
              web3 wallet!
            </h3>
            <div class="global-text_14">
              <p>
                Is an open platform that allows anyone to create their own
                decentralized profile pages that are resistant to censorship.
              </p>
              <p>
                With Crypto.Page, your wallet keys control your content the same
                way they control your funds.
                <a href="#" @click.prevent="">
                  <strong>Your keys = your content.</strong>
                </a>
              </p>
            </div>
            <div
              class="onboarding-welcome-btns d-flex align-items-center justify-content-center mt_md_20 mt_10"
            >
              <a
                href="#"
                role="button"
                class="btn btn-blue-transparent_button btn_large mr_20 pr_30 pl_30"
                @click.prevent="skip"
              >
                Skip
              </a>
              <a
                href="#"
                role="button"
                class="btn btn-blue_button btn_large pr_30 pl_30"
                @click.prevent="next"
              >
                Start
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
export default class OnboardingWelcome extends Vue {
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
    this.$router.push(`/connect`);

    this.emitNext();
    this.hide();
  }
}
</script>
