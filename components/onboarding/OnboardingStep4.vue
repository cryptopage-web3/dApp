<template>
  <div
    id="onboarding-modal-step4"
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
            <div class="global-text_12 text-uppercase mb_10">Step 4 of 5</div>
            <h3 class="global-zag mb_xl_20 mb_md_15 mb_10">
              Choose your interests
            </h3>
            <div class="global-text_12">Get better news recommedations</div>
            <div class="d-flex flex-wrap mt_md_20 mt_10">
              <div class="global-checkbox4 mb_md_10 mb_5 mr_10">
                <label>
                  <input
                    v-model="interests"
                    type="checkbox"
                    value="#Page_token"
                  />
                  <div class="global-checkbox4__wrap">#Page_token</div>
                </label>
              </div>
              <div class="global-checkbox4 mb_md_10 mb_5 mr_10">
                <label>
                  <input v-model="interests" type="checkbox" value="#NFT" />
                  <div class="global-checkbox4__wrap">#NFT</div>
                </label>
              </div>
              <div class="global-checkbox4 mb_md_10 mb_5 mr_10">
                <label>
                  <input v-model="interests" type="checkbox" value="#FitFi" />
                  <div class="global-checkbox4__wrap">#FitFi</div>
                </label>
              </div>
              <div class="global-checkbox4 mb_md_10 mb_5 mr_10">
                <label>
                  <input v-model="interests" type="checkbox" value="#Fintech" />
                  <div class="global-checkbox4__wrap">#Fintech</div>
                </label>
              </div>
              <div class="global-checkbox4 mb_md_10 mb_5 mr_10">
                <label>
                  <input
                    v-model="interests"
                    type="checkbox"
                    value="#Metaverse"
                  />
                  <div class="global-checkbox4__wrap">#Metaverse</div>
                </label>
              </div>
              <div class="global-checkbox4 mb_md_10 mb_5 mr_10">
                <label>
                  <input
                    v-model="interests"
                    type="checkbox"
                    value="#Microcivilization"
                  />
                  <div class="global-checkbox4__wrap">#Microcivilization</div>
                </label>
              </div>
              <div class="global-checkbox4 mb_md_10 mb_5 mr_10">
                <label>
                  <input v-model="interests" type="checkbox" value="#Guilds" />
                  <div class="global-checkbox4__wrap">#Guilds</div>
                </label>
              </div>
            </div>
            <div
              class="onboarding-welcome-btns d-flex align-items-center justify-content-center mt_md_10"
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
export default class OnboardingStep4 extends Vue {
  interests: string[] = [];

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
    if (!this.interests.length) {
      this.$notify({
        type: 'error',
        title: 'Choose your interests',
      });

      return;
    }

    this.emitNext();
    this.hide();
  }
}
</script>
