<template>
  <div id="accordionExample" class="accordion profile-login-accordion mt_30">
    <div class="card profile-login__card">
      <div id="profile-login-accordion1_2" class="card-header">
        <button
          class="profile-login-accordion__link"
          type="button"
          data-toggle="collapse"
          data-target="#profile-login-accordion1"
          aria-expanded="true"
          aria-controls="profile-login-accordion1"
        >
          <div class="thumb">
            <img src="@/assets/img/profile-login-accordion_img1.svg" alt="" />
          </div>
          <span> Ethereum </span>
          <ConnectCollapseIcon />
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
                <span> OKX Wallet </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card profile-login__card">
      <div id="profile-login-accordion9_2" class="card-header">
        <button
          class="profile-login-accordion__link"
          type="button"
          data-toggle="collapse"
          data-target="#profile-login-accordion9"
          aria-expanded="false"
          aria-controls="profile-login-accordion9"
        >
          <div class="thumb">
            <img
              src="@/assets/img-custom/profile-login-accordion_img9.png"
              alt=""
            />
          </div>
          <span> Goerli </span>
          <ConnectCollapseIcon />
        </button>
      </div>

      <div
        id="profile-login-accordion9"
        class="collapse"
        aria-labelledby="profile-login-accordion9_2"
        data-parent="#accordionExample"
      >
        <div class="profile-login-accordion__body">
          <ul class="profile-login__list">
            <li>
              <a
                href="#"
                role="button"
                @click.prevent="
                  connectToProvider(EMainChain.goerli, EProvider.metamask)
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
                  connectToProvider(EMainChain.goerli, EProvider.walletConnect)
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
                  connectToProvider(EMainChain.goerli, EProvider.okex)
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
            <img src="@/assets/img/profile-login-accordion_img2.svg" alt="" />
          </div>
          <span> Binance Smart Chain </span>
          <ConnectCollapseIcon />
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
                <span> OKX Wallet </span>
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
                  connectToProvider(EMainChain.polygon, EProvider.walletConnect)
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
            <img src="@/assets/img/profile-login-accordion_img4.svg" alt="" />
          </div>
          <span> Tron </span>
          <ConnectCollapseIcon />
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
            <img src="@/assets/img/profile-login-accordion_img5.svg" alt="" />
          </div>
          <span> Solana </span>
          <ConnectCollapseIcon />
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

    <div class="card profile-login__card">
      <div id="profile-login-accordion6_2" class="card-header">
        <button
          class="profile-login-accordion__link"
          disabled="disabled"
          type="button"
          data-toggle="collapse"
          data-target="#profile-login-accordion6"
          aria-expanded="false"
          aria-controls="profile-login-accordion6"
        >
          <div class="thumb">
            <img src="@/assets/img/profile-login-accordion_img6.svg" alt="" />
          </div>
          <span class="light_grey"> Toncoin </span>
          <div class="ml-auto global-text_14 light_grey mr_10">
            Comming soon
          </div>
          <ConnectCollapseIcon />
        </button>
      </div>

      <div
        id="profile-login-accordion6"
        class="collapse"
        aria-labelledby="profile-login-accordion6_2"
        data-parent="#accordionExample"
      >
        <div class="profile-login-accordion__body"></div>
      </div>
    </div>
    <div class="card profile-login__card">
      <div id="profile-login-accordion7_2" class="card-header">
        <button
          class="profile-login-accordion__link"
          disabled="disabled"
          type="button"
          data-toggle="collapse"
          data-target="#profile-login-accordion7"
          aria-expanded="false"
          aria-controls="profile-login-accordion7"
        >
          <div class="thumb">
            <img src="@/assets/img/profile-login-accordion_img7.svg" alt="" />
          </div>
          <span class="light_grey"> Arweave </span>
          <div class="ml-auto global-text_14 light_grey mr_10">
            Comming soon
          </div>
          <ConnectCollapseIcon />
        </button>
      </div>

      <div
        id="profile-login-accordion7"
        class="collapse"
        aria-labelledby="profile-login-accordion7_2"
        data-parent="#accordionExample"
      >
        <div class="profile-login-accordion__body"></div>
      </div>
    </div>
    <div class="card profile-login__card">
      <div id="profile-login-accordion8_2" class="card-header">
        <button
          class="profile-login-accordion__link"
          disabled="disabled"
          type="button"
          data-toggle="collapse"
          data-target="#profile-login-accordion8"
          aria-expanded="false"
          aria-controls="profile-login-accordion8"
        >
          <div class="thumb">
            <img src="@/assets/img/profile-login-accordion_img8.svg" alt="" />
          </div>
          <span class="light_grey"> Near </span>
          <div class="ml-auto global-text_14 light_grey mr_10">
            Comming soon
          </div>
          <ConnectCollapseIcon />
        </button>
      </div>

      <div
        id="profile-login-accordion8"
        class="collapse"
        aria-labelledby="profile-login-accordion8_2"
        data-parent="#accordionExample"
      >
        <div class="profile-login-accordion__body"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import { authModule } from '~/store';
import { EChainSlug, EMainChain, EProvider } from '~/types';
import { networkHelper } from '~/utils/networkHelper';
import ConnectCollapseIcon from '~/components/icon/connect/ConnectCollapseIcon.vue';

@Component({
  components: {
    ConnectCollapseIcon,
  },
})
export default class ConnectProviders extends Vue {
  EChainSlug = EChainSlug;
  EMainChain = EMainChain;
  EProvider = EProvider;

  get authChainSlug(): string {
    return authModule.chainSlug;
  }

  @Watch('authChainSlug')
  onAuthNetworkTypeChange(slug: EChainSlug) {
    this.collapseChain(slug);
  }

  mounted() {
    this.collapseChain(this.authChainSlug as EChainSlug);
  }

  collapseChain(slug: EChainSlug) {
    const elementMap = new Map<EChainSlug, string>()
      .set(EChainSlug.eth, '#profile-login-accordion1')
      .set(EChainSlug.bsc, '#profile-login-accordion2')
      .set(EChainSlug.polygon, '#profile-login-accordion3')
      .set(EChainSlug.tron, '#profile-login-accordion4')
      .set(EChainSlug.solana, '#profile-login-accordion5')
      .set(EChainSlug.goerli, '#profile-login-accordion9');

    const element = elementMap.get(slug);
    element && ($(element) as any).collapse('show');
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
