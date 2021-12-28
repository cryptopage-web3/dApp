<template>
  <div class="white-post-top">
    <div class="post-date">
      <a href="#" class="post-date__link">
        <img src="@/assets/img/post-date__link_img2.svg" alt="" />
      </a>
      <div class="post-date__text">
        {{ transaction.timeStamp | normalizeDate }}
      </div>
    </div>
    <div class="white-post-id">
      {{ tokenSymbol | ucFirstLetter }}:
      <a href="#">{{ transaction.hash | shortAddress(5, 7) }}</a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
import NetworkNameMixin from '~/mixins/networkName'
@Component({})
export default class PostTop extends mixins(
  TransactionMixin,
  NetworkNameMixin
) {}
</script>
