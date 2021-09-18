<template>
  <div class="main-search" :class="focused ? `focused` : ``">
    <form>
      <div class="main-search-wr">
        <button class="main-search-btn">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path
                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
              />
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
            Try searching for accounts or addresses
          </div>
          <div v-if="valid" class="search-dropdown__content">
            <SidebarRightSearchDropdown
              v-for="(item, i) in dropdownContent"
              :key="i"
              :dropdown-content="item"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  components: {
    SidebarRightSearchDropdown: () =>
      import('@/components/sidebar/right/SidebarRightSearchDropdown.vue')
  },
  data() {
    return {
      focused: false,
      search: '',
      dropdown: false,
      valid: false,
      dropdownContent: [
        {
          links: [
            {
              to: '/',
              text: false,
              name: '0x4eE....sdss',
              title: null,
              tweets: null
            },
            {
              to: '/',
              text: false,
              name: '0x4eE....sdss',
              title: null,
              tweets: null
            },
            {
              to: '/',
              text: true,
              name: '0x4eE....sdss',
              title: '12 transactions',
              tweets: 12
            }
          ],
          options: [
            {
              visileFollowButton: false
            }
          ]
        }
      ]
    }
  },
  beforeMount() {
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
