<template>
  <div class="profile-login-form">
    <div class="profile-login-zag">
      <h1 class="profile-login-zag__title">Connect your wallet</h1>
      <div class="profile-login-zag__text">
        Connect with one of our available wallet providers.
      </div>
    </div>
    <div id="accordionExample" class="accordion profile-login-accordion">
      <div class="card profile-login__card">
        <div id="profile-login-accordion3_2" class="card-header">
          <button
            class="profile-login-accordion__link"
            type="button"
            data-toggle="collapse"
            data-target="#profile-login-accordion3"
            aria-expanded="false"
            aria-controls="profile-login-accordion3"
          >
            <div class="thumb">
              <img src="@/assets/img/profile-login-accordion_img3.svg" alt="" />
            </div>
            <span> Polygon </span>
            <ConnectCollapseIcon />
          </button>
        </div>

        <div
          id="profile-login-accordion3"
          class="collapse"
          aria-labelledby="profile-login-accordion3_2"
          data-parent="#accordionExample"
        >
          <div class="profile-login-accordion__body">
            <ul class="profile-login__list">
              <li>
                <a
                  href="#"
                  role="button"
                  @click.prevent="
                    connectToProvider(EMainChain.polygon, EProvider.metamask)
                  "
                >
                  <div class="thumb">
                    <img
                      src="@/assets/img-custom/profile-login__list_img1_2x.png"
                      alt=""
                    />
                  </div>
                  <span> Metamask </span>
                </a>
              </li>
              <li class="profile-login__list__walletconnect">
                <a
                  href="#"
                  role="button"
                  @click.prevent="
                    connectToProvider(
                      EMainChain.polygon,
                      EProvider.walletConnect,
                    )
                  "
                >
                  <div class="thumb">
                    <img
                      src="@/assets/img-custom/profile-login__list_img2_2x.png"
                      alt=""
                    />
                  </div>
                  <span> WalletConnect </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  role="button"
                  @click.prevent="
                    connectToProvider(EMainChain.polygon, EProvider.okex)
                  "
                >
                  <div class="thumb">
                    <img
                      src="@/assets/img-custom/profile-login__list_img3_2x.png"
                      alt=""
                    />
                  </div>
                  <span> OKX Wallet </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import { authModule } from '~/store';
import {
  EAlertType,
  EChainSlug,
  ELocalStorageKey,
  EMainChain,
  EProvider,
} from '~/types';
import { networkHelper } from '~/utils/networkHelper';
import { popoverHintInit, popoverHintDestroy } from '~/utils/popoverHint';
import ConnectCollapseIcon from '~/components/icon/connect/ConnectCollapseIcon.vue';
import { notify } from '~/utils/notify';

@Component({
  components: {
    ConnectCollapseIcon,
  },
})
export default class ConnectForm extends Vue {
  EChainSlug = EChainSlug;
  EMainChain = EMainChain;
  EProvider = EProvider;

  get authChainSlug(): string {
    return authModule.chainSlug;
  }

  $refs!: {
    hintRef: HTMLDivElement;
  };

  @Watch('authChainSlug')
  onAuthNetworkTypeChange(slug: EChainSlug) {
    this.collapseChain(slug);
  }

  mounted() {
    this.collapseChain(this.authChainSlug as EChainSlug);

    /** подсказка для connect */

    this.connectHint();
  }

  beforeDestroy() {
    this.destroyConnectHint();
  }

  collapseChain(slug: EChainSlug) {
    const elementMap = new Map<EChainSlug, string>().set(
      EChainSlug.polygon,
      '#profile-login-accordion3',
    );

    const element = elementMap.get(slug);
    element && ($(element) as any).collapse('show');
  }

  connectHint() {
    const completed = localStorage.getItem(
      ELocalStorageKey.onboardingConnectHint,
    );

    if (completed) {
      return;
    }

    popoverHintInit(this.$refs.hintRef, {
      title: 'Attention',
      content: 'Select a network and log in to continue onboarding',
      onClose: () => {
        localStorage.setItem(ELocalStorageKey.onboardingConnectHint, 'done');
      },
    });
  }

  destroyConnectHint() {
    popoverHintDestroy(this.$refs.hintRef);
  }

  async connectToProvider(chain: EChainSlug, provider: EProvider) {
    const response = await authModule.connectToProvider({
      chain,
      provider,
    });

    if (response.status === 'error') {
      notify.send({
        type: EAlertType.error,
        title: response.message?.title,
        text: response.message?.text,
      });

      return;
    }

    /** редирект на профиль */

    const { connectData } = response;
    const address = connectData?.address;
    const chainSlug = networkHelper.getNetworkSlug(connectData?.chainId);

    this.$emit('success', {
      chainSlug,
      address,
    });
  }
}
</script>
