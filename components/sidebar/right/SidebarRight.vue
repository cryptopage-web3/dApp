<template>
  <div class="main-right">
    <div id="right-sidebar">
      <div class="main-right-item">
        <div class="connect-wallet-wr">
          <div class="connect-wallet-col connect-wallet__link-hover">
            <a
              href="#"
              data-toggle="modal"
              data-target="#modal-connect"
              role="button"
              class="connect-wallet__link"
            >
              <div class="connect-wallet__link-thumb">
                <img src="@/assets/img/connect-wallet__link_img2.png" alt="" />
              </div>
              <div class="connect-wallet__link-text">
                <div class="connect-wallet__link-tool">Etherum</div>
                <div class="connect-wallet__link-status">Connect wallet</div>
              </div>
            </a>
            <div class="connect-wallet-col-body">
              <ul class="connect-wallet__list">
                <li><a href="#">Activate layer 2</a></li>
                <li><a href="#">Copy Address</a></li>
                <li><a href="#">Transaction history</a></li>
                <li><a href="#">Claim</a></li>
                <li><a href="#">Change Wallet</a></li>
                <li><a href="#">Disconnect</a></li>
              </ul>
            </div>
          </div>
          <a href="#" class="dark-white">
            <img src="@/assets/img/dark-white_img2.png" alt="" />
          </a>
        </div>
      </div>
      <div class="main-right-item">
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
      <div class="main-right-item">
        <banner />
        <div class="balances">
          <a href="#" class="balance">
            <div class="balance-top">
              <div class="balance__thumb">
                <img src="@/assets/img/balance__thumb_img1.png" alt="" />
              </div>
              <div class="balance-right">
                <div class="balance__countusdt">5.321$</div>
                <div class="balance__procent">
                  9.78%
                  <img src="@/assets/img/balance__procent_img1.png" alt="" />
                </div>
              </div>
            </div>
            <div class="balance-bottom">
              Balance: 11,2$<br />
              <span>(0.00318 eth)</span>
            </div>
          </a>
          <a href="#" class="balance">
            <div class="balance-top">
              <div class="balance__thumb">
                <img src="@/assets/img/balance__thumb_img2.png" alt="" />
              </div>
              <div class="balance-right">
                <div class="balance__countusdt">5.321$</div>
                <div class="balance__procent">
                  9.78%
                  <img src="@/assets/img/balance__procent_img2.png" alt="" />
                </div>
              </div>
            </div>
            <div class="balance-bottom">
              Balance: 182,2$<br />
              <span>(0.00318 eth)</span>
            </div>
          </a>
          <a href="#" class="balance">
            <div class="balance-top">
              <div class="balance__thumb">
                <img src="@/assets/img/balance__thumb_img3.png" alt="" />
              </div>
              <div class="balance-right">
                <div class="balance__countusdt">8.321$</div>
                <div class="balance__procent">
                  2.78%
                  <img src="@/assets/img/balance__procent_img1.png" alt="" />
                </div>
              </div>
            </div>
            <div class="balance-bottom">
              Balance: 11,2$<br />
              <span>(0.00318 eth)</span>
            </div>
          </a>
          <a href="#" class="balance">
            <div class="balance-top">
              <div class="balance__thumb">
                <img src="@/assets/img/balance__thumb_img4.png" alt="" />
              </div>
              <div class="balance-right">
                <div class="balance__countusdt">81.21$</div>
                <div class="balance__procent">
                  8.64%
                  <img src="@/assets/img/balance__procent_img2.png" alt="" />
                </div>
              </div>
            </div>
            <div class="balance-bottom">
              Balance: 182,2$<br />
              <span>(0.00318 eth)</span>
            </div>
          </a>
        </div>
      </div>
      <div class="main-right-item">
        <div class="connect-wallet-wr">
          <div class="connect-wallet-col connect-wallet__link-hover">
            <a
              href="#"
              data-toggle="modal"
              data-target="#modal-connect"
              role="button"
              class="connect-wallet__link"
            >
              <div class="connect-wallet__link-thumb">
                <img src="@/assets/img/connect-wallet__link_img2.png" alt="" />
              </div>
              <div class="connect-wallet__link-text">
                <div class="connect-wallet__link-tool">Etherum</div>
                <div class="connect-wallet__link-status">Connect wallet</div>
              </div>
            </a>
            <div class="connect-wallet-col-body">
              <ul class="connect-wallet__list">
                <li><a href="#">Activate layer 2</a></li>
                <li><a href="#">Copy Address</a></li>
                <li><a href="#">Transaction history</a></li>
                <li><a href="#">Claim</a></li>
                <li><a href="#">Change Wallet</a></li>
                <li><a href="#">Disconnect</a></li>
              </ul>
            </div>
          </div>
          <a href="#" class="dark-white">
            <img src="@/assets/img/dark-white_img2.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    banner: async () =>
      await import('@/components/sidebar/right/SidebarRightBanner')
  },
  data: () => ({
    stickySidebar: null
  }),
  mounted() {
    this.stickySidebar = new StickySidebar('#right-sidebar', {
      topSpacing: 20,
      bottomSpacing: 20,
      containerSelector: '.main-right',
      innerWrapperSelector: '#right-sidebar',
      resizeSensor: true
    })
  }
}
</script>
