<template>
  <div class="home">
    <div class="profile-other" id="profile-other">
        <div class="profile-other-left">
          <router-link to="/" exact-active-class="" active-class="" class="profile-other__back">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="r-13gxpu9 r-4qtqp9 r-yyyyoo r-18yzcnr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-yc9v9c">
              <g>
                <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
              </g>
            </svg>
          </router-link>
          <router-link to="/" exact-active-class="" active-class="" class="profile-other-name">
            <div class="profile-other-name__top">
              <span>
                Elon Musk
              </span>
              <svg viewBox="0 0 24 24" aria-label="Verified account" class="r-13gxpu9 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr">
                <g>
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                </g>
              </svg>
            </div>
            <span>
              14.9K Tweets
            </span>
          </router-link>
        </div>
        <router-link to="/" exact-active-class="" active-class="" :class="['', { view: isBtn }]" class="profile-other__follow btn btn_blue btn_transparent">
          Follow
        </router-link>
    </div>
    <div class="main-center-cont">
      <router-link to="/" exact-active-class="" active-class="" class="main-center-thumbnail" :style="{ backgroundImage: 'url(' + require('@/assets/img/main-center-thumbnail_bg.jpg') + ')'}"></router-link>
      <div class="profile-more">
        <div class="profile-more-top">
          <router-link to="/" exact-active-class="" active-class="" class="profile-more-top__thumb" :style="{ backgroundImage: 'url(' + require('@/assets/img/profile-more-top__thumb_bg.png') + ')'}"></router-link>
          <div>
            <div class="profile-more-top-menu">
              <router-link to="/" exact-active-class="" active-class="">
                <svg viewBox="0 0 24 24" aria-hidden="true" class="r-13gxpu9 r-4qtqp9 r-yyyyoo r-18yzcnr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-yc9v9c">
                  <g>
                    <circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle>
                    <circle cx="19" cy="12" r="2"></circle>
                  </g>
                </svg>
              </router-link>
            </div>
            <router-link to="/" exact-active-class="" active-class="" id="profile-more-top__follow" class="profile-more-top__follow btn btn_blue btn_transparent">
              Follow
            </router-link>
          </div>
        </div>
        <div class="profile-more-bottom">
          <div class="profile-more-name">
            <div class="profile-more-name-top">
              <span>Elon Musk</span>
              <svg viewBox="0 0 24 24" aria-label="Verified account" class="r-13gxpu9 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr">
                <g>
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                </g>
              </svg>
            </div>
            <span>
              @elonmusk
            </span>
          </div>
          <div class="profile-more-text">
            meme necromancy while u wait
          </div>
          <div class="profile-more-date">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-1d4mawv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path><circle cx="7.032" cy="8.75" r="1.285"></circle><circle cx="7.032" cy="13.156" r="1.285"></circle><circle cx="16.968" cy="8.75" r="1.285"></circle><circle cx="16.968" cy="13.156" r="1.285"></circle><circle cx="12" cy="8.75" r="1.285"></circle><circle cx="12" cy="13.156" r="1.285"></circle><circle cx="7.032" cy="17.486" r="1.285"></circle><circle cx="12" cy="17.486" r="1.285"></circle></g></svg>
            Joined June 2009
          </div>
          <div class="profile-more-follows">
            <router-link to="/" exact-active-class="" active-class="" class="profile-more-follow">
              <strong>
                106
              </strong>
              Following
            </router-link>
            <router-link to="/" exact-active-class="" active-class="" class="profile-more-follow">
              <strong>
                58.4M
              </strong>
              Followers
            </router-link>
          </div>
          <div class="profile-more-not-followed">
            Not followed by anyone you’re following
          </div>
        </div>
      </div>
      <div class="main-tabs">
          <div class="main-tabs-links">
            <a v-for="(tab, index) in tabs" :key="index" :class="['', { active: currentTab === tab.name }]" href="#" class="main-tabs-link" @click="currentTab = tab.name"><span>{{ tab.name }}</span></a>
          </div>
          <div class="main-tabs-cont">
            <div class="main-tab show" v-if="currentTab === 'Tweets'">
              <Tweets/>
            </div>
            <div class="main-tab show" v-if="currentTab === 'Tweets & replies'">
              <TweetsReplies/>
            </div>
            <div class="main-tab show" v-if="currentTab === 'Media'">
              <Media/>
            </div>
            <div class="main-tab show" v-if="currentTab === 'Likes'">
              <Likes/>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tweets from '@/components/tabs/Tweets'
import TweetsReplies from '@/components/tabs/TweetsReplies'
import Media from '@/components/tabs/Media'
import Likes from '@/components/tabs/Likes'
export default {
  name: 'Home',
  components: { Tweets, TweetsReplies, Media, Likes },
  data () {
    return {
      currentTab: 'Tweets',
      isBtn: false,
      tabs: [
        {
          name: 'Tweets'
        },
        {
          name: 'Tweets & replies'
        },
        {
          name: 'Media'
        },
        {
          name: 'Likes'
        }
      ]
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      if (window.pageYOffset > 250) {
        this.isBtn = true
      } else {
        this.isBtn = false
      }
    }
  }
}
</script>
