<template>
  <div class="post post-video-wr">
    <div class="post-videos">
      <div class="post-video">
        <div class="video">
          <!--div
            class="video-preview"
            style="background-image: url('~/assets/img/video_bg.jpg')"
          >
            <button class="video-start-btn">
              <img src="~/assets/img/video-start-btn_img.png" alt="" />
            </button>
          </div-->
          <!--div class="video-top"></div>
          <div class="video-reset">
            <button class="video-reset-btn">Watch again</button>
          </div>
          <div class="video-player-controls">
            <div class="video-slider">
              <div class="video-slider-container">
                <div class="video-slider-bg">
                  <div class="video-slider-rail"></div>
                  <div class="video-slider-buffer"></div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="wrap">
                <div class="video-control">
                  <button class="video-control-btn">
                    <svg
                      class="video-control-play"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      shape-rendering="geometricPrecision"
                      style="display: none"
                    >
                      <polygon
                        points="5 3 19 12 5 21 5 3"
                        fill="currentColor"
                      ></polygon>
                    </svg>
                    <svg
                      class="video-control-pause"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      shape-rendering="geometricPrecision"
                      style="display: inline"
                    >
                      <rect
                        x="6"
                        y="4"
                        width="4"
                        height="16"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="14"
                        y="4"
                        width="4"
                        height="16"
                        fill="currentColor"
                      ></rect>
                    </svg>
                  </button>
                </div>
                <div class="video-views">725.5K views</div>
              </div>
              <div class="wrap">
                <div class="video-counts">
                  <span class="video-count-time">00:00</span
                  ><span class="video-count-line">/</span
                  ><span class="video-count-fulltime">NaN:NaN</span>
                </div>
                <div class="video-voice">
                  <div class="video-voice-slider">
                    <div class="video-voice-slider-rail" role="slider">
                      <div
                        class="video-voice-slider-buffer"
                        style="width: 100%"
                      ></div>
                      <input
                        class="video-voice-slider-range"
                        type="range"
                        min="0"
                        max="1"
                        value="1"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <button class="video-voice-btn">
                    <svg
                      class="video-voice-on"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      shape-rendering="geometricPrecision"
                    >
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path
                        d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
                      />
                    </svg>
                    <svg
                      class="video-voice-off"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      shape-rendering="geometricPrecision"
                      style="display: none"
                    >
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path d="M23 9l-6 6" />
                      <path d="M17 9l6 6" />
                    </svg>
                  </button>
                </div>
                <div class="full-screen">
                  <button class="full-screen-btn">
                    <svg
                      class="full-screen-open"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      shape-rendering="geometricPrecision"
                    >
                      <path d="M15 3h6v6"></path>
                      <path d="M9 21H3v-6"></path>
                      <path d="M21 3l-7 7"></path>
                      <path d="M3 21l7-7"></path>
                    </svg>

                    <svg
                      class="full-screen-exit"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      shape-rendering="geometricPrecision"
                    >
                      <path d="M4 14h6v6"></path>
                      <path d="M20 10h-6V4"></path>
                      <path d="M14 10l7-7"></path>
                      <path d="M3 21l7-7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div-->
          <div class="video-player">
            <video
              style="z-index: 10"
              tabindex="-1"
              data-video=""
              allowfullscreen="false"
              controls
            >
              <source :src="transaction.nft.video" type="video/mp4" />
            </video>
          </div>
          <div class="video-contextMenu">
            <button class="video-contextMenu-btn">Copy Video Adress</button>
          </div>
        </div>
      </div>
    </div>
    <text-block :text="transaction.nft.description" />
    <bottom v-if="transaction.nft.commentsEnabled" />
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'

@Component({
  components: {
    top: async () => await import('@/components/post/PostTop.vue'),
    textBlock: async () => await import('@/components/post/PostTextBlock.vue'),
    bottom: async () => await import('@/components/post/PostBottom.vue')
  }
})
export default class ERC721TransactionVideo extends mixins(TransactionMixin) {}
</script>
