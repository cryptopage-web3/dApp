<template>
  <div class="main-search-wr" :class="focused ? `focused` : ``">
    <button class="main-search-btn">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path
            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
          ></path>
        </g>
      </svg>
    </button>
    <input
      v-model="search"
      type="text"
      placeholder="Search Twitter"
      class="main-search__input"
      @input="handleInput"
      @focus="
        focused = true
        dropdown = true
      "
      @focusout="focused = false"
    />
    <div v-if="dropdown" class="search-dropdown dropdown">
      <div v-if="!valid" class="search-dropdown__info">
        Try searching for people, topics, or keywords
      </div>
      <div v-if="valid" class="search-dropdown__content">
        <SearchContentDropdown />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  components: {
    SearchContentDropdown: () =>
      import('~/components/globals/search/SearchContentDropdown.vue')
  },
  data() {
    return {
      focused: false,
      search: '',
      dropdown: false,
      valid: false
    }
  },
  mounted() {
    if (process.browser) {
      const onClickOutside = (e) =>
        (this.dropdown = this.$el.contains(e.target) && this.dropdown)
      document.addEventListener('click', onClickOutside)
      this.$on('hook:beforeDestroy', () =>
        document.removeEventListener('click', onClickOutside)
      )
    }
  },
  methods: {
    handleInput() {
      if (this.search.length >= 1) {
        this.valid = true
      }
      if (this.search.length === 0) {
        this.valid = false
      }
    }
  }
}
</script>
