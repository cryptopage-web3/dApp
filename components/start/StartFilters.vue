<template>
  <div class="market-main-with-filtrs-wr">
    <div id="market-main-filtr-col" class="market-main-with-filtrs collapse">
      <div class="market-filtrs-body">
        <div class="market-filtrs">
          <div class="market-filtrs-zag">
            <img src="@/assets/img/market-filtrs-zag-img.svg" alt="" />
            <span> Filter </span>
            <a
              data-toggle="collapse"
              href="#market-main-filtr-col"
              role="button"
              aria-expanded="false"
              class="market-main-filtr-oc__close"
            >
              <img
                src="@/assets/img/market-main-filtr-oc__close_img.svg"
                alt=""
              />
            </a>
          </div>
          <div class="market-filtr">
            <a href="#" class="market-filtr__link">
              <div class="thumb">
                <img src="@/assets/img/market-filtr_thumb1.svg" alt="" />
              </div>
              <span> Status </span>
            </a>
            <div class="market-filtr-body">
              <div class="market-filtr-wr">
                <div class="market-filtr-ch1">
                  <input
                    id="market-filtr-ch1"
                    type="checkbox"
                    checked
                    class="market-filtr-ch1__input"
                  />
                  <label class="market-filtr-ch1__label" for="market-filtr-ch1">
                    Buy now
                  </label>
                </div>
                <div class="market-filtr-ch1">
                  <input
                    id="market-filtr-ch2"
                    type="checkbox"
                    class="market-filtr-ch1__input"
                  />
                  <label class="market-filtr-ch1__label" for="market-filtr-ch2">
                    On auction
                  </label>
                </div>
                <div class="market-filtr-ch1">
                  <input
                    id="market-filtr-ch3"
                    type="checkbox"
                    class="market-filtr-ch1__input"
                  />
                  <label class="market-filtr-ch1__label" for="market-filtr-ch3">
                    New
                  </label>
                </div>
                <div class="market-filtr-ch1">
                  <input
                    id="market-filtr-ch4"
                    type="checkbox"
                    class="market-filtr-ch1__input"
                  />
                  <label class="market-filtr-ch1__label" for="market-filtr-ch4">
                    Has offers
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="market-filtr">
            <a href="#" class="market-filtr__link">
              <div class="thumb">
                <img src="@/assets/img/market-filtr_thumb2.svg" alt="" />
              </div>
              <span> Price </span>
            </a>
            <div class="market-filtr-body">
              <div class="market-filtr-wr">
                <div class="profile-content-drop market-filtr__drop mb_10">
                  <a href="#" class="profile-content-drop__link">
                    <span> USD </span>
                  </a>
                  <div class="drop-down__col">
                    <ul class="drop-down__list">
                      <li>
                        <a href="#">
                          <span>ETH</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>BNB</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>BTC</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>ADA</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="market-filtr-min-max">
                  <input type="text" class="global-input" placeholder="Min" />
                  <span> to </span>
                  <input type="text" class="global-input" placeholder="Max" />
                </div>
                <button class="btn_default mb_10 w-100">Apply</button>
              </div>
            </div>
          </div>
          <div class="market-filtr">
            <a href="#" class="market-filtr__link">
              <div class="thumb">
                <img src="@/assets/img/market-filtr_thumb3.svg" alt="" />
              </div>
              <span> Collections </span>
            </a>
            <div class="market-filtr-body">
              <div class="market-filtr-wr">
                <input
                  type="text"
                  placeholder="Filter"
                  class="global-input market-filtr-input_search w-100 mb_10"
                />
                <div class="market-filtr-ch2">
                  <input
                    id="market-filtr-ch5"
                    type="checkbox"
                    checked
                    class="market-filtr-ch2__input"
                  />
                  <label class="market-filtr-ch2__label" for="market-filtr-ch5">
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-filtr-ch2_img1.png"
                        alt=""
                      />
                    </div>
                    <span> CryptoPunk </span>
                  </label>
                </div>
                <div class="market-filtr-ch2">
                  <input
                    id="market-filtr-ch6"
                    type="checkbox"
                    class="market-filtr-ch2__input"
                  />
                  <label class="market-filtr-ch2__label" for="market-filtr-ch6">
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-filtr-ch2_img2.png"
                        alt=""
                      />
                    </div>
                    <span> BabyCube </span>
                  </label>
                </div>
                <div class="market-filtr-ch2">
                  <input
                    id="market-filtr-ch7"
                    type="checkbox"
                    class="market-filtr-ch2__input"
                  />
                  <label class="market-filtr-ch2__label" for="market-filtr-ch7">
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-filtr-ch2_img3.png"
                        alt=""
                      />
                    </div>
                    <span> Fungles Assets </span>
                  </label>
                </div>
                <div class="market-filtr-ch2">
                  <input
                    id="market-filtr-ch8"
                    type="checkbox"
                    class="market-filtr-ch2__input"
                  />
                  <label class="market-filtr-ch2__label" for="market-filtr-ch8">
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-filtr-ch2_img4.png"
                        alt=""
                      />
                    </div>
                    <span> Neon District Season One ... </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="market-filtr">
            <a href="#" class="market-filtr__link">
              <div class="thumb">
                <img src="@/assets/img/market-filtr_thumb4.svg" alt="" />
              </div>
              <span> Chains </span>
            </a>
            <div class="market-filtr-body">
              <div class="market-filtr-wr">
                <div class="market-filtr-ch2">
                  <input
                    id="market-filtr-ch9"
                    type="checkbox"
                    class="market-filtr-ch2__input"
                  />
                  <label class="market-filtr-ch2__label" for="market-filtr-ch9">
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-filtr-ch2_img5.svg"
                        alt=""
                      />
                    </div>
                    <span> Ethereum </span>
                  </label>
                </div>
                <div class="market-filtr-ch2">
                  <input
                    id="market-filtr-ch10"
                    type="checkbox"
                    class="market-filtr-ch2__input"
                  />
                  <label
                    class="market-filtr-ch2__label"
                    for="market-filtr-ch10"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-filtr-ch2_img6.svg"
                        alt=""
                      />
                    </div>
                    <span> Polygon </span>
                  </label>
                </div>
                <div class="market-filtr-ch2">
                  <input
                    id="market-filtr-ch11"
                    type="checkbox"
                    class="market-filtr-ch2__input"
                  />
                  <label
                    class="market-filtr-ch2__label"
                    for="market-filtr-ch11"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-filtr-ch2_img7.svg"
                        alt=""
                      />
                    </div>
                    <span> Klaytn </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="market-filtr">
            <a href="#" class="market-filtr__link">
              <div class="thumb">
                <img src="@/assets/img/market-filtr_thumb5.svg" alt="" />
              </div>
              <span> Categories </span>
            </a>
            <div class="market-filtr-body">
              <div class="market-filtr-wr">
                <div class="market-filtr-ch2">
                  <input
                    id="market-filtr-ch12"
                    type="checkbox"
                    class="market-filtr-ch2__input"
                  />
                  <label
                    class="market-filtr-ch2__label"
                    for="market-filtr-ch12"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-filtr-ch2_img8.svg"
                        alt=""
                      />
                    </div>
                    <span> Art </span>
                  </label>
                </div>
                <div class="market-filtr-ch2">
                  <input
                    id="market-filtr-ch13"
                    type="checkbox"
                    class="market-filtr-ch2__input"
                  />
                  <label
                    class="market-filtr-ch2__label"
                    for="market-filtr-ch13"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-filtr-ch2_img8.svg"
                        alt=""
                      />
                    </div>
                    <span> Collectibles </span>
                  </label>
                </div>
                <div class="market-filtr-ch2">
                  <input
                    id="market-filtr-ch14"
                    type="checkbox"
                    class="market-filtr-ch2__input"
                  />
                  <label
                    class="market-filtr-ch2__label"
                    for="market-filtr-ch14"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-filtr-ch2_img8.svg"
                        alt=""
                      />
                    </div>
                    <span> Domain Names </span>
                  </label>
                </div>
                <div class="market-filtr-ch2">
                  <input
                    id="market-filtr-ch15"
                    type="checkbox"
                    class="market-filtr-ch2__input"
                  />
                  <label
                    class="market-filtr-ch2__label"
                    for="market-filtr-ch15"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-filtr-ch2_img8.svg"
                        alt=""
                      />
                    </div>
                    <span> Music </span>
                  </label>
                </div>
                <div class="market-filtr-ch2">
                  <input
                    id="market-filtr-ch16"
                    type="checkbox"
                    class="market-filtr-ch2__input"
                  />
                  <label
                    class="market-filtr-ch2__label"
                    for="market-filtr-ch16"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-filtr-ch2_img8.svg"
                        alt=""
                      />
                    </div>
                    <span> Photography </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="market-filtr">
            <a href="#" class="market-filtr__link">
              <div class="thumb">
                <img src="@/assets/img/market-filtr_thumb6.svg" alt="" />
              </div>
              <span> On sale in </span>
            </a>
            <div class="market-filtr-body">
              <div class="market-filtr-wr">
                <input
                  type="text"
                  placeholder="Filter"
                  class="global-input market-filtr-input_search w-100 mb_10"
                />
                <div class="market-filtr-ch3">
                  <input
                    id="market-filtr-ch17"
                    type="checkbox"
                    class="market-filtr-ch3__input"
                  />
                  <label
                    class="market-filtr-ch3__label"
                    for="market-filtr-ch17"
                  >
                    ETH
                  </label>
                </div>
                <div class="market-filtr-ch3">
                  <input
                    id="market-filtr-ch18"
                    type="checkbox"
                    class="market-filtr-ch3__input"
                  />
                  <label
                    class="market-filtr-ch3__label"
                    for="market-filtr-ch18"
                  >
                    WETH
                  </label>
                </div>
                <div class="market-filtr-ch3">
                  <input
                    id="market-filtr-ch19"
                    type="checkbox"
                    class="market-filtr-ch3__input"
                  />
                  <label
                    class="market-filtr-ch3__label"
                    for="market-filtr-ch19"
                  >
                    $BASED
                  </label>
                </div>
                <div class="market-filtr-ch3">
                  <input
                    id="market-filtr-ch20"
                    type="checkbox"
                    class="market-filtr-ch3__input"
                  />
                  <label
                    class="market-filtr-ch3__label"
                    for="market-filtr-ch20"
                  >
                    $DG
                  </label>
                </div>
                <div class="market-filtr-ch3">
                  <input
                    id="market-filtr-ch21"
                    type="checkbox"
                    class="market-filtr-ch3__input"
                  />
                  <label
                    class="market-filtr-ch3__label"
                    for="market-filtr-ch21"
                  >
                    0xBTC
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="market-main-with-filtrs-right">
      <div class="result-filtrs-nav">
        <div class="count">1 339 items</div>
        <div class="result-filtrs-nav__right">
          <div class="result-filtrs-nav__checked">
            <a href="#" class="item">
              <img
                src="@/assets/img/result-filtrs-nav_thumb.png"
                alt=""
                class="thumb"
              />
              <span> CryptoPunk </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4592 14.8736C13.8498 15.2641 14.4829 15.2641 14.8734 14.8736C15.264 14.4831 15.264 13.8499 14.8734 13.4594L13.4592 14.8736ZM6.54011 5.12606C6.14959 4.73554 5.51643 4.73554 5.1259 5.12606C4.73538 5.51659 4.73538 6.14975 5.1259 6.54028L6.54011 5.12606ZM5.1259 13.4594C4.73538 13.8499 4.73538 14.4831 5.1259 14.8736C5.51643 15.2641 6.14959 15.2641 6.54011 14.8736L5.1259 13.4594ZM14.8734 6.54028C15.264 6.14975 15.264 5.51659 14.8734 5.12606C14.4829 4.73554 13.8498 4.73554 13.4592 5.12606L14.8734 6.54028ZM14.8734 13.4594L6.54011 5.12606L5.1259 6.54028L13.4592 14.8736L14.8734 13.4594ZM6.54011 14.8736L14.8734 6.54028L13.4592 5.12606L5.1259 13.4594L6.54011 14.8736Z"
                  fill="#687684"
                />
              </svg>
            </a>
            <a href="#" class="item">
              <span> Buy now </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4592 14.8736C13.8498 15.2641 14.4829 15.2641 14.8734 14.8736C15.264 14.4831 15.264 13.8499 14.8734 13.4594L13.4592 14.8736ZM6.54011 5.12606C6.14959 4.73554 5.51643 4.73554 5.1259 5.12606C4.73538 5.51659 4.73538 6.14975 5.1259 6.54028L6.54011 5.12606ZM5.1259 13.4594C4.73538 13.8499 4.73538 14.4831 5.1259 14.8736C5.51643 15.2641 6.14959 15.2641 6.54011 14.8736L5.1259 13.4594ZM14.8734 6.54028C15.264 6.14975 15.264 5.51659 14.8734 5.12606C14.4829 4.73554 13.8498 4.73554 13.4592 5.12606L14.8734 6.54028ZM14.8734 13.4594L6.54011 5.12606L5.1259 6.54028L13.4592 14.8736L14.8734 13.4594ZM6.54011 14.8736L14.8734 6.54028L13.4592 5.12606L5.1259 13.4594L6.54011 14.8736Z"
                  fill="#687684"
                />
              </svg>
            </a>
            <a href="#" class="clear-all"> Clear all </a>
          </div>
          <div class="drop-down result-filtrs-sort">
            <a
              data-toggle="collapse"
              href="#result-filtrs-sort"
              role="button"
              aria-expanded="false"
              class="drop-down__link"
              ><span>Sort by</span></a
            >
            <div id="result-filtrs-sort" class="collapse drop-down__col">
              <ul class="drop-down__list">
                <li>
                  <a href="#"><span>Date</span></a>
                </li>
                <li>
                  <a href="#"><span>ABC</span></a>
                </li>
                <li>
                  <a href="#"><span>Price</span></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="result-filtrs-wrap">
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb1Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">Fungles Assets</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      Bored FungleHeadz #3977
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb2Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">Fungles Assets</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      Bored FungleHeadz #3977
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb3Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb4Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb5Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb6Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb7Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb8Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb1Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">Fungles Assets</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      Bored FungleHeadz #3977
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb2Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">Fungles Assets</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      Bored FungleHeadz #3977
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb3Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb4Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb5Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb6Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb7Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb8Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb1Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">Fungles Assets</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      Bored FungleHeadz #3977
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb2Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">Fungles Assets</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      Bored FungleHeadz #3977
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb3Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
        <div class="market-product">
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${thumb4Url})`,
            }"
          >
            <a href="#" class="market-product__fav">
              <svg
                class="market-product__fav-empty"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8332 16.5L12.386 17.3944C12.6959 17.5494 13.0641 17.5329 13.3589 17.3507C13.6537 17.1684 13.8332 16.8466 13.8332 16.5H12.8332ZM1.1665 16.5H0.166504C0.166504 16.8466 0.345956 17.1684 0.640773 17.3507C0.935589 17.5329 1.30373 17.5494 1.61372 17.3944L1.1665 16.5ZM6.99984 13.5833L7.44705 12.6889C7.16552 12.5481 6.83415 12.5481 6.55262 12.6889L6.99984 13.5833ZM2.83317 2.5H11.1665V0.5H2.83317V2.5ZM11.8332 3.16667V16.5H13.8332V3.16667H11.8332ZM2.1665 16.5V3.16667H0.166504V16.5H2.1665ZM13.2804 15.6056L7.44705 12.6889L6.55262 14.4778L12.386 17.3944L13.2804 15.6056ZM6.55262 12.6889L0.71929 15.6056L1.61372 17.3944L7.44705 14.4778L6.55262 12.6889ZM11.1665 2.5C11.5347 2.5 11.8332 2.79848 11.8332 3.16667H13.8332C13.8332 1.69391 12.6393 0.5 11.1665 0.5V2.5ZM2.83317 0.5C1.36041 0.5 0.166504 1.69391 0.166504 3.16667H2.1665C2.1665 2.79848 2.46498 2.5 2.83317 2.5V0.5Z"
                  fill="#687684"
                />
              </svg>
              <svg
                class="market-product__fav-fill"
                width="14"
                height="18"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 0C1.34315 0 0 1.34315 0 3V19C0 19.3466 0.179452 19.6684 0.474269 19.8507C0.769085 20.0329 1.13723 20.0494 1.44721 19.8944L8 16.618L14.5528 19.8944C14.8628 20.0494 15.2309 20.0329 15.5257 19.8507C15.8205 19.6684 16 19.3466 16 19V3C16 1.34315 14.6569 0 13 0H3Z"
                  fill="#1886FF"
                />
              </svg>
            </a>
            <div class="market-product__nav">
              <a href="#">Creator</a>
              <a href="#">Owner</a>
              <a href="#">Collection</a>
            </div>
          </div>
          <div class="market-product-middle">
            <table class="market-product__table">
              <tbody>
                <tr>
                  <td>
                    <a href="#" class="market-product__title">BabyCube</a>
                  </td>
                  <td class="market-product__price">Price</td>
                </tr>
                <tr>
                  <td>
                    <a href="#" class="market-product__name">
                      PunkMusicClub #2151
                    </a>
                  </td>
                  <td>
                    <div class="market-product__count">
                      <img
                        src="@/assets/img/market-header__wallet_icon1.svg"
                        alt=""
                      />
                      <span> 2 </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="market-product-bottom">
            <ul class="market-product-ld">
              <li>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95 5C5.21625 5 3 7.15216 3 9.80685C3 14.6137 8.85 18.9836 12 20C15.15 18.9836 21 14.6137 21 9.80685C21 7.15216 18.7837 5 16.05 5C14.376 5 12.8955 5.80712 12 7.04248C11.5436 6.41112 10.9372 5.89586 10.2322 5.54033C9.52721 5.1848 8.74438 4.99946 7.95 5Z"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 8 607 </span>
                </a>
              </li>
              <li>
                <a href="#" class="market-product-dislike">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.1471L10.65 12.9412L13.8 10.2941L9.75 8.08824L10.2 5.52941C9.525 5.19059 8.76 5 7.95 5C5.21625 5 3 7.17279 3 9.85294C3 14.7059 8.85 19.1176 12 20C15.15 19.1176 21 14.7059 21 9.85294C21 7.17279 18.7837 5 16.05 5C15.24 5 14.475 5.19103 13.8 5.52941"
                      stroke="#687684"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span> 2 342 </span>
                </a>
              </li>
            </ul>
            <a href="#" class="market-product__buy">Buy Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { startFiltersInit } from '~/utils/startFilters';
import { profileContentDropInit } from '~/utils/profileContentDrop';
import marketProductThumb1 from '~/assets/img/market-product_thumb1.png';
import marketProductThumb2 from '~/assets/img/market-product_thumb2.png';
import marketProductThumb3 from '~/assets/img/market-product_thumb3.png';
import marketProductThumb4 from '~/assets/img/market-product_thumb4.png';
import marketProductThumb5 from '~/assets/img/market-product_thumb5.png';
import marketProductThumb6 from '~/assets/img/market-product_thumb6.png';
import marketProductThumb7 from '~/assets/img/market-product_thumb7.png';
import marketProductThumb8 from '~/assets/img/market-product_thumb8.png';

@Component({})
export default class StartFilters extends Vue {
  thumb1Url = marketProductThumb1;
  thumb2Url = marketProductThumb2;
  thumb3Url = marketProductThumb3;
  thumb4Url = marketProductThumb4;
  thumb5Url = marketProductThumb5;
  thumb6Url = marketProductThumb6;
  thumb7Url = marketProductThumb7;
  thumb8Url = marketProductThumb8;

  mounted() {
    startFiltersInit();
    profileContentDropInit();
  }
}
</script>
