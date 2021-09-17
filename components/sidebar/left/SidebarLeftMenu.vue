<template>
  <div>
    <ul class="menu">
      <li>
        <router-link
          :to="`/${$store.getters['auth/selectedAddress']}`"
          exact-active-class=""
          active-class=""
          exact
        >
          <div>
            <Icon type="home" />
          </div>
          <span>Home</span>
        </router-link>
      </li>
      <li class="d-sm-none">
        <router-link
          :to="`/${$store.getters['auth/selectedAddress']}`"
          exact-active-class=""
          active-class=""
          exact
        >
          <div>
            <Icon type="search" />
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/messages" exact-active-class="" active-class="" exact>
          <div>
            <Icon type="messages" />
          </div>
          <span>Messages</span>
        </router-link>
      </li>
      <li class="d-xl-none d-sm-block d-none">
        <router-link to="/" exact-active-class="" active-class="" exact>
          <div>
            <Icon type="favorites" />
          </div>
        </router-link>
      </li>
      <li class="d-xl-none d-sm-block d-none">
        <router-link to="/" exact-active-class="" active-class="" exact>
          <div>
            <Icon type="notes" />
          </div>
        </router-link>
      </li>
      <li class="d-sm-block d-none">
        <router-link to="/profile" exact-active-class="" active-class="" exact>
          <div>
            <Icon type="profile" />
          </div>
          <span> Profile </span>
        </router-link>
      </li>
    </ul>
    <a href="#" class="sidebar-tweet" @click.prevent="modalTweet">
      <span>Send crypto-post</span>
      <div>
        <Icon type="add-tweet" />
      </div>
    </a>
  </div>
</template>
<script>
import ModalTweet from '@/components/modals/TweetAddForm.vue'

export default {
  components: {
    Icon: async () => await import('@/components/icons/Icon')
  },
  methods: {
    modalTweet() {
      this.$modal.show(
        ModalTweet,
        { classes: 'modal--tweet' },
        {
          width: 600,
          height: 'auto',
          adaptive: true,
          shiftY: 0.1,
          name: 'tweet'
        }
      )
    }
  }
}
</script>
