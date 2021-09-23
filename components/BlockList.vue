<template>
  <div class="blocks">
    <div v-show="showTotal" class="total">
      Total: <span class="text">{{ total }}</span>
    </div>
    <div v-for="item in paginatedItems" :key="item" class="item">
      <nuxt-link :to="`/web3/blocks/${item}`" class="link">
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
import { _range, paginate } from '~/utils/array.ts'
export default {
  props: {
    showTotal: {
      type: Boolean,
      default: true
    },
    showControls: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    page: 1,
    pageSize: 10,
    blockNumber: 0
  }),
  computed: {
    total() {
      return this.blockNumber
    },
    items() {
      return this.blockNumber
        ? _range(this.blockNumber, this.blockNumber - this.pageSize * this.page)
        : []
    },
    paginatedItems() {
      return paginate(this.items, this.page, this.pageSize)
    },
    showNext() {
      return this.total >= this.page * this.pageSize
    },
    showPrevious() {
      return this.page >= 2
    }
  },
  async mounted() {
    await this.$nextTick(async () => {
      this.blockNumber = await this.$web3.eth.getBlockNumber()
    })
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
.blocks .total {
  margin: 1em 0;
}
.blocks .item {
  margin: 0.5em 0;
}
.blocks .controls {
  margin: 1em 0;
}
</style>
