<template>
  <div>
    <ul class="header-list">
      <li>
        <router-link
          :to="`/${$store.getters['auth/selectedAddress']}`"
          class="header-list__item"
        >
          <div>
            <img
              src="@/assets/img/header-list__item_img1_2_2.png"
              class="header-list__item-img1"
            />
            <img
              src="@/assets/img/header-list__item_img1_2.png"
              class="header-list__item-img2"
            />
          </div>
          <span> Home </span>
        </router-link>
      </li>
      <li>
        <router-link to="/messages" class="header-list__item">
          <div>
            <img
              src="@/assets/img/header-list__item_img2_2_2.png"
              class="header-list__item-img1"
            />
            <img
              src="@/assets/img/header-list__item_img2_2.png"
              class="header-list__item-img2"
            />
          </div>
          <span> Messages </span>
        </router-link>
      </li>
      <li class="mb-xl-0">
        <router-link to="/profile" class="header-list__item">
          <div>
            <img
              src="@/assets/img/header-list__item_img3_2_2.png"
              alt=""
              class="header-list__item-img1"
            />
            <img
              src="@/assets/img/header-list__item_img3_2.png"
              alt=""
              class="header-list__item-img2"
            />
          </div>
          <span> Profile </span>
        </router-link>
      </li>
      <li class="header-list_cw d-xl-none">
        <!-- TODO: Поиск и кошелек для мобилки перенести в отдельный компонент -->
        <div class="header-list-wr">
          <div class="header-list__search">
            <form>
              <div class="search-wr">
                <button class="search__btn">
                  <img src="@/assets/img/search__btn_img2.png" alt="" />
                </button>
                <input
                  type="text"
                  placeholder="Search items, collections"
                  class="search__input"
                />
              </div>
            </form>
          </div>
          <connect />
        </div>
      </li>
    </ul>
    <div v-if="isShowCreateNft" class="sidebar-left__create">
      <button class="btn btn_blue btn_creat-post" @click.prevent="modalTweet">
        <img src="@/assets/img/btn_creat-post_img.png" alt="" />
        <span>Create NFT</span>
      </button>
    </div>
  </div>
</template>
<script>
import ModalTweet from '@/components/modals/TweetAddForm.vue'

export default {
  components: {
    connect: async () => await import('@/components/connect/Connect.vue')
  },
  data: () => ({
    isShowCreateNft: false
  }),
  watch: {
    $route: {
      handler() {
        this.$nextTick(() => {
          $(window).unbind('scroll', this.showCreateNft)

          if (!this.$route.params.address) {
            this.isShowCreateNft = true
            return
          }

          this.showCreateNft()
          $(window).bind('scroll', this.showCreateNft)
        })
      },
      immediate: true
    }
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
    },

    showCreateNft() {
      this.isShowCreateNft = $(window).scrollTop() > 300
    }
  }
}
</script>
