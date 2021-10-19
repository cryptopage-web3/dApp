<template>
  <div class="nft-form__attribute">
    <div class="nft-form__attribute-header" @click="toggle">
      <div
        ref="icon"
        class="nft-form__attribute-header-icon"
        title="Numerical traits that just show as numbers"
      >
        <font-awesome-icon :icon="['fas', 'chart-area']" />
      </div>
      <div class="nft-form__attribute-header-title">Stats</div>
      <div class="nft-form__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
    <div v-show="isShow" class="nft-form__attribute-container">
      <stat
        v-for="stat in localStats"
        :key="stat.id"
        :stat="stat"
        @remove="removeStat(stat.id)"
        @change="statChangeHandler(stat.id, $event)"
      />
      <div class="nft-form__stat nft-form__stat_add" @click="addStat">
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
  mounted() {
    this.$nextTick(() => {
      $(this.$refs.icon).tooltip({
        trigger: 'hover'
      })
    })
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
