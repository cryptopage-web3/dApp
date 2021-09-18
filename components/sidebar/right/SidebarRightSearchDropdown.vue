<template>
  <div class="search-dropdown__items">
    <nuxt-link
      v-for="(item, i) in dropdownContent.links"
      :key="i"
      :to="item.to"
      class="search-dropdown__item d-flex flex-column"
    >
      <b>{{ item.name }}</b>
      <p v-if="item.title">
        {{ item.tweets.length == 0 || item.tweets }} Transactions
      </p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    dropdownContent: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  }
}
</script>
