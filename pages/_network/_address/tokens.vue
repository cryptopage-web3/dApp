<template>
  <div class="profile-center profile-my-nfts tokens">
    <div class="profile-my-nfts-top">
      <div class="profile-my-nfts__title">
        <nuxt-link
          :to="`/${chainSlug}/${address}`"
          class="market-sidebar__more"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="29.5"
              y="29.5"
              width="29"
              height="29"
              rx="4.5"
              transform="rotate(-180 29.5 29.5)"
              stroke="#A7A7A7"
            />
            <path
              d="M14.3921 14.9793L17.3421 12.0293C17.4973 11.8732 17.5844 11.662 17.5844 11.4418C17.5844 11.2217 17.4973 11.0105 17.3421 10.8543C17.2646 10.7762 17.1724 10.7142 17.0709 10.6719C16.9693 10.6296 16.8604 10.6078 16.7504 10.6078C16.6404 10.6078 16.5315 10.6296 16.4299 10.6719C16.3284 10.7142 16.2362 10.7762 16.1587 10.8543L12.6254 14.3877C12.5473 14.4652 12.4853 14.5573 12.443 14.6589C12.4007 14.7604 12.3789 14.8693 12.3789 14.9793C12.3789 15.0894 12.4007 15.1983 12.443 15.2998C12.4853 15.4014 12.5473 15.4935 12.6254 15.571L16.1587 19.146C16.2366 19.2232 16.329 19.2844 16.4305 19.3258C16.532 19.3673 16.6407 19.3883 16.7504 19.3877C16.8601 19.3883 16.9688 19.3673 17.0703 19.3258C17.1719 19.2844 17.2642 19.2232 17.3421 19.146C17.4973 18.9899 17.5844 18.7787 17.5844 18.5585C17.5844 18.3384 17.4973 18.1272 17.3421 17.971L14.3921 14.9793Z"
              fill="#A7A7A7"
            />
          </svg>
        </nuxt-link>
        <h2 class="global-zag">My Token's</h2>
      </div>
    </div>
    <div class="tokens-top">
      <div class="tokens__overview">Overview</div>
      <div class="tokens-wallets">
        <div class="tokens-wallet">
          <div class="tokens-wallet__title">Net Worth in USD</div>
          <div class="tokens-wallet__count">$ 9,825,630.73</div>
        </div>
        <div class="tokens-wallet">
          <div class="tokens-wallet__title">Net Worth in ETH</div>
          <div class="tokens-wallet__count">
            <img src="@/assets/img/tokens-wallet_eth.svg" alt="" />
            3263.526793
          </div>
        </div>
        <div class="tokens-wallet">
          <div class="tokens-wallet__title">Total Balance Change (24H)</div>
          <div class="tokens-wallet__procent tokens-wallet__procent-green">
            4.00%
          </div>
          <div class="tokens-wallet__procent tokens-wallet__procent-red">
            - 4.00%
          </div>
        </div>
      </div>
    </div>
    <ul id="myTab" class="nav nav-tabs profile-tabs tokens-tabs" role="tablist">
      <li class="nav-item">
        <a
          id="profile-tabs1-tab"
          class="profile-tabs__link active"
          data-toggle="tab"
          href="#profile-tabs1"
          role="tab"
          aria-controls="profile-tabs1"
          aria-selected="true"
          >Assets in Wallet (8)</a
        >
      </li>
      <li class="nav-item">
        <a
          id="profile-tabs2-tab"
          class="profile-tabs__link disabled"
          data-toggle="tab"
          href="#profile-tabs2"
          role="tab"
          aria-controls="profile-tabs2"
          aria-selected="false"
          >Liquidity Pool Assets in Wallet (0)</a
        >
      </li>
      <li class="nav-item">
        <a
          id="profile-tabs3-tab"
          class="profile-tabs__link"
          data-toggle="tab"
          href="#profile-tabs3"
          role="tab"
          aria-controls="profile-tabs3"
          aria-selected="false"
          >Hidden tokens (1)</a
        >
      </li>
    </ul>

    <div id="myTabContent" class="tab-content">
      <div
        id="profile-tabs1"
        class="tab-pane fade show active"
        role="tabpanel"
        aria-labelledby="profile-tabs1-tab"
      >
        <div class="token">
          <div class="token-left">
            <img
              src="@/assets/img/token_icon1.svg"
              alt=""
              class="token__icon"
            />
            <div>
              <div class="token__name">Ethereum (ETH)</div>
              <div class="token__address">
                Contract address: <a href="#">0xd3C...e70</a>
              </div>
            </div>
          </div>
          <div class="token-right">
            <div class="token-row">
              <div class="token__procent token__procent-green">1.44%</div>
              <div class="token__dollar">$7,550,484.33</div>
              <div class="profile-content-drop">
                <a href="#" class="profile-content-drop__link">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L19 13ZM18.99 11C18.4377 11 17.99 11.4477 17.99 12C17.99 12.5523 18.4377 13 18.99 13L18.99 11ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11L12 13ZM11.99 11C11.4377 11 10.99 11.4477 10.99 12C10.99 12.5523 11.4377 13 11.99 13L11.99 11ZM5 13C5.55229 13 6 12.5523 6 12C6 11.4477 5.55229 11 5 11L5 13ZM4.99 11C4.43771 11 3.99 11.4477 3.99 12C3.99 12.5523 4.43771 13 4.99 13L4.99 11ZM19 12L19 10C17.8954 10 17 10.8954 17 12L19 12ZM19 12L21 12C21 10.8954 20.1046 10 19 10L19 12ZM19 12L19 14C20.1046 14 21 13.1046 21 12L19 12ZM19 12L17 12C17 13.1046 17.8954 14 19 14L19 12ZM12 12L12 10C10.8954 10 10 10.8954 10 12L12 12ZM12 12L14 12C14 10.8954 13.1046 10 12 10L12 12ZM12 12L12 14C13.1046 14 14 13.1046 14 12L12 12ZM12 12L10 12C10 13.1046 10.8954 14 12 14L12 12ZM5 12L5 10C3.89543 10 3 10.8954 3 12L5 12ZM5 12L7 12C7 10.8954 6.10457 10 5 10L5 12ZM5 12L5 14C6.10457 14 7 13.1046 7 12L5 12ZM5 12L3 12C3 13.1046 3.89543 14 5 14L5 12ZM19 11L18.99 11L18.99 13L19 13L19 11ZM12 11L11.99 11L11.99 13L12 13L12 11ZM5 11L4.99 11L4.99 13L5 13L5 11Z"
                      fill="#687684"
                    />
                  </svg>
                </a>
                <div class="drop-down__col">
                  <ul class="drop-down__list">
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon1.svg" alt="" />
                        </div>
                        <span> Check Previous Token Balance </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon2.svg" alt="" />
                        </div>
                        <span> Add Token to Metamask (Web3) </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        role="button"
                        data-toggle="modal"
                        data-target="#tokens-modal"
                      >
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon3.svg" alt="" />
                        </div>
                        <span> Transfer Token </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon4.svg" alt="" />
                        </div>
                        <span> Hide Token </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="token-row">
              <div class="token__count">Quantity: 9.779123268174130914</div>
              <div class="token__price">Price: $3,003.79</div>
            </div>
          </div>
        </div>
        <div class="token">
          <div class="token-left">
            <img
              src="@/assets/img/token_icon2.svg"
              alt=""
              class="token__icon"
            />
            <div>
              <div class="token__name">BNB (BNB)</div>
              <div class="token__address">
                Contract address: <a href="#">0xd3C...e70</a>
              </div>
            </div>
          </div>
          <div class="token-right">
            <div class="token-row">
              <div class="token__procent token__procent-red">- 1.44%</div>
              <div class="token__dollar">≈$0.00</div>
              <div class="profile-content-drop">
                <a href="#" class="profile-content-drop__link">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L19 13ZM18.99 11C18.4377 11 17.99 11.4477 17.99 12C17.99 12.5523 18.4377 13 18.99 13L18.99 11ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11L12 13ZM11.99 11C11.4377 11 10.99 11.4477 10.99 12C10.99 12.5523 11.4377 13 11.99 13L11.99 11ZM5 13C5.55229 13 6 12.5523 6 12C6 11.4477 5.55229 11 5 11L5 13ZM4.99 11C4.43771 11 3.99 11.4477 3.99 12C3.99 12.5523 4.43771 13 4.99 13L4.99 11ZM19 12L19 10C17.8954 10 17 10.8954 17 12L19 12ZM19 12L21 12C21 10.8954 20.1046 10 19 10L19 12ZM19 12L19 14C20.1046 14 21 13.1046 21 12L19 12ZM19 12L17 12C17 13.1046 17.8954 14 19 14L19 12ZM12 12L12 10C10.8954 10 10 10.8954 10 12L12 12ZM12 12L14 12C14 10.8954 13.1046 10 12 10L12 12ZM12 12L12 14C13.1046 14 14 13.1046 14 12L12 12ZM12 12L10 12C10 13.1046 10.8954 14 12 14L12 12ZM5 12L5 10C3.89543 10 3 10.8954 3 12L5 12ZM5 12L7 12C7 10.8954 6.10457 10 5 10L5 12ZM5 12L5 14C6.10457 14 7 13.1046 7 12L5 12ZM5 12L3 12C3 13.1046 3.89543 14 5 14L5 12ZM19 11L18.99 11L18.99 13L19 13L19 11ZM12 11L11.99 11L11.99 13L12 13L12 11ZM5 11L4.99 11L4.99 13L5 13L5 11Z"
                      fill="#687684"
                    />
                  </svg>
                </a>
                <div class="drop-down__col">
                  <ul class="drop-down__list">
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon1.svg" alt="" />
                        </div>
                        <span> Check Previous Token Balance </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon2.svg" alt="" />
                        </div>
                        <span> Add Token to Metamask (Web3) </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        role="button"
                        data-toggle="modal"
                        data-target="#tokens-modal"
                      >
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon3.svg" alt="" />
                        </div>
                        <span> Transfer Token </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon4.svg" alt="" />
                        </div>
                        <span> Hide Token </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="token-row">
              <div class="token__count">Quantity: 0.000000000000000017</div>
              <div class="token__price">Price: $0.052669</div>
            </div>
          </div>
        </div>
        <div class="token">
          <div class="token-left">
            <img
              src="@/assets/img/token_icon3.svg"
              alt=""
              class="token__icon"
            />
            <div>
              <div class="token__name">Litecoin (LTC)</div>
              <div class="token__address">
                Contract address: <a href="#">0xd3C...e70</a>
              </div>
            </div>
          </div>
          <div class="token-right">
            <div class="token-row">
              <div class="token__procent token__procent-green">1.44%</div>
              <div class="token__dollar">≈$0.00</div>
              <div class="profile-content-drop">
                <a href="#" class="profile-content-drop__link">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L19 13ZM18.99 11C18.4377 11 17.99 11.4477 17.99 12C17.99 12.5523 18.4377 13 18.99 13L18.99 11ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11L12 13ZM11.99 11C11.4377 11 10.99 11.4477 10.99 12C10.99 12.5523 11.4377 13 11.99 13L11.99 11ZM5 13C5.55229 13 6 12.5523 6 12C6 11.4477 5.55229 11 5 11L5 13ZM4.99 11C4.43771 11 3.99 11.4477 3.99 12C3.99 12.5523 4.43771 13 4.99 13L4.99 11ZM19 12L19 10C17.8954 10 17 10.8954 17 12L19 12ZM19 12L21 12C21 10.8954 20.1046 10 19 10L19 12ZM19 12L19 14C20.1046 14 21 13.1046 21 12L19 12ZM19 12L17 12C17 13.1046 17.8954 14 19 14L19 12ZM12 12L12 10C10.8954 10 10 10.8954 10 12L12 12ZM12 12L14 12C14 10.8954 13.1046 10 12 10L12 12ZM12 12L12 14C13.1046 14 14 13.1046 14 12L12 12ZM12 12L10 12C10 13.1046 10.8954 14 12 14L12 12ZM5 12L5 10C3.89543 10 3 10.8954 3 12L5 12ZM5 12L7 12C7 10.8954 6.10457 10 5 10L5 12ZM5 12L5 14C6.10457 14 7 13.1046 7 12L5 12ZM5 12L3 12C3 13.1046 3.89543 14 5 14L5 12ZM19 11L18.99 11L18.99 13L19 13L19 11ZM12 11L11.99 11L11.99 13L12 13L12 11ZM5 11L4.99 11L4.99 13L5 13L5 11Z"
                      fill="#687684"
                    />
                  </svg>
                </a>
                <div class="drop-down__col">
                  <ul class="drop-down__list">
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon1.svg" alt="" />
                        </div>
                        <span> Check Previous Token Balance </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon2.svg" alt="" />
                        </div>
                        <span> Add Token to Metamask (Web3) </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        role="button"
                        data-toggle="modal"
                        data-target="#tokens-modal"
                      >
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon3.svg" alt="" />
                        </div>
                        <span> Transfer Token </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon4.svg" alt="" />
                        </div>
                        <span> Hide Token </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="token-row">
              <div class="token__count">Quantity: 0.000108594431914455</div>
              <div class="token__price">Price: $0.000149</div>
            </div>
          </div>
        </div>
        <div class="token">
          <div class="token-left">
            <img
              src="@/assets/img/token_icon4.svg"
              alt=""
              class="token__icon"
            />
            <div>
              <div class="token__name">Chainlink (LINK)</div>
              <div class="token__address">
                Contract address: <a href="#">0xd3C...e70</a>
              </div>
            </div>
          </div>
          <div class="token-right">
            <div class="token-row">
              <div class="token__procent token__procent-green">1.44%</div>
              <div class="token__dollar">$151.70</div>
              <div class="profile-content-drop">
                <a href="#" class="profile-content-drop__link">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L19 13ZM18.99 11C18.4377 11 17.99 11.4477 17.99 12C17.99 12.5523 18.4377 13 18.99 13L18.99 11ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11L12 13ZM11.99 11C11.4377 11 10.99 11.4477 10.99 12C10.99 12.5523 11.4377 13 11.99 13L11.99 11ZM5 13C5.55229 13 6 12.5523 6 12C6 11.4477 5.55229 11 5 11L5 13ZM4.99 11C4.43771 11 3.99 11.4477 3.99 12C3.99 12.5523 4.43771 13 4.99 13L4.99 11ZM19 12L19 10C17.8954 10 17 10.8954 17 12L19 12ZM19 12L21 12C21 10.8954 20.1046 10 19 10L19 12ZM19 12L19 14C20.1046 14 21 13.1046 21 12L19 12ZM19 12L17 12C17 13.1046 17.8954 14 19 14L19 12ZM12 12L12 10C10.8954 10 10 10.8954 10 12L12 12ZM12 12L14 12C14 10.8954 13.1046 10 12 10L12 12ZM12 12L12 14C13.1046 14 14 13.1046 14 12L12 12ZM12 12L10 12C10 13.1046 10.8954 14 12 14L12 12ZM5 12L5 10C3.89543 10 3 10.8954 3 12L5 12ZM5 12L7 12C7 10.8954 6.10457 10 5 10L5 12ZM5 12L5 14C6.10457 14 7 13.1046 7 12L5 12ZM5 12L3 12C3 13.1046 3.89543 14 5 14L5 12ZM19 11L18.99 11L18.99 13L19 13L19 11ZM12 11L11.99 11L11.99 13L12 13L12 11ZM5 11L4.99 11L4.99 13L5 13L5 11Z"
                      fill="#687684"
                    />
                  </svg>
                </a>
                <div class="drop-down__col">
                  <ul class="drop-down__list">
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon1.svg" alt="" />
                        </div>
                        <span> Check Previous Token Balance </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon2.svg" alt="" />
                        </div>
                        <span> Add Token to Metamask (Web3) </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        role="button"
                        data-toggle="modal"
                        data-target="#tokens-modal"
                      >
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon3.svg" alt="" />
                        </div>
                        <span> Transfer Token </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon4.svg" alt="" />
                        </div>
                        <span> Hide Token </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="token-row">
              <div class="token__count">Quantity: 0.001624166539420776</div>
              <div class="token__price">Price: $42,572.00</div>
            </div>
          </div>
        </div>
        <div class="token">
          <div class="token-left">
            <img
              src="@/assets/img/token_icon5.svg"
              alt=""
              class="token__icon"
            />
            <div>
              <div class="token__name">Stellar (XLM)</div>
              <div class="token__address">
                Contract address: <a href="#">0xd3C...e70</a>
              </div>
            </div>
          </div>
          <div class="token-right">
            <div class="token-row">
              <div class="token__procent token__procent-green">1.44%</div>
              <div class="token__dollar">$4.66</div>
              <div class="profile-content-drop">
                <a href="#" class="profile-content-drop__link">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L19 13ZM18.99 11C18.4377 11 17.99 11.4477 17.99 12C17.99 12.5523 18.4377 13 18.99 13L18.99 11ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11L12 13ZM11.99 11C11.4377 11 10.99 11.4477 10.99 12C10.99 12.5523 11.4377 13 11.99 13L11.99 11ZM5 13C5.55229 13 6 12.5523 6 12C6 11.4477 5.55229 11 5 11L5 13ZM4.99 11C4.43771 11 3.99 11.4477 3.99 12C3.99 12.5523 4.43771 13 4.99 13L4.99 11ZM19 12L19 10C17.8954 10 17 10.8954 17 12L19 12ZM19 12L21 12C21 10.8954 20.1046 10 19 10L19 12ZM19 12L19 14C20.1046 14 21 13.1046 21 12L19 12ZM19 12L17 12C17 13.1046 17.8954 14 19 14L19 12ZM12 12L12 10C10.8954 10 10 10.8954 10 12L12 12ZM12 12L14 12C14 10.8954 13.1046 10 12 10L12 12ZM12 12L12 14C13.1046 14 14 13.1046 14 12L12 12ZM12 12L10 12C10 13.1046 10.8954 14 12 14L12 12ZM5 12L5 10C3.89543 10 3 10.8954 3 12L5 12ZM5 12L7 12C7 10.8954 6.10457 10 5 10L5 12ZM5 12L5 14C6.10457 14 7 13.1046 7 12L5 12ZM5 12L3 12C3 13.1046 3.89543 14 5 14L5 12ZM19 11L18.99 11L18.99 13L19 13L19 11ZM12 11L11.99 11L11.99 13L12 13L12 11ZM5 11L4.99 11L4.99 13L5 13L5 11Z"
                      fill="#687684"
                    />
                  </svg>
                </a>
                <div class="drop-down__col">
                  <ul class="drop-down__list">
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon1.svg" alt="" />
                        </div>
                        <span> Check Previous Token Balance </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon2.svg" alt="" />
                        </div>
                        <span> Add Token to Metamask (Web3) </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        role="button"
                        data-toggle="modal"
                        data-target="#tokens-modal"
                      >
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon3.svg" alt="" />
                        </div>
                        <span> Transfer Token </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon4.svg" alt="" />
                        </div>
                        <span> Hide Token </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="token-row">
              <div class="token__count">Quantity: 0.00356335</div>
              <div class="token__price">Price: $116.28</div>
            </div>
          </div>
        </div>
        <div class="token">
          <div class="token-left">
            <img
              src="@/assets/img/token_icon6.svg"
              alt=""
              class="token__icon"
            />
            <div>
              <div class="token__name">IOTA (MIOTA)</div>
              <div class="token__address">
                Contract address: <a href="#">0xd3C...e70</a>
              </div>
            </div>
          </div>
          <div class="token-right">
            <div class="token-row">
              <div class="token__procent token__procent-green">1.44%</div>
              <div class="token__dollar">$1,406.01</div>
              <div class="profile-content-drop">
                <a href="#" class="profile-content-drop__link">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L19 13ZM18.99 11C18.4377 11 17.99 11.4477 17.99 12C17.99 12.5523 18.4377 13 18.99 13L18.99 11ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11L12 13ZM11.99 11C11.4377 11 10.99 11.4477 10.99 12C10.99 12.5523 11.4377 13 11.99 13L11.99 11ZM5 13C5.55229 13 6 12.5523 6 12C6 11.4477 5.55229 11 5 11L5 13ZM4.99 11C4.43771 11 3.99 11.4477 3.99 12C3.99 12.5523 4.43771 13 4.99 13L4.99 11ZM19 12L19 10C17.8954 10 17 10.8954 17 12L19 12ZM19 12L21 12C21 10.8954 20.1046 10 19 10L19 12ZM19 12L19 14C20.1046 14 21 13.1046 21 12L19 12ZM19 12L17 12C17 13.1046 17.8954 14 19 14L19 12ZM12 12L12 10C10.8954 10 10 10.8954 10 12L12 12ZM12 12L14 12C14 10.8954 13.1046 10 12 10L12 12ZM12 12L12 14C13.1046 14 14 13.1046 14 12L12 12ZM12 12L10 12C10 13.1046 10.8954 14 12 14L12 12ZM5 12L5 10C3.89543 10 3 10.8954 3 12L5 12ZM5 12L7 12C7 10.8954 6.10457 10 5 10L5 12ZM5 12L5 14C6.10457 14 7 13.1046 7 12L5 12ZM5 12L3 12C3 13.1046 3.89543 14 5 14L5 12ZM19 11L18.99 11L18.99 13L19 13L19 11ZM12 11L11.99 11L11.99 13L12 13L12 11ZM5 11L4.99 11L4.99 13L5 13L5 11Z"
                      fill="#687684"
                    />
                  </svg>
                </a>
                <div class="drop-down__col">
                  <ul class="drop-down__list">
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon1.svg" alt="" />
                        </div>
                        <span> Check Previous Token Balance </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon2.svg" alt="" />
                        </div>
                        <span> Add Token to Metamask (Web3) </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        role="button"
                        data-toggle="modal"
                        data-target="#tokens-modal"
                      >
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon3.svg" alt="" />
                        </div>
                        <span> Transfer Token </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon4.svg" alt="" />
                        </div>
                        <span> Hide Token </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="token-row">
              <div class="token__count">Quantity: 0.019678021</div>
              <div class="token__price">Price: $20,377.00</div>
            </div>
          </div>
        </div>
        <div class="token">
          <div class="token-left">
            <img
              src="@/assets/img/token_icon7.svg"
              alt=""
              class="token__icon"
            />
            <div>
              <div class="token__name">Monero (XMR)</div>
              <div class="token__address">
                Contract address: <a href="#">0xd3C...e70</a>
              </div>
            </div>
          </div>
          <div class="token-right">
            <div class="token-row">
              <div class="token__procent token__procent-green">1.44%</div>
              <div class="token__dollar">$0.83</div>
              <div class="profile-content-drop">
                <a href="#" class="profile-content-drop__link">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L19 13ZM18.99 11C18.4377 11 17.99 11.4477 17.99 12C17.99 12.5523 18.4377 13 18.99 13L18.99 11ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11L12 13ZM11.99 11C11.4377 11 10.99 11.4477 10.99 12C10.99 12.5523 11.4377 13 11.99 13L11.99 11ZM5 13C5.55229 13 6 12.5523 6 12C6 11.4477 5.55229 11 5 11L5 13ZM4.99 11C4.43771 11 3.99 11.4477 3.99 12C3.99 12.5523 4.43771 13 4.99 13L4.99 11ZM19 12L19 10C17.8954 10 17 10.8954 17 12L19 12ZM19 12L21 12C21 10.8954 20.1046 10 19 10L19 12ZM19 12L19 14C20.1046 14 21 13.1046 21 12L19 12ZM19 12L17 12C17 13.1046 17.8954 14 19 14L19 12ZM12 12L12 10C10.8954 10 10 10.8954 10 12L12 12ZM12 12L14 12C14 10.8954 13.1046 10 12 10L12 12ZM12 12L12 14C13.1046 14 14 13.1046 14 12L12 12ZM12 12L10 12C10 13.1046 10.8954 14 12 14L12 12ZM5 12L5 10C3.89543 10 3 10.8954 3 12L5 12ZM5 12L7 12C7 10.8954 6.10457 10 5 10L5 12ZM5 12L5 14C6.10457 14 7 13.1046 7 12L5 12ZM5 12L3 12C3 13.1046 3.89543 14 5 14L5 12ZM19 11L18.99 11L18.99 13L19 13L19 11ZM12 11L11.99 11L11.99 13L12 13L12 11ZM5 11L4.99 11L4.99 13L5 13L5 11Z"
                      fill="#687684"
                    />
                  </svg>
                </a>
                <div class="drop-down__col">
                  <ul class="drop-down__list">
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon1.svg" alt="" />
                        </div>
                        <span> Check Previous Token Balance </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon2.svg" alt="" />
                        </div>
                        <span> Add Token to Metamask (Web3) </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        role="button"
                        data-toggle="modal"
                        data-target="#tokens-modal"
                      >
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon3.svg" alt="" />
                        </div>
                        <span> Transfer Token </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon4.svg" alt="" />
                        </div>
                        <span> Hide Token </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="token-row">
              <div class="token__count">Quantity: 0.0401091</div>
              <div class="token__price">Price: $4.187918</div>
            </div>
          </div>
        </div>
        <div class="token">
          <div class="token-left">
            <img
              src="@/assets/img/token_icon8.svg"
              alt=""
              class="token__icon"
            />
            <div>
              <div class="token__name">Harmony (ONE)</div>
              <div class="token__address">
                Contract address: <a href="#">0xd3C...e70</a>
              </div>
            </div>
          </div>
          <div class="token-right">
            <div class="token-row">
              <div class="token__dollar">-</div>
              <div class="profile-content-drop">
                <a href="#" class="profile-content-drop__link">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L19 13ZM18.99 11C18.4377 11 17.99 11.4477 17.99 12C17.99 12.5523 18.4377 13 18.99 13L18.99 11ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11L12 13ZM11.99 11C11.4377 11 10.99 11.4477 10.99 12C10.99 12.5523 11.4377 13 11.99 13L11.99 11ZM5 13C5.55229 13 6 12.5523 6 12C6 11.4477 5.55229 11 5 11L5 13ZM4.99 11C4.43771 11 3.99 11.4477 3.99 12C3.99 12.5523 4.43771 13 4.99 13L4.99 11ZM19 12L19 10C17.8954 10 17 10.8954 17 12L19 12ZM19 12L21 12C21 10.8954 20.1046 10 19 10L19 12ZM19 12L19 14C20.1046 14 21 13.1046 21 12L19 12ZM19 12L17 12C17 13.1046 17.8954 14 19 14L19 12ZM12 12L12 10C10.8954 10 10 10.8954 10 12L12 12ZM12 12L14 12C14 10.8954 13.1046 10 12 10L12 12ZM12 12L12 14C13.1046 14 14 13.1046 14 12L12 12ZM12 12L10 12C10 13.1046 10.8954 14 12 14L12 12ZM5 12L5 10C3.89543 10 3 10.8954 3 12L5 12ZM5 12L7 12C7 10.8954 6.10457 10 5 10L5 12ZM5 12L5 14C6.10457 14 7 13.1046 7 12L5 12ZM5 12L3 12C3 13.1046 3.89543 14 5 14L5 12ZM19 11L18.99 11L18.99 13L19 13L19 11ZM12 11L11.99 11L11.99 13L12 13L12 11ZM5 11L4.99 11L4.99 13L5 13L5 11Z"
                      fill="#687684"
                    />
                  </svg>
                </a>
                <div class="drop-down__col">
                  <ul class="drop-down__list">
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon1.svg" alt="" />
                        </div>
                        <span> Check Previous Token Balance </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon2.svg" alt="" />
                        </div>
                        <span> Add Token to Metamask (Web3) </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        role="button"
                        data-toggle="modal"
                        data-target="#tokens-modal"
                      >
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon3.svg" alt="" />
                        </div>
                        <span> Transfer Token </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon4.svg" alt="" />
                        </div>
                        <span> Hide Token </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="token-row">
              <div class="token__count">Quantity: 0.05</div>
              <div class="token__price">Price: -</div>
            </div>
          </div>
        </div>
        <div class="token">
          <div class="token-left">
            <img
              src="@/assets/img/token_icon9.svg"
              alt=""
              class="token__icon"
            />
            <div>
              <div class="token__name">Helium (HNT)</div>
              <div class="token__address">
                Contract address: <a href="#">0xd3C...e70</a>
              </div>
            </div>
          </div>
          <div class="token-right">
            <div class="token-row">
              <div class="token__procent token__procent-green">1.44%</div>
              <div class="token__dollar">$6.29</div>
              <div class="profile-content-drop">
                <a href="#" class="profile-content-drop__link">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L19 13ZM18.99 11C18.4377 11 17.99 11.4477 17.99 12C17.99 12.5523 18.4377 13 18.99 13L18.99 11ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11L12 13ZM11.99 11C11.4377 11 10.99 11.4477 10.99 12C10.99 12.5523 11.4377 13 11.99 13L11.99 11ZM5 13C5.55229 13 6 12.5523 6 12C6 11.4477 5.55229 11 5 11L5 13ZM4.99 11C4.43771 11 3.99 11.4477 3.99 12C3.99 12.5523 4.43771 13 4.99 13L4.99 11ZM19 12L19 10C17.8954 10 17 10.8954 17 12L19 12ZM19 12L21 12C21 10.8954 20.1046 10 19 10L19 12ZM19 12L19 14C20.1046 14 21 13.1046 21 12L19 12ZM19 12L17 12C17 13.1046 17.8954 14 19 14L19 12ZM12 12L12 10C10.8954 10 10 10.8954 10 12L12 12ZM12 12L14 12C14 10.8954 13.1046 10 12 10L12 12ZM12 12L12 14C13.1046 14 14 13.1046 14 12L12 12ZM12 12L10 12C10 13.1046 10.8954 14 12 14L12 12ZM5 12L5 10C3.89543 10 3 10.8954 3 12L5 12ZM5 12L7 12C7 10.8954 6.10457 10 5 10L5 12ZM5 12L5 14C6.10457 14 7 13.1046 7 12L5 12ZM5 12L3 12C3 13.1046 3.89543 14 5 14L5 12ZM19 11L18.99 11L18.99 13L19 13L19 11ZM12 11L11.99 11L11.99 13L12 13L12 11ZM5 11L4.99 11L4.99 13L5 13L5 11Z"
                      fill="#687684"
                    />
                  </svg>
                </a>
                <div class="drop-down__col">
                  <ul class="drop-down__list">
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon1.svg" alt="" />
                        </div>
                        <span> Check Previous Token Balance </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon2.svg" alt="" />
                        </div>
                        <span> Add Token to Metamask (Web3) </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        role="button"
                        data-toggle="modal"
                        data-target="#tokens-modal"
                      >
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon3.svg" alt="" />
                        </div>
                        <span> Transfer Token </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon4.svg" alt="" />
                        </div>
                        <span> Hide Token </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="token-row">
              <div class="token__count">Quantity: 0.069</div>
              <div class="token__price">Price: $103.79</div>
            </div>
          </div>
        </div>
        <div class="token">
          <div class="token-left">
            <img
              src="@/assets/img/token_icon10.svg"
              alt=""
              class="token__icon"
            />
            <div>
              <div class="token__name">Flow (FLOW)</div>
              <div class="token__address">
                Contract address: <a href="#">0xd3C...e70</a>
              </div>
            </div>
          </div>
          <div class="token-right">
            <div class="token-row">
              <div class="token__procent token__procent-green">1.44%</div>
              <div class="token__dollar">$858.51</div>
              <div class="profile-content-drop">
                <a href="#" class="profile-content-drop__link">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L19 13ZM18.99 11C18.4377 11 17.99 11.4477 17.99 12C17.99 12.5523 18.4377 13 18.99 13L18.99 11ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11L12 13ZM11.99 11C11.4377 11 10.99 11.4477 10.99 12C10.99 12.5523 11.4377 13 11.99 13L11.99 11ZM5 13C5.55229 13 6 12.5523 6 12C6 11.4477 5.55229 11 5 11L5 13ZM4.99 11C4.43771 11 3.99 11.4477 3.99 12C3.99 12.5523 4.43771 13 4.99 13L4.99 11ZM19 12L19 10C17.8954 10 17 10.8954 17 12L19 12ZM19 12L21 12C21 10.8954 20.1046 10 19 10L19 12ZM19 12L19 14C20.1046 14 21 13.1046 21 12L19 12ZM19 12L17 12C17 13.1046 17.8954 14 19 14L19 12ZM12 12L12 10C10.8954 10 10 10.8954 10 12L12 12ZM12 12L14 12C14 10.8954 13.1046 10 12 10L12 12ZM12 12L12 14C13.1046 14 14 13.1046 14 12L12 12ZM12 12L10 12C10 13.1046 10.8954 14 12 14L12 12ZM5 12L5 10C3.89543 10 3 10.8954 3 12L5 12ZM5 12L7 12C7 10.8954 6.10457 10 5 10L5 12ZM5 12L5 14C6.10457 14 7 13.1046 7 12L5 12ZM5 12L3 12C3 13.1046 3.89543 14 5 14L5 12ZM19 11L18.99 11L18.99 13L19 13L19 11ZM12 11L11.99 11L11.99 13L12 13L12 11ZM5 11L4.99 11L4.99 13L5 13L5 11Z"
                      fill="#687684"
                    />
                  </svg>
                </a>
                <div class="drop-down__col">
                  <ul class="drop-down__list">
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon1.svg" alt="" />
                        </div>
                        <span> Check Previous Token Balance </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon2.svg" alt="" />
                        </div>
                        <span> Add Token to Metamask (Web3) </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        role="button"
                        data-toggle="modal"
                        data-target="#tokens-modal"
                      >
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon3.svg" alt="" />
                        </div>
                        <span> Transfer Token </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon4.svg" alt="" />
                        </div>
                        <span> Hide Token </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="token-row">
              <div class="token__count">Quantity: 0.19910824</div>
              <div class="token__price">Price: $1,003.79</div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="profile-tabs2"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="profile-tabs2-tab"
      ></div>
      <div
        id="profile-tabs3"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="profile-tabs3-tab"
      >
        <div class="token">
          <div class="token-left">
            <img
              src="@/assets/img/token_icon1.svg"
              alt=""
              class="token__icon"
            />
            <div>
              <div class="token__name">Ethereum (ETH)</div>
              <div class="token__address">
                Contract address: <a href="#">0xd3C...e70</a>
              </div>
            </div>
          </div>
          <div class="token-right">
            <div class="token-row">
              <div class="token__procent token__procent-green">1.44%</div>
              <div class="token__dollar">$7,550,484.33</div>
              <div class="profile-content-drop">
                <a href="#" class="profile-content-drop__link">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L19 13ZM18.99 11C18.4377 11 17.99 11.4477 17.99 12C17.99 12.5523 18.4377 13 18.99 13L18.99 11ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11L12 13ZM11.99 11C11.4377 11 10.99 11.4477 10.99 12C10.99 12.5523 11.4377 13 11.99 13L11.99 11ZM5 13C5.55229 13 6 12.5523 6 12C6 11.4477 5.55229 11 5 11L5 13ZM4.99 11C4.43771 11 3.99 11.4477 3.99 12C3.99 12.5523 4.43771 13 4.99 13L4.99 11ZM19 12L19 10C17.8954 10 17 10.8954 17 12L19 12ZM19 12L21 12C21 10.8954 20.1046 10 19 10L19 12ZM19 12L19 14C20.1046 14 21 13.1046 21 12L19 12ZM19 12L17 12C17 13.1046 17.8954 14 19 14L19 12ZM12 12L12 10C10.8954 10 10 10.8954 10 12L12 12ZM12 12L14 12C14 10.8954 13.1046 10 12 10L12 12ZM12 12L12 14C13.1046 14 14 13.1046 14 12L12 12ZM12 12L10 12C10 13.1046 10.8954 14 12 14L12 12ZM5 12L5 10C3.89543 10 3 10.8954 3 12L5 12ZM5 12L7 12C7 10.8954 6.10457 10 5 10L5 12ZM5 12L5 14C6.10457 14 7 13.1046 7 12L5 12ZM5 12L3 12C3 13.1046 3.89543 14 5 14L5 12ZM19 11L18.99 11L18.99 13L19 13L19 11ZM12 11L11.99 11L11.99 13L12 13L12 11ZM5 11L4.99 11L4.99 13L5 13L5 11Z"
                      fill="#687684"
                    />
                  </svg>
                </a>
                <div class="drop-down__col">
                  <ul class="drop-down__list">
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon5.svg" alt="" />
                        </div>
                        <span> Show Token </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="thumb">
                          <img src="@/assets/img/toke_drop_icon6.svg" alt="" />
                        </div>
                        <span> Delete Token </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="token-row">
              <div class="token__count">Quantity: 9.779123268174130914</div>
              <div class="token__price">Price: $3,003.79</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      id="tokens-modal"
      class="modal fade profile-login-modal profile-nfts-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM7.70711 17.7071L17.7071 7.70711L16.2929 6.29289L6.29289 16.2929L7.70711 17.7071ZM6.29289 7.70711L16.2929 17.7071L17.7071 16.2929L7.70711 6.29289L6.29289 7.70711Z"
                  fill="#687684"
                ></path>
              </svg>
            </button>
            <h3 class="profile-login-modal__title">Transfer token</h3>
            <div class="profile-nfts-modal__form">
              <form>
                <div class="global-field">
                  <div class="global-field__title">Address wallet</div>
                  <input
                    type="text"
                    placeholder="Example: 0x078...0be"
                    class="global-input tokens-input-init global-input_large"
                  />
                </div>
                <div class="global-field">
                  <div class="global-field__title">Address wallet</div>
                  <div class="d-flex align-items-center">
                    <input
                      type="text"
                      placeholder="Example: 3"
                      class="global-input global-input_large"
                    />
                    <a href="#" class="btn-blue disabled btn_large btn_tokens">
                      Max
                    </a>
                  </div>
                  <div class="global-field__under">Maximum = 4,5</div>
                </div>
                <div class="text-center">
                  <button
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#profile-nfts-modal2"
                    type="button"
                    class="btn-blue disabled btn_large"
                    disabled
                  >
                    Transfer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="profile-nfts-modal2"
      class="modal fade profile-login-modal profile-nfts-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM7.70711 17.7071L17.7071 7.70711L16.2929 6.29289L6.29289 16.2929L7.70711 17.7071ZM6.29289 7.70711L16.2929 17.7071L17.7071 16.2929L7.70711 6.29289L6.29289 7.70711Z"
                  fill="#687684"
                ></path>
              </svg>
            </button>
            <h3 class="profile-login-modal__title">Transfer Success</h3>
            <img
              src="@/assets/img/tokens-modal-icon_img.svg"
              alt=""
              class="tokens-modal-icon"
            />
            <div class="profile-login-modal__text">
              Your send 1571,345.107865 ETH, transfer to
              <a href="#">0x078...0be</a>
            </div>
            <div class="text-center">
              <button class="btn-blue btn_large">Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { profileContentDropInit } from '~/utils/profileContentDrop';
import { tokensModalInit } from '~/utils/tokensModal';
import { addressModule } from '~/store';

@Component({
  head: {
    title: 'My Tokens | Crypto.Page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'My Tokens | Crypto.Page',
      },
    ],
  },
})
export default class TokensPage extends Vue {
  get chainSlug(): string {
    return addressModule.chainSlug;
  }

  get address(): string {
    return addressModule.address;
  }

  mounted() {
    profileContentDropInit();
    tokensModalInit();
  }
}
</script>
