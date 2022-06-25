<template>
  <div class="row">
    <div class="col-12">
      <div class="market-main-default-top">
        <div class="left">
          <h2 class="title">Hot collection</h2>
          <div class="main-page-dropdown">
            <button
              id="dropdownMenuButton2"
              class="main-page-dropdown__btn"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              day
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
              <a class="dropdown-item" href="#">hour</a>
              <a class="dropdown-item" href="#">month</a>
              <a class="dropdown-item" href="#">year</a>
            </div>
          </div>
        </div>
        <a href="#" class="more-nfts">
          <span> Discover more NFT’s </span>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="29"
              height="29"
              rx="4.5"
              stroke="#1886FF"
            ></rect>
            <path
              d="M15.6079 15.0206L12.6579 17.9706C12.5027 18.1267 12.4156 18.3379 12.4156 18.5581C12.4156 18.7782 12.5027 18.9895 12.6579 19.1456C12.7354 19.2237 12.8276 19.2857 12.9291 19.328C13.0307 19.3703 13.1396 19.3921 13.2496 19.3921C13.3596 19.3921 13.4685 19.3703 13.5701 19.328C13.6716 19.2857 13.7638 19.2237 13.8413 19.1456L17.3746 15.6123C17.4527 15.5348 17.5147 15.4426 17.557 15.3411C17.5993 15.2395 17.6211 15.1306 17.6211 15.0206C17.6211 14.9106 17.5993 14.8017 17.557 14.7001C17.5147 14.5986 17.4527 14.5064 17.3746 14.4289L13.8413 10.8539C13.7634 10.7767 13.671 10.7156 13.5695 10.6741C13.468 10.6326 13.3593 10.6116 13.2496 10.6123C13.1399 10.6116 13.0312 10.6326 12.9297 10.6741C12.8281 10.7156 12.7358 10.7767 12.6579 10.8539C12.5027 11.0101 12.4156 11.2213 12.4156 11.4414C12.4156 11.6616 12.5027 11.8728 12.6579 12.0289L15.6079 15.0206Z"
              fill="#1886FF"
            ></path>
          </svg>
        </a>
      </div>
    </div>
    <div class="col-xl-3 col-md-4 col-12">
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
    </div>
    <div class="col-xl-3 col-md-4 col-12">
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
    </div>
    <div class="col-xl-3 col-md-4 col-12">
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
    </div>
    <div class="col-xl-3 col-md-4 col-12">
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
    <div class="col-xl-3 col-md-4 col-12">
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
    </div>
    <div class="col-xl-3 col-md-4 col-12">
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
    </div>
    <div class="col-xl-3 col-md-4 col-12">
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
    </div>
    <div class="col-xl-3 col-md-4 col-12">
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import marketProductThumb1 from '~/assets/img/market-product_thumb1.png';
import marketProductThumb2 from '~/assets/img/market-product_thumb2.png';
import marketProductThumb3 from '~/assets/img/market-product_thumb3.png';
import marketProductThumb4 from '~/assets/img/market-product_thumb4.png';
import marketProductThumb5 from '~/assets/img/market-product_thumb5.png';
import marketProductThumb6 from '~/assets/img/market-product_thumb6.png';
import marketProductThumb7 from '~/assets/img/market-product_thumb7.png';
import marketProductThumb8 from '~/assets/img/market-product_thumb8.png';

@Component({})
export default class StartHotCollection extends Vue {
  thumb1Url = marketProductThumb1;
  thumb2Url = marketProductThumb2;
  thumb3Url = marketProductThumb3;
  thumb4Url = marketProductThumb4;
  thumb5Url = marketProductThumb5;
  thumb6Url = marketProductThumb6;
  thumb7Url = marketProductThumb7;
  thumb8Url = marketProductThumb8;
}
</script>
