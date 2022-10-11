<template>
  <div>
    <OnboardingWelcome ref="welcome" @skip="skip" @next="next" />
    <OnboardingStep1 ref="step1" @skip="skip" @next="next" />
    <OnboardingStep2 ref="step2" @skip="skip" @next="next" />
    <OnboardingStep3 ref="step3" @skip="skip" @next="next" />
    <OnboardingStep4 ref="step4" @skip="skip" @next="next" />
    <OnboardingStep5 ref="step5" @skip="skip" @next="next" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import OnboardingWelcome from './OnboardingWelcome.vue';
import OnboardingStep1 from './OnboardingStep1.vue';
import OnboardingStep2 from './OnboardingStep2.vue';
import OnboardingStep3 from './OnboardingStep3.vue';
import OnboardingStep4 from './OnboardingStep4.vue';
import OnboardingStep5 from './OnboardingStep5.vue';

type TRefs = {
  welcome: OnboardingWelcome;
  step1: OnboardingStep1;
  step2: OnboardingStep2;
  step3: OnboardingStep3;
  step4: OnboardingStep4;
  step5: OnboardingStep5;
};

const steps: (keyof TRefs)[] = [
  'welcome',
  'step1',
  'step2',
  'step3',
  'step4',
  'step5',
];

@Component({
  components: {
    OnboardingWelcome,
    OnboardingStep1,
    OnboardingStep2,
    OnboardingStep3,
    OnboardingStep4,
    OnboardingStep5,
  },
})
export default class OnboardingModals extends Vue {
  step: keyof TRefs = 'welcome';

  $refs!: TRefs;

  mounted() {
    this.$refs[this.step].show();
  }

  skip() {
    // debugger;
  }

  next() {
    const currentIndex = steps.findIndex((item) => item === this.step);

    /** не найдено */

    if (currentIndex === -1) {
      return;
    }

    /** последний шаг */

    if (!steps[currentIndex + 1]) {
      return;
    }

    this.step = steps[currentIndex + 1];
  }
}
</script>
