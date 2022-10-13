<template>
  <div
    id="onboarding-modal-step5"
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
            <div class="global-text_12 text-uppercase mb_10">Step 5 of 5</div>
            <h3 class="global-zag mb_xl_20 mb_md_15 mb_10">Your first post</h3>
            <div class="global-text_12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              congue volutpat mauris, ac scelerisque ante feugiat a.
            </div>
            <div class="form-creat mt_md_20 mt_10 mb-0 pb_md_20 pb_10">
              <input
                type="text"
                placeholder="Enter title"
                class="form-creat__name"
              />
              <div class="form-creat-textarea-wrap" style="display: block">
                <textarea class="form-creat__text" placeholder="Enter text" />
              </div>
              <div class="form-creat-bottom">
                <div class="form-creat-nav">
                  <a href="#" class="form-creat-nav-item stroke">
                    <NftFormAudioIcon />
                  </a>
                  <a href="#" class="form-creat-nav-item all">
                    <NftFormImageIcon />
                  </a>
                  <a href="#" class="form-creat-nav-item all">
                    <NftFormVideoIcon />
                  </a>
                </div>
              </div>
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
                class="btn btn-blue_button btn_large pr_30 pl_30"
                @click.prevent="next"
              >
                Public
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
import NftFormAudioIcon from '~/components/icon/nft-form/NftFormAudioIcon.vue';
import NftFormImageIcon from '~/components/icon/nft-form/NftFormImageIcon.vue';
import NftFormVideoIcon from '~/components/icon/nft-form/NftFormVideoIcon.vue';

@Component({
  components: {
    NftFormAudioIcon,
    NftFormImageIcon,
    NftFormVideoIcon,
  },
})
export default class OnboardingStep5 extends Vue {
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
