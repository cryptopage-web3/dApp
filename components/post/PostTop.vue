<template>
  <div class="white-post-top">
    <div class="post-date">
      <a href="#" class="post-date__link">
        <img src="@/assets/img/post-date__link_img.png" alt="" />
      </a>
      <div class="post-date__text">
        {{ transaction.timeStamp | humanizeDate }} ago
        {{ income ? ' to' : ' from' }} : {{ address | shortAddress }}
      </div>
    </div>
    <div class="white-post-id">
      Txn Hash: {{ transaction.hash | shortAddress(5, 7) }}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
@Component({})
export default class PostTop extends mixins(TransactionMixin) {}
</script>
