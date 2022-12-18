<template>
  <section class="profile-login height-full">
    <div class="container">
      <div class="profile-login-zag">
        <h1 class="profile-login-zag__title">Connect your wallet</h1>
        <div class="profile-login-zag__text">
          Connect with one of our available wallet providers.
        </div>
      </div>
      <div id="accordionExample" class="accordion profile-login-accordion">
        <div class="card profile-login__card">
          <div
            id="profile-login-accordion1_2"
            ref="hintRef"
            class="card-header"
            data-toggle="popover"
          >
            <button
              class="profile-login-accordion__link"
              type="button"
              data-toggle="collapse"
              data-target="#profile-login-accordion1"
              aria-expanded="true"
              aria-controls="profile-login-accordion1"
            >
              <div class="thumb">
                <img
                  src="@/assets/img/profile-login-accordion_img1.svg"
                  alt=""
                />
              </div>
              <span> Ethereum </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9753 12.7293L8.43529 9.18928C8.24793 9.00303 7.99448 8.89849 7.73029 8.89849C7.4661 8.89849 7.21265 9.00303 7.02529 9.18928C6.93156 9.28225 6.85717 9.39285 6.8064 9.51471C6.75563 9.63656 6.72949 9.76727 6.72949 9.89928C6.72949 10.0313 6.75563 10.162 6.8064 10.2839C6.85717 10.4057 6.93156 10.5163 7.02529 10.6093L11.2653 14.8493C11.3583 14.943 11.4689 15.0174 11.5907 15.0682C11.7126 15.1189 11.8433 15.1451 11.9753 15.1451C12.1073 15.1451 12.238 15.1189 12.3599 15.0682C12.4817 15.0174 12.5923 14.943 12.6853 14.8493L16.9753 10.6093C17.068 10.5158 17.1413 10.405 17.1911 10.2832C17.2408 10.1614 17.2661 10.0309 17.2653 9.89928C17.2661 9.76768 17.2408 9.63721 17.1911 9.51538C17.1413 9.39354 17.068 9.28272 16.9753 9.18928C16.7879 9.00303 16.5345 8.89849 16.2703 8.89849C16.0061 8.89849 15.7527 9.00303 15.5653 9.18928L11.9753 12.7293Z"
                  fill="#687684"
                />
              </svg>
            </button>
          </div>

          <div
            id="profile-login-accordion1"
            class="collapse show"
            aria-labelledby="profile-login-accordion1_2"
            data-parent="#accordionExample"
          >
            <div class="profile-login-accordion__body">
              <ul class="profile-login__list">
                <li>
                  <a
                    href="#"
                    role="button"
                    @click.prevent="
                      connectToProvider(EMainChain.eth, EProvider.metamask)
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
                      connectToProvider(EMainChain.eth, EProvider.walletConnect)
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
                      connectToProvider(EMainChain.eth, EProvider.okex)
                    "
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img-custom/profile-login__list_img3_2x.png"
                        alt=""
                      />
                    </div>
                    <span> MetaX Wallet </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card profile-login__card">
          <div id="profile-login-accordion2_2" class="card-header">
            <button
              class="profile-login-accordion__link"
              type="button"
              data-toggle="collapse"
              data-target="#profile-login-accordion2"
              aria-expanded="false"
              aria-controls="profile-login-accordion2"
            >
              <div class="thumb">
                <img
                  src="@/assets/img/profile-login-accordion_img2.svg"
                  alt=""
                />
              </div>
              <span> Binance Smart Chain </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9753 12.7293L8.43529 9.18928C8.24793 9.00303 7.99448 8.89849 7.73029 8.89849C7.4661 8.89849 7.21265 9.00303 7.02529 9.18928C6.93156 9.28225 6.85717 9.39285 6.8064 9.51471C6.75563 9.63656 6.72949 9.76727 6.72949 9.89928C6.72949 10.0313 6.75563 10.162 6.8064 10.2839C6.85717 10.4057 6.93156 10.5163 7.02529 10.6093L11.2653 14.8493C11.3583 14.943 11.4689 15.0174 11.5907 15.0682C11.7126 15.1189 11.8433 15.1451 11.9753 15.1451C12.1073 15.1451 12.238 15.1189 12.3599 15.0682C12.4817 15.0174 12.5923 14.943 12.6853 14.8493L16.9753 10.6093C17.068 10.5158 17.1413 10.405 17.1911 10.2832C17.2408 10.1614 17.2661 10.0309 17.2653 9.89928C17.2661 9.76768 17.2408 9.63721 17.1911 9.51538C17.1413 9.39354 17.068 9.28272 16.9753 9.18928C16.7879 9.00303 16.5345 8.89849 16.2703 8.89849C16.0061 8.89849 15.7527 9.00303 15.5653 9.18928L11.9753 12.7293Z"
                  fill="#687684"
                />
              </svg>
            </button>
          </div>

          <div
            id="profile-login-accordion2"
            class="collapse"
            aria-labelledby="profile-login-accordion2_2"
            data-parent="#accordionExample"
          >
            <div class="profile-login-accordion__body">
              <ul class="profile-login__list">
                <li>
                  <a
                    href="#"
                    role="button"
                    @click.prevent="
                      connectToProvider(EMainChain.bsc, EProvider.metamask)
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
                <li>
                  <a
                    href="#"
                    role="button"
                    @click.prevent="
                      connectToProvider(EMainChain.bsc, EProvider.bscWallet)
                    "
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img-custom/profile-login__list_img4_2x.svg"
                        alt=""
                      />
                    </div>
                    <span> BSC Wallet </span>
                  </a>
                </li>
                <li class="profile-login__list__walletconnect">
                  <a
                    href="#"
                    role="button"
                    @click.prevent="
                      connectToProvider(EMainChain.bsc, EProvider.walletConnect)
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
                      connectToProvider(EMainChain.bsc, EProvider.okex)
                    "
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img-custom/profile-login__list_img3_2x.png"
                        alt=""
                      />
                    </div>
                    <span> MetaX Wallet </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
                <img
                  src="@/assets/img/profile-login-accordion_img3.svg"
                  alt=""
                />
              </div>
              <span> Polygon </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9753 12.7293L8.43529 9.18928C8.24793 9.00303 7.99448 8.89849 7.73029 8.89849C7.4661 8.89849 7.21265 9.00303 7.02529 9.18928C6.93156 9.28225 6.85717 9.39285 6.8064 9.51471C6.75563 9.63656 6.72949 9.76727 6.72949 9.89928C6.72949 10.0313 6.75563 10.162 6.8064 10.2839C6.85717 10.4057 6.93156 10.5163 7.02529 10.6093L11.2653 14.8493C11.3583 14.943 11.4689 15.0174 11.5907 15.0682C11.7126 15.1189 11.8433 15.1451 11.9753 15.1451C12.1073 15.1451 12.238 15.1189 12.3599 15.0682C12.4817 15.0174 12.5923 14.943 12.6853 14.8493L16.9753 10.6093C17.068 10.5158 17.1413 10.405 17.1911 10.2832C17.2408 10.1614 17.2661 10.0309 17.2653 9.89928C17.2661 9.76768 17.2408 9.63721 17.1911 9.51538C17.1413 9.39354 17.068 9.28272 16.9753 9.18928C16.7879 9.00303 16.5345 8.89849 16.2703 8.89849C16.0061 8.89849 15.7527 9.00303 15.5653 9.18928L11.9753 12.7293Z"
                  fill="#687684"
                />
              </svg>
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
                    <span> MetaX Wallet </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card profile-login__card profile-login__card_tron">
          <div id="profile-login-accordion4_2" class="card-header">
            <button
              class="profile-login-accordion__link"
              type="button"
              data-toggle="collapse"
              data-target="#profile-login-accordion4"
              aria-expanded="false"
              aria-controls="profile-login-accordion4"
            >
              <div class="thumb">
                <img
                  src="@/assets/img/profile-login-accordion_img4.svg"
                  alt=""
                />
              </div>
              <span> Tron </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9753 12.7293L8.43529 9.18928C8.24793 9.00303 7.99448 8.89849 7.73029 8.89849C7.4661 8.89849 7.21265 9.00303 7.02529 9.18928C6.93156 9.28225 6.85717 9.39285 6.8064 9.51471C6.75563 9.63656 6.72949 9.76727 6.72949 9.89928C6.72949 10.0313 6.75563 10.162 6.8064 10.2839C6.85717 10.4057 6.93156 10.5163 7.02529 10.6093L11.2653 14.8493C11.3583 14.943 11.4689 15.0174 11.5907 15.0682C11.7126 15.1189 11.8433 15.1451 11.9753 15.1451C12.1073 15.1451 12.238 15.1189 12.3599 15.0682C12.4817 15.0174 12.5923 14.943 12.6853 14.8493L16.9753 10.6093C17.068 10.5158 17.1413 10.405 17.1911 10.2832C17.2408 10.1614 17.2661 10.0309 17.2653 9.89928C17.2661 9.76768 17.2408 9.63721 17.1911 9.51538C17.1413 9.39354 17.068 9.28272 16.9753 9.18928C16.7879 9.00303 16.5345 8.89849 16.2703 8.89849C16.0061 8.89849 15.7527 9.00303 15.5653 9.18928L11.9753 12.7293Z"
                  fill="#687684"
                />
              </svg>
            </button>
          </div>

          <div
            id="profile-login-accordion4"
            class="collapse"
            aria-labelledby="profile-login-accordion4_2"
            data-parent="#accordionExample"
          >
            <div class="profile-login-accordion__body">
              <ul class="profile-login__list">
                <li>
                  <a
                    href="#"
                    role="button"
                    @click.prevent="
                      connectToProvider(EMainChain.tron, EProvider.tron)
                    "
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img-custom/profile-login__list_img5_2x.png"
                        alt=""
                      />
                    </div>
                    <span> TronLink </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card profile-login__card profile-login__card_solana">
          <div id="profile-login-accordion5_2" class="card-header">
            <button
              class="profile-login-accordion__link"
              type="button"
              data-toggle="collapse"
              data-target="#profile-login-accordion5"
              aria-expanded="false"
              aria-controls="profile-login-accordion5"
            >
              <div class="thumb">
                <img
                  src="@/assets/img/profile-login-accordion_img5.svg"
                  alt=""
                />
              </div>
              <span> Solana </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9753 12.7293L8.43529 9.18928C8.24793 9.00303 7.99448 8.89849 7.73029 8.89849C7.4661 8.89849 7.21265 9.00303 7.02529 9.18928C6.93156 9.28225 6.85717 9.39285 6.8064 9.51471C6.75563 9.63656 6.72949 9.76727 6.72949 9.89928C6.72949 10.0313 6.75563 10.162 6.8064 10.2839C6.85717 10.4057 6.93156 10.5163 7.02529 10.6093L11.2653 14.8493C11.3583 14.943 11.4689 15.0174 11.5907 15.0682C11.7126 15.1189 11.8433 15.1451 11.9753 15.1451C12.1073 15.1451 12.238 15.1189 12.3599 15.0682C12.4817 15.0174 12.5923 14.943 12.6853 14.8493L16.9753 10.6093C17.068 10.5158 17.1413 10.405 17.1911 10.2832C17.2408 10.1614 17.2661 10.0309 17.2653 9.89928C17.2661 9.76768 17.2408 9.63721 17.1911 9.51538C17.1413 9.39354 17.068 9.28272 16.9753 9.18928C16.7879 9.00303 16.5345 8.89849 16.2703 8.89849C16.0061 8.89849 15.7527 9.00303 15.5653 9.18928L11.9753 12.7293Z"
                  fill="#687684"
                />
              </svg>
            </button>
          </div>

          <div
            id="profile-login-accordion5"
            class="collapse"
            aria-labelledby="profile-login-accordion5_2"
            data-parent="#accordionExample"
          >
            <div class="profile-login-accordion__body">
              <ul class="profile-login__list">
                <li>
                  <a
                    href="#"
                    role="button"
                    @click.prevent="
                      connectToProvider(EMainChain.solana, EProvider.phantom)
                    "
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img-custom/profile-login__list_img6_2x.png"
                        alt=""
                      />
                    </div>
                    <span> Phantom </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import { authModule } from '~/store';
import { EChainSlug, EMainChain, EProvider } from '~/types';
import { networkHelper } from '~/utils/networkHelper';
import { popoverHintInit, popoverHintDestroy } from '~/utils/popoverHint';

@Component({
  head: {
    title: 'Connect your wallet | Crypto.Page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Connect with one of our available wallet providers or create a new one.',
      },
    ],
  },
})
export default class ConnectPage extends Vue {
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
    const elementMap = new Map<EChainSlug, string>()
      .set(EChainSlug.eth, '#profile-login-accordion1')
      .set(EChainSlug.bsc, '#profile-login-accordion2')
      .set(EChainSlug.polygon, '#profile-login-accordion3')
      .set(EChainSlug.tron, '#profile-login-accordion4')
      .set(EChainSlug.solana, '#profile-login-accordion5');

    const element = elementMap.get(slug);
    element && ($(element) as any).collapse('show');
  }

  connectHint() {
    const completed = localStorage.getItem('onboarding-connect-hint');

    if (completed) {
      return;
    }

    popoverHintInit(this.$refs.hintRef, {
      title: 'Attention',
      content: 'Select a network and log in to continue onboarding',
      onClose: () => {
        localStorage.setItem('onboarding-connect-hint', 'done');
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
      this.$notify({
        type: response.status,
        title: response.message?.title,
        text: response.message?.text,
      });

      return;
    }

    /** редирект на профиль */

    const { connectData } = response;
    const address = connectData?.address;
    const chainSlug = networkHelper.getNetworkSlug(connectData?.chainId);

    this.$router.push(`/${chainSlug}/${address}`);
  }
}
</script>
