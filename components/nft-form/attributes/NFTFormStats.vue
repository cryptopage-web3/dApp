<template>
  <div class="tweet-add__attribute">
    <div class="tweet-add__attribute-header" @click="toggle">
      <div class="tweet-add__attribute-header-icon">
        <font-awesome-icon :icon="['fas', 'chart-area']" />
      </div>
      <div class="tweet-add__attribute-header-title">Stats</div>
      <div class="tweet-add__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
    <div v-show="isShow" class="tweet-add__attribute-container">
      <stat
        v-for="stat in localStats"
        :key="stat.id"
        :stat="stat"
        @remove="removeStat(stat.id)"
        @change="statChangeHandler(stat.id, $event)"
      />
      <div class="tweet-add__stat tweet-add__stat_add" @click="addStat">
        <font-awesome-icon :icon="['fas', 'plus-circle']" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    stat: async () =>
      await import('@/components/nft-form/attributes/NFTFormStat.vue')
  },
  props: {
    stats: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: false,
      localStats: []
    }
  },
  watch: {
    stats: {
      handler(stats) {
        if (JSON.stringify(stats) === JSON.stringify(this.localStats)) {
          return
        }

        this.localStats = stats
      },
      immediate: true
    },

    localStats(stats) {
      this.$emit('change', stats)
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    },

    addStat() {
      this.localStats.push({
        id: Number(new Date())
      })
    },

    removeStat(statId) {
      this.localStats = this.localStats.filter(({ id }) => id !== statId)
    },

    statChangeHandler(statId, data) {
      this.localStats = this.localStats.map((item) =>
        item.id === statId
          ? {
              ...item,
              type: data.type,
              value: data.value,
              maxValue: data.maxValue
            }
          : item
      )
    }
  }
}
</script>
