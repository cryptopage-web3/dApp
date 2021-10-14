<template>
  <div class="tweet-add__attribute">
    <div class="tweet-add__attribute-header" @click="toggle">
      <div class="tweet-add__attribute-header-icon">
        <font-awesome-icon :icon="['fas', 'bolt']" />
      </div>
      <div class="tweet-add__attribute-header-title">Boosts</div>
      <div class="tweet-add__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
    <div v-show="isShow" class="tweet-add__attribute-container">
      <boost
        v-for="boost in localBoosts"
        :key="boost.id"
        :boost="boost"
        @remove="removeBoost(boost.id)"
        @change="boostChangeHandler(boost.id, $event)"
      />
      <div class="tweet-add__boost tweet-add__boost_add" @click="addBoost">
        <font-awesome-icon :icon="['fas', 'plus-circle']" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    boost: async () =>
      await import('@/components/nft-form/attributes/NFTFormBoost.vue')
  },
  props: {
    boosts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: false,
      localBoosts: []
    }
  },
  watch: {
    boosts: {
      handler(boosts) {
        if (JSON.stringify(boosts) === JSON.stringify(this.localBoosts)) {
          return
        }

        this.localBoosts = boosts
      },
      immediate: true
    },

    localBoosts(boosts) {
      this.$emit('change', boosts)
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    },

    addBoost() {
      this.localBoosts.push({
        id: Number(new Date())
      })
    },

    removeBoost(boostId) {
      this.localBoosts = this.localBoosts.filter(({ id }) => id !== boostId)
    },

    boostChangeHandler(boostId, data) {
      this.localBoosts = this.localBoosts.map((item) =>
        item.id === boostId
          ? {
              ...item,
              displayType: data.displayType,
              type: data.type,
              value: data.value
            }
          : item
      )
    }
  }
}
</script>
