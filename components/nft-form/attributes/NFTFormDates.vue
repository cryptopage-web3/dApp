<template>
  <div class="nft-form__attribute">
    <div class="nft-form__attribute-header" @click="toggle">
      <div
        ref="icon"
        class="nft-form__attribute-header-icon"
        title="Traits with date"
      >
        <font-awesome-icon :icon="['fas', 'calendar']" />
      </div>
      <div class="nft-form__attribute-header-title">Dates</div>
      <div class="nft-form__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
    <div v-show="isShow" class="nft-form__attribute-container">
      <date
        v-for="date in localDates"
        :key="date.id"
        :date="date"
        @remove="removeDate(date.id)"
        @change="dateChangeHandler(date.id, $event)"
      />
      <div class="nft-form__date nft-form__date_add" @click="addDate">
        <font-awesome-icon :icon="['fas', 'plus-circle']" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    date: async () =>
      await import('@/components/nft-form/attributes/NFTFormDate.vue')
  },
  props: {
    dates: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: false,
      localDates: []
    }
  },
  watch: {
    dates: {
      handler(dates) {
        if (JSON.stringify(dates) === JSON.stringify(this.localDates)) {
          return
        }

        this.localDates = dates
      },
      immediate: true
    },

    localDates(dates) {
      this.$emit('change', dates)
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

    addDate() {
      this.localDates.push({
        id: Number(new Date())
      })
    },

    removeDate(dateId) {
      this.localDates = this.localDates.filter(({ id }) => id !== dateId)
    },

    dateChangeHandler(dateId, data) {
      this.localDates = this.localDates.map((item) =>
        item.id === dateId
          ? {
              ...item,
              type: data.type,
              value: data.value
            }
          : item
      )
    }
  }
}
</script>
