<template>
  <div class="profile-activity">
    <div class="profile-content-top">
      <div class="profile-content__user">
        <nuxt-link
          :to="`/${chainSlug}/${transaction.transactionAddress}`"
          class="profile-content__user-icon"
        >
          <jazzicon
            :seed="10211"
            :address="transaction.transactionAddress"
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
            <TransactionInIcon v-if="transaction.isIncome" />
            <TransactionOutIcon v-else />
            {{ transaction.transferType }}
            {{
              transaction.type !== 'contract_execution'
                ? transaction.tokenOrCoinSymbolLeft
                : ''
            }}
          </td>
          <td>
            <span :title="transaction.tokenOrCoinAmount">
              {{ transaction.tokenOrCoinAmount | formatNumber(15) }}
              {{ transaction.tokenOrCoinSymbolRight }}
            </span>
          </td>
        </tr>
        <tr class="profile-activity__bottom">
          <td>
            {{ transaction.transferDirection }}:
            <nuxt-link :to="`/${chainSlug}/${transaction.transactionAddress}`">
              {{ transaction.transactionAddress | shortAddress }}
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
import TransactionInIcon from '~/components/icon/transaction/TransactionInIcon.vue';
import TransactionOutIcon from '~/components/icon/transaction/TransactionOutIcon.vue';
import { notify } from '~/utils/notify';

type TTransaction = ITransaction;

@Component({
  components: {
    TransactionDropdown,
    TransactionInIcon,
    TransactionOutIcon,
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

  get chainSymbol(): string {
    return addressModule.chainSymbol;
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

    notify.success('Transaction Hash copied to clipboard');
  }
}
</script>
