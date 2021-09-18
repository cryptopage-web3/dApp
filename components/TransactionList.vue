<template>
  <div class="transactions">
    <div v-show="showTotal" class="total">
      Total: <span class="text">{{ total }}</span>
    </div>
    <div v-for="item in paginatedItems" :key="item" class="item">
      <nuxt-link :to="`/web3/transactions/${item}`" class="link">
        {{ item }}
      </nuxt-link>
    </div>
    <div v-show="showControls" class="controls">
      <button v-if="showPrevious" @click="previous">Previous</button>
      <button v-if="showNext" @click="next">Next</button>
    </div>
  </div>
</template>
<script>
import { paginate } from '~/utils'
export default {
  props: {
    showTotal: {
      type: Boolean,
      default: true
    },
    showControls: {
      type: Boolean,
      default: true
    },
    block: {
      type: Object,
      default: () => ({})
    },
    transactions: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    page: 1,
    pageSize: 100
  }),
  computed: {
    items() {
      return this.block.transactions
        ? this.block.transactions
        : this.transactions
    },
    paginatedItems() {
      return paginate(this.items, this.page, this.pageSize)
    },
    total() {
      return this.items.length
    },
    showNext() {
      return this.total >= this.page * this.pageSize
    },
    showPrevious() {
      return this.page >= 2
    }
  },
  methods: {
    next() {
      if (!this.showNext) return
      this.page += 1
    },
    previous() {
      if (!this.showPrevious) return
      this.page -= 1
    }
  }
}
</script>
<style>
.transactions .total {
  margin: 1em 0;
}
.transactions .item {
  margin: 0.5em 0;
}
.transactions .controls {
  margin: 1em 0;
}
</style>
