<template>
  <div
    class="trend"
    :class="dropdown ? `disabled` : `` || deleted ? `deleted` : ``"
  >
    <div v-if="!deleted" class="trend-cont">
      <div class="trend__title">
        {{ trend.title + ` ` + trend.country }}
      </div>
      <div class="trend-country">
        {{ trend.hashtag }}
      </div>
      <div class="trend__tweet">{{ trend.tweets }} Tweets</div>
    </div>
    <div v-if="deleted" class="trend-info">
      Thanks. Refresh this page to update these trends.
    </div>
    <a
      v-if="!dropdown && !deleted"
      id="trend__link"
      href="#"
      onclick="return false;"
      class="trend__link"
      @click="openDropdown"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <circle cx="5" cy="12" r="2"></circle>
          <circle cx="12" cy="12" r="2"></circle>
          <circle cx="19" cy="12" r="2"></circle>
        </g>
      </svg>
    </a>
    <a
      v-if="dropdown && !deleted"
      id="trend__link"
      href="#"
      onclick="return false;"
      class="trend__link"
      @click="closeDropdown"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <circle cx="5" cy="12" r="2"></circle>
          <circle cx="12" cy="12" r="2"></circle>
          <circle cx="19" cy="12" r="2"></circle>
        </g>
      </svg>
    </a>
    <TrendDropdown v-if="dropdown && !deleted" @deleteTrend="deleteTrend" />
  </div>
</template>

<script>
export default {
  name: 'TrendItem',
  components: {
    TrendDropdown: async () =>
      await import('~/components/globals/trends/TrendDropdown.vue')
  },
  props: {
    trend: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dropdown: false,
      deleted: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (process.browser) {
        const onClickOutside = (e) =>
          (this.dropdown = this.$el.contains(e.target) && this.dropdown)
        document.addEventListener('click', onClickOutside)
        this.$on('hook:beforeDestroy', () =>
          document.removeEventListener('click', onClickOutside)
        )
      }
    })
  },
  methods: {
    openDropdown() {
      this.dropdown = true
    },
    closeDropdown() {
      this.dropdown = false
    },
    deleteTrend() {
      this.deleted = true
    }
  }
}
</script>
