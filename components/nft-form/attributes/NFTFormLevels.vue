<template>
  <div class="tweet-add__attribute">
    <div class="tweet-add__attribute-header" @click="toggle">
      <div class="tweet-add__attribute-header-icon">
        <font-awesome-icon :icon="['fas', 'star']" />
      </div>
      <div class="tweet-add__attribute-header-title">Levels</div>
      <div class="tweet-add__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
    <div v-show="isShow" class="tweet-add__attribute-container">
      <level
        v-for="level in localLevels"
        :key="level.id"
        :level="level"
        @remove="removeLevel(level.id)"
        @change="levelChangeHandler(level.id, $event)"
      />
      <div class="tweet-add__level tweet-add__level_add" @click="addLevel">
        <font-awesome-icon :icon="['fas', 'plus-circle']" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    level: async () =>
      await import('@/components/nft-form/attributes/NFTFormLevel.vue')
  },
  props: {
    levels: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: false,
      localLevels: []
    }
  },
  watch: {
    levels: {
      handler(levels) {
        if (JSON.stringify(levels) === JSON.stringify(this.localLevels)) {
          return
        }

        this.localLevels = levels
      },
      immediate: true
    },

    localLevels(levels) {
      this.$emit('change', levels)
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    },

    addLevel() {
      this.localLevels.push({
        id: Number(new Date())
      })
    },

    removeLevel(levelId) {
      this.localLevels = this.localLevels.filter(({ id }) => id !== levelId)
    },

    levelChangeHandler(levelId, data) {
      this.localLevels = this.localLevels.map((item) =>
        item.id === levelId
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
