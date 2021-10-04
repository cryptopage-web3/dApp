<template>
  <div class="transactions-body">
    <div class="post post-image">
      <div class="white-post-top">
        <div class="post-date">
          <a href="#" class="post-date__link">
            <img src="@/assets/img/post-date__link_img.png" alt="" />
          </a>
          <div class="post-date__text">17:11 / 18.12.2021</div>
        </div>
        <div class="white-post-id">Eth: 0x7eE...3F543dsa3x0E0</div>
      </div>
      <a
        href="#"
        :style="{
          backgroundImage: `url(${require('@/assets/img/post-image__link_bg.jpg')})`
        }"
        class="post-image__link"
      ></a>
      <div class="post-text-block">
        <div class="post-text">
          Sometimes we face a problem that turns out to be more vicious than we
          imagined, there is no other way, but to kick their asses. Simply
          colorful store, in Galaxy not so far from the furtherest planet. Ramen
          is considered a fast food, with a combination of
        </div>
        <div class="post-text-right">
          <a href="#" class="post-text__link">
            <img src="@/assets/img/post-text__link_img1_2.png" alt="" />
          </a>
        </div>
      </div>
      <div class="post-bottom">
        <div class="post-like-dis">
          <a href="#" class="post-like">
            <img src="@/assets/img/post-like_img1.png" alt="" />
            <span> 8 607 </span>
          </a>
          <a href="#" class="post-dis">
            <img src="@/assets/img/post-like_img2.png" alt="" />
            <span> 2 342 </span>
          </a>
        </div>
        <div class="post-comment">
          <form>
            <div class="post-comment-wr">
              <input
                type="text"
                placeholder="Your comment text"
                class="post-comment__input"
              />
              <button class="post-comment__btn">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="post post-video-wr">
      <div class="white-post-top">
        <div class="post-date">
          <a href="#" class="post-date__link">
            <img src="@/assets/img/post-date__link_img.png" alt="" />
          </a>
          <div class="post-date__text">17:11 / 18.12.2021</div>
        </div>
        <div class="white-post-id">Eth: 0x7eE...3F543dsa3x0E0</div>
      </div>
      <div class="post-videos">
        <div class="post-video">
          <div class="video">
            <div
              class="video-preview"
              :style="{
                backgroundImage: `url(${require('@/assets/img/video_bg.jpg')})`
              }"
            >
              <button class="video-start-btn">
                <img src="@/assets/img/video-start-btn_img.png" alt="" />
              </button>
            </div>
            <div class="video-top"></div>
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
                    <span class="video-count-time">0:25</span
                    ><span class="video-count-line">/</span
                    ><span class="video-count-fulltime">0:52</span>
                  </div>
                  <div class="video-voice">
                    <div class="video-voice-slider">
                      <div class="video-voice-slider-rail" role="slider">
                        <div class="video-voice-slider-buffer"></div>
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
                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                        <path
                          d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
                        ></path>
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
                        style=""
                      >
                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                        <path d="M23 9l-6 6"></path>
                        <path d="M17 9l6 6"></path>
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
            </div>
            <div class="video-player">
              <video
                tabindex="-1"
                data-video=""
                allowfullscreen="false"
                controlslist="nodownload"
              >
                <source
                  src="@/assets/video/H7MCj0aMaT0e99lh.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div class="video-contextMenu">
              <button class="video-contextMenu-btn">Copy Video Adress</button>
            </div>
          </div>
        </div>
      </div>
      <div class="post-text-block">
        <div class="post-text">
          Sometimes we face a problem that turns out to be more vicious than we
          imagined, there is no other way, but to kick their asses. Simply
          colorful store, in Galaxy not so far from the furtherest planet. Ramen
          is considered a fast food, with a combination of
        </div>
        <div class="post-text-right">
          <a href="#" class="post-text__link">
            <img src="@/assets/img/post-text__link_img2_2.png" alt="" />
          </a>
        </div>
      </div>
      <div class="post-bottom">
        <div class="post-like-dis">
          <a href="#" class="post-like">
            <img src="@/assets/img/post-like_img1.png" alt="" />
            <span> 8 607 </span>
          </a>
        </div>
        <div class="post-comment">
          <form>
            <div class="post-comment-wr">
              <input
                type="text"
                placeholder="Your comment text"
                class="post-comment__input"
              />
              <button class="post-comment__btn">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="post post-audio">
      <div class="white-post-top">
        <div class="post-date">
          <a href="#" class="post-date__link">
            <img src="@/assets/img/post-date__link_img.png" alt="" />
          </a>
          <div class="post-date__text">17:11 / 18.12.2021</div>
        </div>
        <div class="white-post-id">Eth: 0x7eE...3F543dsa3x0E0</div>
      </div>
      <div class="post-audio-wr">
        <div class="post-audio-item">
          <audio crossorigin preload="none">
            <source src="audio/example-1.mp3" type="audio/mpeg" />
          </audio>
        </div>
        <div class="post-text-block">
          <div class="post-text">
            Sometimes we face a problem that turns out to be more vicious than
            we imagined, there is no other way, but to kick their asses. Simply
            colorful store, in Galaxy not so far from the furtherest planet.
          </div>
          <div class="post-text-right">
            <a href="#" class="post-text__link">
              <img src="@/assets/img/post-text__link_img1_2.png" alt="" />
            </a>
          </div>
        </div>
        <div class="post-bottom">
          <div class="post-like-dis">
            <a href="#" class="post-like">
              <img src="@/assets/img/post-like_img1.png" alt="" />
              <span> 8 607 </span>
            </a>
            <a href="#" class="post-dis">
              <img src="@/assets/img/post-like_img2.png" alt="" />
              <span> 2 342 </span>
            </a>
          </div>
          <div class="post-comment">
            <form>
              <div class="post-comment-wr">
                <input
                  type="text"
                  placeholder="Your comment text"
                  class="post-comment__input"
                />
                <button class="post-comment__btn">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="transactions">
    <transactions
      :address="$route.params.address"
      type="nft"
      :total="transactionsCount"
    >
      <transaction
        slot="transaction"
        slot-scope="{ transaction }"
        :transaction="transaction"
      />
    </transactions>
  </div> -->
</template>
<script>
export default {
  components: {
    // transaction: () => import('~/components/ERC721Transaction.vue'),
    // transactions: () => import('~/components/AddressTransactionList.vue')
  },
  props: {
    transactionsCount: {
      type: Number,
      default: () => 0
    }
  }
}
</script>
