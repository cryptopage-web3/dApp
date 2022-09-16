<template>
  <div
    id="profile-tabs1"
    class="tab-pane fade show active"
    role="tabpanel"
    aria-labelledby="profile-tabs1-tab"
  >
    <div class="token">
      <div class="token-left">
        <img src="@/assets/img/token_icon1.svg" alt="" class="token__icon" />
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
        <img src="@/assets/img/token_icon2.svg" alt="" class="token__icon" />
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
        <img src="@/assets/img/token_icon3.svg" alt="" class="token__icon" />
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
        <img src="@/assets/img/token_icon4.svg" alt="" class="token__icon" />
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
        <img src="@/assets/img/token_icon5.svg" alt="" class="token__icon" />
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
        <img src="@/assets/img/token_icon6.svg" alt="" class="token__icon" />
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
        <img src="@/assets/img/token_icon7.svg" alt="" class="token__icon" />
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
        <img src="@/assets/img/token_icon8.svg" alt="" class="token__icon" />
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
        <img src="@/assets/img/token_icon9.svg" alt="" class="token__icon" />
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
        <img src="@/assets/img/token_icon10.svg" alt="" class="token__icon" />
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
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class TokensContentAssets extends Vue {}
</script>
