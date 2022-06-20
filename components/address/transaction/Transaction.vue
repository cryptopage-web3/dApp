<template>
  <div class="profile-activity">
    <div class="profile-content-top">
      <div class="profile-content__user">
        <nuxt-link
          :to="`/${chainSlug}/${transactionAddress}`"
          class="profile-content__user-icon"
        >
          <jazzicon
            :seed="10211"
            :address="transactionAddress"
            :diameter="30"
          />
        </nuxt-link>
        <div>
          txid:
          <span ref="hash" @click.prevent="copyHash">
            {{ transaction.hash | shortAddress(5, 7) }}
          </span>
        </div>
      </div>
      <div class="right">
        <div class="profile-content__date">
          {{ transaction.date | formatDate }}
        </div>

        <TransactionDropdown :transaction="transaction" />
      </div>
    </div>
    <table class="profile-activity__table">
      <tbody>
        <tr class="profile-activity__top">
          <td>
            <svg
              v-if="income"
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.606002 5.95453L10.1505 0.416527C10.9605 -0.0529729 12 0.515527 12 1.46203L12 12.538C12 13.483 10.962 14.053 10.1505 13.582L0.606001 8.04403C0.421745 7.93884 0.268584 7.7868 0.162053 7.60332C0.0555225 7.41983 -0.000588799 7.21144 -0.000588781 6.99928C-0.000588762 6.78711 0.0555226 6.57872 0.162053 6.39524C0.268584 6.21176 0.421745 6.05971 0.606002 5.95453Z"
                fill="#1886FF"
              />
            </svg>
            <svg
              v-else
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.394 8.04547L1.8495 13.5835C1.0395 14.053 0 13.4845 0 12.538L0 1.46197C0 0.516973 1.038 -0.0530275 1.8495 0.417973L11.394 5.95597C11.5783 6.06116 11.7314 6.2132 11.8379 6.39668C11.9445 6.58017 12.0006 6.78856 12.0006 7.00072C12.0006 7.21289 11.9445 7.42128 11.8379 7.60476C11.7314 7.78824 11.5783 7.94029 11.394 8.04547Z"
                fill="#FF1818"
              ></path>
            </svg>
            {{ income ? 'Receive' : 'Send' }} {{ transaction.tokenSymbol }}
          </td>
          <td>
            <span :title="transaction.value">
              {{ transaction.value | formatNumber(15) }}
              {{ transaction.tokenSymbol }}
            </span>
          </td>
        </tr>
        <tr class="profile-activity__bottom">
          <td>
            {{ income ? 'From' : 'To' }}:
            <nuxt-link :to="`/${chainSlug}/${transactionAddress}`">
              {{ transactionAddress | shortAddress }}
            </nuxt-link>
          </td>
          <td>
            <span :title="transaction.valueUSD">
              $ {{ transaction.valueUSD | formatNumberFloatDigits }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { ITransaction } from '~/types';
import { addressModule } from '~/store';
import { copyToClipboard } from '~/utils/copyToClipboard';
import TransactionDropdown from '~/components/address/transaction/TransactionDropdown.vue';

type TTransaction = ITransaction;

@Component({
  components: {
    TransactionDropdown,
  },
})
export default class Transaction extends Vue {
  @Prop({ required: true })
  readonly transaction!: TTransaction;

  $refs!: {
    hash: HTMLAnchorElement;
  };

  get chainSlug(): string {
    return addressModule.chainSlug;
  }

  get income(): boolean {
    const address = addressModule.address.toLowerCase();
    const to = this.transaction.to.toLowerCase();

    return to === address;
  }

  get transactionAddress(): string {
    return this.income ? this.transaction.from : this.transaction.to;
  }

  mounted() {
    this.$nextTick(() => {
      ($(this.$refs.hash) as any).tooltip({
        trigger: 'hover',
        title: 'Click to copy',
      });
    });
  }

  copyHash() {
    copyToClipboard(this.transaction.hash);
    ($(this.$refs.hash) as any).tooltip('hide');

    this.$notify({
      type: 'success',
      title: 'Transaction Hash copied to clipboard',
    });
  }
}
</script>
