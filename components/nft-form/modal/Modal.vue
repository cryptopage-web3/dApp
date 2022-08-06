<template>
  <div>
    <!-- Modal -->
    <div
      id="modal-creat-nft"
      class="modal fade modal-creat"
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
              <ModalCloseIcon />
            </button>
            <div class="modal-creat-row mb_20">
              <div class="modal-creat__title mb_20">Create new item</div>

              <ModalTitle />
              <ModalDescription />
              <ModalFile />
            </div>
            <div class="modal-creat-row">
              <div class="modal-creat__title mb_20">Addictional fields</div>

              <ModalExternalLink />
              <ModalCollection />
              <ModalComments />

              <div class="modal-creat-checkbox mb_20">
                <div class="modal-creat-checkbox__left">
                  <div class="modal-creat-checkbox__icon">
                    <img
                      src="@/assets/img/modal-creat-checkbox_icon2.svg"
                      alt=""
                    />
                  </div>
                  <div class="modal-creat-checkbox__cont">
                    <div class="modal-creat-checkbox__title">
                      Unlockable content
                    </div>
                    <div class="modal-creat-checkbox__text">
                      Include unlockable content that can only be revealed by
                      the owner of the item
                    </div>
                  </div>
                </div>
                <div class="modal-creat-checkbox__right">
                  <label class="global-checkbox">
                    <input type="checkbox" />
                    <div class="global-checkbox__wrap">
                      <div class="global-checkbox__circle"></div>
                    </div>
                  </label>
                </div>
              </div>
              <div class="form-field modal-creat-text-content mb_20">
                <div class="form-field__title">Text content</div>
                <textarea
                  class="global-input global-input_textarea"
                  placeholder="Enter text"
                >
Dolor sit vel adipiscing interdum in mollis venenatis accumsan nunc justo nulla lacinia mattis eleifend nec imperdiet in nunc nisi vitae ut. </textarea
                >
              </div>
              <div class="modal-creat-checkbox mb_20">
                <div class="modal-creat-checkbox__left">
                  <div class="modal-creat-checkbox__icon">
                    <img
                      src="@/assets/img/modal-creat-checkbox_icon3.svg"
                      alt=""
                    />
                  </div>
                  <div class="modal-creat-checkbox__cont">
                    <div class="modal-creat-checkbox__title">
                      Explicit & Sensitive Content
                    </div>
                    <div class="modal-creat-checkbox__text">
                      Set this item as explicit and sensitive content
                    </div>
                  </div>
                </div>
                <div class="modal-creat-checkbox__right">
                  <label class="global-checkbox">
                    <input type="checkbox" />
                    <div class="global-checkbox__wrap">
                      <div class="global-checkbox__circle"></div>
                    </div>
                  </label>
                </div>
              </div>
              <div class="modal-creat-collapse mb_20">
                <a
                  href="#"
                  class="modal-creat-checkbox modal-creat-collapse-link"
                >
                  <div class="modal-creat-checkbox__left">
                    <div class="modal-creat-checkbox__icon">
                      <img
                        src="@/assets/img/modal-creat-checkbox_icon4.svg"
                        alt=""
                      />
                    </div>
                    <div class="modal-creat-checkbox__cont">
                      <div class="modal-creat-checkbox__title">Properties</div>
                      <div class="modal-creat-checkbox__text">
                        Textual traits that show up as rectangles
                      </div>
                    </div>
                  </div>
                  <div class="modal-creat-collapse-link__arrow">
                    <img
                      src="@/assets/img/modal-creat-collapse-link_arrow_img.svg"
                      alt=""
                    />
                  </div>
                </a>
                <div class="modal-creat-collapse-body">
                  <div class="modal-creat__title2 mb_10">Add properties</div>
                  <div class="modal-creat-add">
                    <a href="#" class="modal-creat-add__close disabled">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.500977"
                          width="29"
                          height="29"
                          rx="14.5"
                          stroke="#E4E4E4"
                        />
                        <path
                          d="M19.8731 11.5413C20.2636 11.1507 20.2636 10.5176 19.8731 10.127C19.4826 9.73652 18.8494 9.73652 18.4589 10.127L19.8731 11.5413ZM10.1256 18.4604C9.73505 18.8509 9.73505 19.4841 10.1256 19.8746C10.5161 20.2651 11.1493 20.2651 11.5398 19.8746L10.1256 18.4604ZM18.4589 19.8746C18.8494 20.2651 19.4826 20.2651 19.8731 19.8746C20.2636 19.4841 20.2636 18.8509 19.8731 18.4604L18.4589 19.8746ZM11.5398 10.127C11.1493 9.73652 10.5161 9.73652 10.1256 10.127C9.73505 10.5176 9.73505 11.1507 10.1256 11.5413L11.5398 10.127ZM18.4589 10.127L10.1256 18.4604L11.5398 19.8746L19.8731 11.5413L18.4589 10.127ZM19.8731 18.4604L11.5398 10.127L10.1256 11.5413L18.4589 19.8746L19.8731 18.4604Z"
                          fill="#A7A7A7"
                        />
                      </svg>
                    </a>
                    <div class="modal-creat-add-wrap modal-creat-add-wrap1">
                      <input
                        type="text"
                        placeholder="Type"
                        name="type"
                        class="global-input modal-creat-add-input-js mr_5 mr_md_10"
                      />
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        class="global-input modal-creat-add-input-js mr_5 mr_md_10"
                      />
                      <a
                        href="#"
                        class="modal-creat-add__btn1 btn btn_default disabled"
                      >
                        Apply
                      </a>
                    </div>
                    <div class="modal-creat-add-cont"></div>
                  </div>
                </div>
              </div>
              <div class="modal-creat-collapse mb_20">
                <a
                  href="#"
                  class="modal-creat-checkbox modal-creat-collapse-link"
                >
                  <div class="modal-creat-checkbox__left">
                    <div class="modal-creat-checkbox__icon">
                      <img
                        src="@/assets/img/modal-creat-checkbox_icon5.svg"
                        alt=""
                      />
                    </div>
                    <div class="modal-creat-checkbox__cont">
                      <div class="modal-creat-checkbox__title">Stats</div>
                      <div class="modal-creat-checkbox__text">
                        Numerical traits that just show as numbers
                      </div>
                    </div>
                  </div>
                  <div class="modal-creat-collapse-link__arrow">
                    <img
                      src="@/assets/img/modal-creat-collapse-link_arrow_img.svg"
                      alt=""
                    />
                  </div>
                </a>
                <div class="modal-creat-collapse-body">
                  <div class="modal-creat__title2 mb_10">Add Stats</div>
                  <div class="modal-creat-add">
                    <a href="#" class="modal-creat-add__close disabled">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.500977"
                          width="29"
                          height="29"
                          rx="14.5"
                          stroke="#E4E4E4"
                        />
                        <path
                          d="M19.8731 11.5413C20.2636 11.1507 20.2636 10.5176 19.8731 10.127C19.4826 9.73652 18.8494 9.73652 18.4589 10.127L19.8731 11.5413ZM10.1256 18.4604C9.73505 18.8509 9.73505 19.4841 10.1256 19.8746C10.5161 20.2651 11.1493 20.2651 11.5398 19.8746L10.1256 18.4604ZM18.4589 19.8746C18.8494 20.2651 19.4826 20.2651 19.8731 19.8746C20.2636 19.4841 20.2636 18.8509 19.8731 18.4604L18.4589 19.8746ZM11.5398 10.127C11.1493 9.73652 10.5161 9.73652 10.1256 10.127C9.73505 10.5176 9.73505 11.1507 10.1256 11.5413L11.5398 10.127ZM18.4589 10.127L10.1256 18.4604L11.5398 19.8746L19.8731 11.5413L18.4589 10.127ZM19.8731 18.4604L11.5398 10.127L10.1256 11.5413L18.4589 19.8746L19.8731 18.4604Z"
                          fill="#A7A7A7"
                        />
                      </svg>
                    </a>
                    <div class="modal-creat-add-wrap modal-creat-add-wrap2">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        class="global-input modal-creat-add-input-js mr_5 mr_md_10"
                      />
                      <input
                        type="text"
                        placeholder="3"
                        name="from"
                        class="global-input modal-creat-add-input-js mr_5 mr_md_10"
                      />
                      <span class="d-inline-block mr_5 mr_md_10">of</span>
                      <input
                        type="text"
                        placeholder="5"
                        name="to"
                        class="global-input modal-creat-add-input-js mr_5 mr_md_10"
                      />
                      <a
                        href="#"
                        class="modal-creat-add__btn2 btn btn_default disabled"
                      >
                        Apply
                      </a>
                    </div>
                    <div class="modal-creat-add-cont"></div>
                  </div>
                </div>
              </div>
              <div class="modal-creat-collapse mb_20">
                <a
                  href="#"
                  class="modal-creat-checkbox modal-creat-collapse-link"
                >
                  <div class="modal-creat-checkbox__left">
                    <div class="modal-creat-checkbox__icon">
                      <img
                        src="@/assets/img/modal-creat-checkbox_icon6.svg"
                        alt=""
                      />
                    </div>
                    <div class="modal-creat-checkbox__cont">
                      <div class="modal-creat-checkbox__title">Levels</div>
                      <div class="modal-creat-checkbox__text">
                        Numerical traits that show as a progress bar
                      </div>
                    </div>
                  </div>
                  <div class="modal-creat-collapse-link__arrow">
                    <img
                      src="@/assets/img/modal-creat-collapse-link_arrow_img.svg"
                      alt=""
                    />
                  </div>
                </a>
                <div class="modal-creat-collapse-body">
                  <div class="modal-creat__title2 mb_10">Add Levels</div>
                  <div class="modal-creat-add">
                    <a href="#" class="modal-creat-add__close disabled">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.500977"
                          width="29"
                          height="29"
                          rx="14.5"
                          stroke="#E4E4E4"
                        />
                        <path
                          d="M19.8731 11.5413C20.2636 11.1507 20.2636 10.5176 19.8731 10.127C19.4826 9.73652 18.8494 9.73652 18.4589 10.127L19.8731 11.5413ZM10.1256 18.4604C9.73505 18.8509 9.73505 19.4841 10.1256 19.8746C10.5161 20.2651 11.1493 20.2651 11.5398 19.8746L10.1256 18.4604ZM18.4589 19.8746C18.8494 20.2651 19.4826 20.2651 19.8731 19.8746C20.2636 19.4841 20.2636 18.8509 19.8731 18.4604L18.4589 19.8746ZM11.5398 10.127C11.1493 9.73652 10.5161 9.73652 10.1256 10.127C9.73505 10.5176 9.73505 11.1507 10.1256 11.5413L11.5398 10.127ZM18.4589 10.127L10.1256 18.4604L11.5398 19.8746L19.8731 11.5413L18.4589 10.127ZM19.8731 18.4604L11.5398 10.127L10.1256 11.5413L18.4589 19.8746L19.8731 18.4604Z"
                          fill="#A7A7A7"
                        />
                      </svg>
                    </a>
                    <div class="modal-creat-add-wrap modal-creat-add-wrap2">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        class="global-input modal-creat-add-input-js mr_5 mr_md_10"
                      />
                      <input
                        type="text"
                        placeholder="3"
                        name="from"
                        class="global-input modal-creat-add-input-js mr_5 mr_md_10"
                      />
                      <span class="d-inline-block mr_5 mr_md_10">of</span>
                      <input
                        type="text"
                        placeholder="5"
                        name="to"
                        class="global-input modal-creat-add-input-js mr_5 mr_md_10"
                      />
                      <a
                        href="#"
                        class="modal-creat-add__btn3 btn btn_default disabled"
                      >
                        Apply
                      </a>
                    </div>
                    <div class="modal-creat-add-cont"></div>
                  </div>
                </div>
              </div>
              <div class="modal-creat-text mb_20">
                <div class="modal-creat__title2">Supply</div>
                <div class="global-text">
                  The number of items that can be minted. No gas cost to you!
                </div>
                <input
                  type="text"
                  placeholder="1"
                  class="global-input global-input_large mt_10"
                />
              </div>
              <div class="modal-creat-text mb_20">
                <div class="modal-creat__title2">Blockchain</div>
                <div
                  class="profile-content-drop modal-creat-drop2 market-filtr__drop mt_5"
                >
                  <a href="#" class="profile-content-drop__link">
                    <div class="thumb">
                      <img
                        src="@/assets/img/market-header__wallet_icon2.svg"
                        alt=""
                      />
                    </div>
                    <span> Ethereum </span>
                  </a>
                  <div class="drop-down__col">
                    <ul class="drop-down__list">
                      <li>
                        <a href="#">
                          <div class="thumb">
                            <img
                              src="@/assets/img/market-header__wallet_icon2.svg"
                              alt=""
                            />
                          </div>
                          <span> Ethereum </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div class="thumb">
                            <img
                              src="@/assets/img/market-header__wallet_icon3.svg"
                              alt=""
                            />
                          </div>
                          <span> Binance Smart Chain </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div class="thumb">
                            <img
                              src="@/assets/img/market-header__wallet_icon4.svg"
                              alt=""
                            />
                          </div>
                          <span> Polygon </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div class="thumb">
                            <img
                              src="@/assets/img/market-header__wallet_icon5.svg"
                              alt=""
                            />
                          </div>
                          <span> Tron </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div class="thumb">
                            <img
                              src="@/assets/img/market-header__wallet_icon6.svg"
                              alt=""
                            />
                          </div>
                          <span> Solana </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <a
                  href="#"
                  data-dismiss="modal"
                  role="button"
                  data-toggle="modal"
                  data-target="#modal-creat-result"
                  class="btn btn_modal-creat btn_default disabled btn_large w_164"
                >
                  Create
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="modal-creat-result"
      class="modal fade modal-creat-result"
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
            <div class="modal-creat-result-wrap">
              <div class="modal-creat-result__title">
                You created “Name NFT”
              </div>
              <div class="modal-creat-result__thumb">
                <img
                  src="@/assets/img/modal-creat-result__thumb_img.png"
                  alt=""
                />
              </div>
              <div class="modal-creat-result__text">
                Dolor sit vel adipiscing interdum in mollis venenatis
              </div>
              <div class="modal-creat-result__share">SHARE</div>
              <ul class="modal-creat-result__soc">
                <li>
                  <a href="#">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.7029 4.11415C19.0071 4.42248 18.2596 4.63082 17.4738 4.72498C18.2846 4.23981 18.8912 3.4762 19.1804 2.57665C18.4186 3.02914 17.5849 3.34765 16.7154 3.51832C16.1307 2.89404 15.3563 2.48025 14.5124 2.34121C13.6684 2.20217 12.8022 2.34564 12.0481 2.74936C11.2941 3.15308 10.6944 3.79445 10.3422 4.5739C9.99003 5.35335 9.90503 6.22727 10.1004 7.05998C8.55682 6.98248 7.04677 6.58127 5.66827 5.8824C4.28977 5.18353 3.07362 4.20262 2.09875 3.00332C1.76542 3.57832 1.57375 4.24498 1.57375 4.95498C1.57338 5.59415 1.73078 6.22352 2.03198 6.78726C2.33319 7.351 2.76888 7.83168 3.30042 8.18665C2.68398 8.16703 2.08114 8.00047 1.54208 7.70082V7.75082C1.54202 8.64727 1.85211 9.51613 2.41974 10.21C2.98736 10.9038 3.77756 11.3799 4.65625 11.5575C4.0844 11.7122 3.48486 11.735 2.90292 11.6241C3.15083 12.3955 3.63375 13.07 4.28406 13.5533C4.93437 14.0365 5.71951 14.3043 6.52958 14.3191C5.15444 15.3987 3.45616 15.9842 1.70792 15.9816C1.39823 15.9817 1.08881 15.9636 0.78125 15.9275C2.55581 17.0685 4.62153 17.674 6.73125 17.6716C13.8729 17.6716 17.7771 11.7566 17.7771 6.62665C17.7771 6.45998 17.7729 6.29165 17.7654 6.12498C18.5248 5.57579 19.1803 4.89573 19.7013 4.11665L19.7029 4.11415Z"
                        fill="#7C8FA0"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 0C4.475 0 0 4.58819 0 10.2529C0 14.7899 2.8625 18.6219 6.8375 19.9804C7.3375 20.0701 7.525 19.7625 7.525 19.4934C7.525 19.2499 7.5125 18.4425 7.5125 17.5838C5 18.058 4.35 16.9558 4.15 16.3791C4.0375 16.0843 3.55 15.1743 3.125 14.9308C2.775 14.7386 2.275 14.2644 3.1125 14.2516C3.9 14.2388 4.4625 14.9949 4.65 15.3025C5.55 16.8533 6.9875 16.4175 7.5625 16.1484C7.65 15.4819 7.9125 15.0334 8.2 14.777C5.975 14.5207 3.65 13.6364 3.65 9.71466C3.65 8.59965 4.0375 7.67689 4.675 6.95918C4.575 6.70286 4.225 5.65193 4.775 4.24215C4.775 4.24215 5.6125 3.97301 7.525 5.29308C8.325 5.06239 9.175 4.94704 10.025 4.94704C10.875 4.94704 11.725 5.06239 12.525 5.29308C14.4375 3.9602 15.275 4.24215 15.275 4.24215C15.825 5.65193 15.475 6.70286 15.375 6.95918C16.0125 7.67689 16.4 8.58683 16.4 9.71466C16.4 13.6492 14.0625 14.5207 11.8375 14.777C12.2 15.0975 12.5125 15.7126 12.5125 16.6738C12.5125 18.0452 12.5 19.1474 12.5 19.4934C12.5 19.7625 12.6875 20.0829 13.1875 19.9804C15.1726 19.2932 16.8976 17.9851 18.1197 16.2401C19.3418 14.4951 19.9994 12.4012 20 10.2529C20 4.58819 15.525 0 10 0Z"
                        fill="#7C8FA0"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.524 18.79L7.83471 13.1963L16.3569 4.04528C16.7342 3.63534 16.2792 3.43698 15.7799 3.79403L5.2603 11.7152L0.710704 9.99608C-0.265795 9.66548 -0.276892 8.85881 0.932635 8.27696L18.6539 0.130983C19.4639 -0.305408 20.2407 0.369015 19.93 1.8501L16.9117 18.79C16.7009 19.9934 16.0906 20.2843 15.2472 19.7289L10.6532 15.6824L8.44502 18.2346C8.1898 18.5388 7.97896 18.79 7.524 18.79Z"
                        fill="#7C8FA0"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1324_7564)">
                        <path
                          d="M16.9312 3.24413C15.6562 2.66913 14.2896 2.24413 12.8604 2.00246C12.8477 2.00002 12.8345 2.00159 12.8227 2.00696C12.8109 2.01234 12.8011 2.02125 12.7946 2.03246C12.6196 2.33996 12.4246 2.74079 12.2879 3.05746C10.7721 2.83099 9.23116 2.83099 7.7154 3.05746C7.56318 2.70651 7.39152 2.36431 7.20123 2.03246C7.19478 2.02111 7.18503 2.012 7.17326 2.00634C7.1615 2.00068 7.14829 1.99875 7.1354 2.00079C5.70707 2.24246 4.3404 2.66746 3.06457 3.24329C3.05359 3.2479 3.04429 3.25575 3.0379 3.26579C0.444567 7.07829 -0.266266 11.7966 0.0829005 15.4683C0.0838721 15.4773 0.0866635 15.486 0.0911046 15.4939C0.0955458 15.5017 0.101544 15.5086 0.108734 15.5141C1.62239 16.6161 3.31068 17.4556 5.1029 17.9975C5.11539 18.0013 5.12876 18.0013 5.14124 17.9974C5.15373 17.9936 5.16476 17.986 5.1729 17.9758C5.5579 17.4591 5.90123 16.9133 6.19457 16.34C6.21207 16.3066 6.1954 16.2666 6.1604 16.2533C5.62207 16.0506 5.10047 15.8059 4.6004 15.5216C4.59142 15.5165 4.58384 15.5092 4.57836 15.5004C4.57289 15.4917 4.56967 15.4817 4.56901 15.4713C4.56835 15.461 4.57026 15.4507 4.57458 15.4413C4.57889 15.4319 4.58548 15.4237 4.59373 15.4175C4.69873 15.34 4.80373 15.2591 4.90373 15.1783C4.91273 15.171 4.92358 15.1664 4.93505 15.1649C4.94653 15.1635 4.95819 15.1652 4.96873 15.17C8.24123 16.64 11.7854 16.64 15.0196 15.17C15.0301 15.1649 15.0419 15.1629 15.0536 15.1643C15.0652 15.1656 15.0762 15.1702 15.0854 15.1775C15.1854 15.2591 15.2896 15.34 15.3954 15.4175C15.4037 15.4236 15.4104 15.4316 15.4149 15.441C15.4193 15.4503 15.4214 15.4606 15.4209 15.4709C15.4204 15.4812 15.4174 15.4912 15.412 15.5001C15.4067 15.509 15.3993 15.5163 15.3904 15.5216C14.8921 15.8083 14.3737 16.0508 13.8296 16.2525C13.8212 16.2555 13.8136 16.2603 13.8072 16.2665C13.8009 16.2727 13.7959 16.2802 13.7927 16.2885C13.7894 16.2968 13.788 16.3056 13.7885 16.3145C13.789 16.3234 13.7913 16.3321 13.7954 16.34C14.0954 16.9125 14.4387 17.4575 14.8162 17.975C14.8241 17.9856 14.835 17.9935 14.8475 17.9977C14.8601 18.0019 14.8736 18.0021 14.8862 17.9983C16.6815 17.458 18.3726 16.6181 19.8879 15.5141C19.8953 15.509 19.9015 15.5023 19.9061 15.4945C19.9107 15.4867 19.9136 15.4781 19.9146 15.4691C20.3312 11.2241 19.2162 6.53579 16.9571 3.26746C16.9515 3.25684 16.9424 3.24856 16.9312 3.24413ZM6.68373 12.2325C5.69873 12.2325 4.88623 11.3416 4.88623 10.2491C4.88623 9.15579 5.6829 8.26579 6.68373 8.26579C7.69207 8.26579 8.49707 9.16329 8.48123 10.2491C8.48123 11.3425 7.68457 12.2325 6.68373 12.2325ZM13.3296 12.2325C12.3437 12.2325 11.5321 11.3416 11.5321 10.2491C11.5321 9.15579 12.3279 8.26579 13.3296 8.26579C14.3379 8.26579 15.1429 9.16329 15.1271 10.2491C15.1271 11.3425 14.3387 12.2325 13.3296 12.2325Z"
                          fill="#7C8FA0"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1324_7564">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
              </ul>
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
import ModalTitle from './ModalTitle.vue';
import ModalDescription from './ModalDescription.vue';
import ModalFile from './ModalFile.vue';
import ModalExternalLink from './ModalExternalLink.vue';
import ModalCollection from './ModalCollection.vue';
import ModalComments from './ModalComments.vue';
import ModalCloseIcon from '~/components/icon/nft-form/modal/ModalCloseIcon.vue';

@Component({
  components: {
    ModalCloseIcon,
    ModalTitle,
    ModalDescription,
    ModalFile,
    ModalExternalLink,
    ModalCollection,
    ModalComments,
  },
})
export default class Modal extends Vue {}
</script>
