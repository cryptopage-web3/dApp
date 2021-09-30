<template>
  <div class="main-right">
    <div class="main-search">
      <form>
        <div class="main-search-wr">
          <button class="main-search-btn">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-14j79pv
                r-4qtqp9
                r-yyyyoo
                r-1xvli5t
                r-dnmrzs
                r-4wgw6l
                r-f727ji
                r-bnwqim
                r-1plcrui
                r-lrvibr
              "
            >
              <g>
                <path
                  d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                ></path>
              </g>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search Twitter"
            class="main-search__input"
          />
        </div>
      </form>
    </div>
    <div
      v-sticky="{ topSpacing: 65, bottomSpacing: 30 }"
      class="right-sidebar is-affixed"
    >
      <div class="main-mems">
        <a
          href="#"
          class="main-mem"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/img/main-mem_bg1.jpg') + ')'
          }"
        ></a>
        <a
          href="#"
          class="main-mem"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/img/main-mem_bg2.jpg') + ')'
          }"
        ></a>
        <a
          href="#"
          class="main-mem"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/img/main-mem_bg3.jpg') + ')'
          }"
        ></a>
        <a
          href="#"
          class="main-mem"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/img/main-mem_bg4.jpg') + ')'
          }"
        ></a>
        <a
          href="#"
          class="main-mem"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/img/main-mem_bg5.jpg') + ')'
          }"
        ></a>
        <a
          href="#"
          class="main-mem"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/img/main-mem_bg6.jpg') + ')'
          }"
        ></a>
      </div>
      <div class="post-follows">
        <div class="post-follows-zag">You might like</div>
        <div class="post-follow">
          <a
            href="#"
            class="post-follow__logo"
            :style="{
              backgroundImage:
                'url(' + require('@/assets/img/post-follow__logo_bg1.jpg') + ')'
            }"
          ></a>
          <div class="post-follow-right">
            <div class="post-follow-top">
              <div class="post-follow-account">
                <a href="#">
                  Binance
                  <svg
                    viewBox="0 0 24 24"
                    aria-label="Verified account"
                    class="
                      r-13gxpu9
                      r-4qtqp9
                      r-yyyyoo
                      r-1xvli5t
                      r-9cviqr
                      r-f9ja8p
                      r-og9te1
                      r-bnwqim
                      r-1plcrui
                      r-lrvibr
                    "
                  >
                    <g>
                      <path
                        d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
                      ></path>
                    </g>
                  </svg>
                </a>
                <span> @binance </span>
              </div>
              <a
                href="#"
                class="post-follow-top__link btn btn_blue btn_transparent"
              >
                Follow
              </a>
            </div>
          </div>
        </div>
        <div class="post-follow">
          <a
            href="#"
            class="post-follow__logo"
            :style="{
              backgroundImage:
                'url(' + require('@/assets/img/post-follow__logo_bg2.jpg') + ')'
            }"
          ></a>
          <div class="post-follow-right">
            <div class="post-follow-top">
              <div class="post-follow-account">
                <a href="#">
                  NASA
                  <svg
                    viewBox="0 0 24 24"
                    aria-label="Verified account"
                    class="
                      r-13gxpu9
                      r-4qtqp9
                      r-yyyyoo
                      r-1xvli5t
                      r-9cviqr
                      r-f9ja8p
                      r-og9te1
                      r-bnwqim
                      r-1plcrui
                      r-lrvibr
                    "
                  >
                    <g>
                      <path
                        d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
                      ></path>
                    </g>
                  </svg>
                </a>
                <span> @NASA </span>
              </div>
              <a
                href="#"
                class="post-follow-top__link btn btn_blue btn_transparent"
              >
                Follow
              </a>
            </div>
          </div>
        </div>
        <div class="post-follow-bottom">
          <a href="#" class="post-follow-bottom__link"> Show more </a>
        </div>
      </div>
      <div class="trends">
        <div class="trends-top">
          <div class="trends-top__text">Trends for you</div>
          <a href="#" class="trends-top__link">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-13gxpu9
                r-4qtqp9
                r-yyyyoo
                r-18yzcnr
                r-dnmrzs
                r-bnwqim
                r-1plcrui
                r-lrvibr
                r-yc9v9c
              "
            >
              <g>
                <path
                  d="M12 8.21c-2.09 0-3.79 1.7-3.79 3.79s1.7 3.79 3.79 3.79 3.79-1.7 3.79-3.79-1.7-3.79-3.79-3.79zm0 6.08c-1.262 0-2.29-1.026-2.29-2.29S10.74 9.71 12 9.71s2.29 1.026 2.29 2.29-1.028 2.29-2.29 2.29z"
                ></path>
                <path
                  d="M12.36 22.375h-.722c-1.183 0-2.154-.888-2.262-2.064l-.014-.147c-.025-.287-.207-.533-.472-.644-.286-.12-.582-.065-.798.115l-.116.097c-.868.725-2.253.663-3.06-.14l-.51-.51c-.836-.84-.896-2.154-.14-3.06l.098-.118c.186-.222.23-.523.122-.787-.11-.272-.358-.454-.646-.48l-.15-.014c-1.18-.107-2.067-1.08-2.067-2.262v-.722c0-1.183.888-2.154 2.064-2.262l.156-.014c.285-.025.53-.207.642-.473.11-.27.065-.573-.12-.795l-.094-.116c-.757-.908-.698-2.223.137-3.06l.512-.512c.804-.804 2.188-.865 3.06-.14l.116.098c.218.184.528.23.79.122.27-.112.452-.358.477-.643l.014-.153c.107-1.18 1.08-2.066 2.262-2.066h.722c1.183 0 2.154.888 2.262 2.064l.014.156c.025.285.206.53.472.64.277.117.58.062.794-.117l.12-.102c.867-.723 2.254-.662 3.06.14l.51.512c.836.838.896 2.153.14 3.06l-.1.118c-.188.22-.234.522-.123.788.112.27.36.45.646.478l.152.014c1.18.107 2.067 1.08 2.067 2.262v.723c0 1.183-.888 2.154-2.064 2.262l-.155.014c-.284.024-.53.205-.64.47-.113.272-.067.574.117.795l.1.12c.756.905.696 2.22-.14 3.06l-.51.51c-.807.804-2.19.864-3.06.14l-.115-.096c-.217-.183-.53-.23-.79-.122-.273.114-.455.36-.48.646l-.014.15c-.107 1.173-1.08 2.06-2.262 2.06zm-3.773-4.42c.3 0 .593.06.87.175.79.328 1.324 1.054 1.4 1.896l.014.147c.037.4.367.7.77.7h.722c.4 0 .73-.3.768-.7l.014-.148c.076-.842.61-1.567 1.392-1.892.793-.33 1.696-.182 2.333.35l.113.094c.178.148.366.18.493.18.206 0 .4-.08.546-.227l.51-.51c.284-.284.305-.73.048-1.038l-.1-.12c-.542-.65-.677-1.54-.352-2.323.326-.79 1.052-1.32 1.894-1.397l.155-.014c.397-.037.7-.367.7-.77v-.722c0-.4-.303-.73-.702-.768l-.152-.014c-.846-.078-1.57-.61-1.895-1.393-.326-.788-.19-1.678.353-2.327l.1-.118c.257-.31.236-.756-.048-1.04l-.51-.51c-.146-.147-.34-.227-.546-.227-.127 0-.315.032-.492.18l-.12.1c-.634.528-1.55.67-2.322.354-.788-.327-1.32-1.052-1.397-1.896l-.014-.155c-.035-.397-.365-.7-.767-.7h-.723c-.4 0-.73.303-.768.702l-.014.152c-.076.843-.608 1.568-1.39 1.893-.787.326-1.693.183-2.33-.35l-.118-.096c-.18-.15-.368-.18-.495-.18-.206 0-.4.08-.546.226l-.512.51c-.282.284-.303.73-.046 1.038l.1.118c.54.653.677 1.544.352 2.325-.327.788-1.052 1.32-1.895 1.397l-.156.014c-.397.037-.7.367-.7.77v.722c0 .4.303.73.702.768l.15.014c.848.078 1.573.612 1.897 1.396.325.786.19 1.675-.353 2.325l-.096.115c-.26.31-.238.756.046 1.04l.51.51c.146.147.34.227.546.227.127 0 .315-.03.492-.18l.116-.096c.406-.336.923-.524 1.453-.524z"
                ></path>
              </g>
            </svg>
          </a>
        </div>
        <div class="trend">
          <div class="trend-cont">
            <div class="trend__title">Politics · Trending</div>
            <div class="trend-country">China</div>
            <div class="trend__tweet">325K Tweets</div>
          </div>
          <a href="#" class="trend__link">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-4qtqp9
                r-yyyyoo
                r-1xvli5t
                r-dnmrzs
                r-bnwqim
                r-1plcrui
                r-lrvibr
                r-1hdv0qi
              "
            >
              <g>
                <circle cx="5" cy="12" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="19" cy="12" r="2"></circle>
              </g>
            </svg>
          </a>
        </div>
        <div class="trend">
          <div class="trend-cont">
            <div class="trend__title">Trending in Romania</div>
            <div class="trend-country">#blockchain</div>
            <div class="trend__tweet">52.7K Tweets</div>
          </div>
          <a href="#" class="trend__link">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-4qtqp9
                r-yyyyoo
                r-1xvli5t
                r-dnmrzs
                r-bnwqim
                r-1plcrui
                r-lrvibr
                r-1hdv0qi
              "
            >
              <g>
                <circle cx="5" cy="12" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="19" cy="12" r="2"></circle>
              </g>
            </svg>
          </a>
        </div>
        <div class="trend">
          <div class="trend-cont">
            <div class="trend__title">Trending in Romania</div>
            <div class="trend-country">Covid</div>
            <div class="trend__tweet">1.98M Tweets</div>
          </div>
          <a href="#" class="trend__link">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-4qtqp9
                r-yyyyoo
                r-1xvli5t
                r-dnmrzs
                r-bnwqim
                r-1plcrui
                r-lrvibr
                r-1hdv0qi
              "
            >
              <g>
                <circle cx="5" cy="12" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="19" cy="12" r="2"></circle>
              </g>
            </svg>
          </a>
        </div>
        <div class="trend">
          <div class="trend-cont">
            <div class="trend__title">Politics · Trending</div>
            <div class="trend-country">Russia</div>
            <div class="trend__tweet">73.8K Tweets</div>
          </div>
          <a href="#" class="trend__link">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-4qtqp9
                r-yyyyoo
                r-1xvli5t
                r-dnmrzs
                r-bnwqim
                r-1plcrui
                r-lrvibr
                r-1hdv0qi
              "
            >
              <g>
                <circle cx="5" cy="12" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="19" cy="12" r="2"></circle>
              </g>
            </svg>
          </a>
        </div>
        <div class="trend">
          <div class="trend-cont">
            <div class="trend__title">Trending in Romania</div>
            <div class="trend-country">#paypig</div>
            <div class="trend__tweet">5,970 Tweets</div>
          </div>
          <a href="#" class="trend__link">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-4qtqp9
                r-yyyyoo
                r-1xvli5t
                r-dnmrzs
                r-bnwqim
                r-1plcrui
                r-lrvibr
                r-1hdv0qi
              "
            >
              <g>
                <circle cx="5" cy="12" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="19" cy="12" r="2"></circle>
              </g>
            </svg>
          </a>
        </div>
        <div class="trend">
          <div class="trend-cont">
            <div class="trend__title">Politics · Trending</div>
            <div class="trend-country">Russia</div>
            <div class="trend__tweet">73.8K Tweets</div>
          </div>
          <a href="#" class="trend__link">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-4qtqp9
                r-yyyyoo
                r-1xvli5t
                r-dnmrzs
                r-bnwqim
                r-1plcrui
                r-lrvibr
                r-1hdv0qi
              "
            >
              <g>
                <circle cx="5" cy="12" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="19" cy="12" r="2"></circle>
              </g>
            </svg>
          </a>
        </div>
        <div class="post-follow-bottom">
          <a href="#" class="post-follow-bottom__link"> Show more </a>
        </div>
      </div>
      <div class="right-sidebar-follows">
        <div class="right-sidebar-follows__top">Topics to follow</div>
        <div class="right-sidebar-follow">
          <div class="right-sidebar-follow-cont">
            <div class="right-sidebar-follow__title">Tesla Motors</div>
            <div class="right-sidebar-follow__text">Brand</div>
          </div>
          <a
            href="#"
            class="right-sidebar-follow__link btn btn_blue btn_transparent"
          >
            Follow
          </a>
          <a href="#" class="right-sidebar-follow__close">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-14j79pv
                r-4qtqp9
                r-yyyyoo
                r-10ptun7
                r-dnmrzs
                r-bnwqim
                r-1plcrui
                r-lrvibr
                r-1janqcz
              "
            >
              <g>
                <path
                  d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
                ></path>
              </g>
            </svg>
          </a>
        </div>
        <div class="right-sidebar-follow">
          <div class="right-sidebar-follow-cont">
            <div class="right-sidebar-follow__title">$TSLA</div>
            <div class="right-sidebar-follow__text">Stocks</div>
          </div>
          <a
            href="#"
            class="right-sidebar-follow__link btn btn_blue btn_transparent"
          >
            Follow
          </a>
          <a href="#" class="right-sidebar-follow__close">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-14j79pv
                r-4qtqp9
                r-yyyyoo
                r-10ptun7
                r-dnmrzs
                r-bnwqim
                r-1plcrui
                r-lrvibr
                r-1janqcz
              "
            >
              <g>
                <path
                  d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
                ></path>
              </g>
            </svg>
          </a>
        </div>
        <div class="right-sidebar-follow">
          <div class="right-sidebar-follow-cont">
            <div class="right-sidebar-follow__title">Investing</div>
            <div class="right-sidebar-follow__text">Business &amp; finance</div>
          </div>
          <a
            href="#"
            class="right-sidebar-follow__link btn btn_blue btn_transparent"
          >
            Follow
          </a>
          <a href="#" class="right-sidebar-follow__close">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-14j79pv
                r-4qtqp9
                r-yyyyoo
                r-10ptun7
                r-dnmrzs
                r-bnwqim
                r-1plcrui
                r-lrvibr
                r-1janqcz
              "
            >
              <g>
                <path
                  d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
                ></path>
              </g>
            </svg>
          </a>
        </div>
        <div class="right-sidebar-follow">
          <div class="right-sidebar-follow-cont">
            <div class="right-sidebar-follow__title">SpaceX</div>
            <div class="right-sidebar-follow__text">Space</div>
          </div>
          <a
            href="#"
            class="right-sidebar-follow__link btn btn_blue btn_transparent"
          >
            Follow
          </a>
          <a href="#" class="right-sidebar-follow__close">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-14j79pv
                r-4qtqp9
                r-yyyyoo
                r-10ptun7
                r-dnmrzs
                r-bnwqim
                r-1plcrui
                r-lrvibr
                r-1janqcz
              "
            >
              <g>
                <path
                  d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
                ></path>
              </g>
            </svg>
          </a>
        </div>
        <div class="right-sidebar-follow">
          <div class="right-sidebar-follow-cont">
            <div class="right-sidebar-follow__title">$BTC</div>
            <div class="right-sidebar-follow__text">Currency</div>
          </div>
          <a
            href="#"
            class="right-sidebar-follow__link btn btn_blue btn_transparent"
          >
            Follow
          </a>
          <a href="#" class="right-sidebar-follow__close">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="
                r-14j79pv
                r-4qtqp9
                r-yyyyoo
                r-10ptun7
                r-dnmrzs
                r-bnwqim
                r-1plcrui
                r-lrvibr
                r-1janqcz
              "
            >
              <g>
                <path
                  d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
                ></path>
              </g>
            </svg>
          </a>
        </div>
        <div class="post-follow-bottom">
          <a href="#" class="post-follow-bottom__link"> Show more </a>
        </div>
      </div>
      <div class="conditions">
        <ul class="conditions-list">
          <li>
            <a href="#">Terms of Service</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Cookie Policy</a>
          </li>
          <li>
            <a href="#">Ads info</a>
          </li>
          <li>
            <a href="#"
              >More
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="
                  r-4qtqp9
                  r-yyyyoo
                  r-ip8ujx
                  r-dnmrzs
                  r-1p4rafz
                  r-bnwqim
                  r-1plcrui
                  r-lrvibr
                "
              >
                <g>
                  <circle cx="5" cy="12" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="19" cy="12" r="2"></circle>
                </g></svg
            ></a>
          </li>
          <li>© 2021 Twitter, Inc.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import VueStickyDirective from '@renatodeleao/vue-sticky-directive'
export default {
  name: 'SidebarRight',
  directives: {
    sticky: VueStickyDirective
  },
  data() {
    return {}
  }
}
</script>
