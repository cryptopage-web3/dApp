<template>
  <section class="profile-login height-full">
    <div class="container">
      <div class="profile-login-zag">
        <h1 class="profile-login-zag__title">Connect your wallet</h1>
        <div class="profile-login-zag__text">
          Connect with one of our available wallet providers or create a new
          one.
        </div>
      </div>
      <div id="accordionExample" class="accordion profile-login-accordion">
        <div class="card profile-login__card">
          <div id="profile-login-accordion1_2" class="card-header">
            <button
              class="profile-login-accordion__link"
              type="button"
              data-toggle="collapse"
              data-target="#profile-login-accordion1"
              aria-expanded="true"
              aria-controls="profile-login-accordion1"
            >
              <div class="thumb">
                <img
                  src="@/assets/img/profile-login-accordion_img1.svg"
                  alt=""
                />
              </div>
              <span> Ethereum </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9753 12.7293L8.43529 9.18928C8.24793 9.00303 7.99448 8.89849 7.73029 8.89849C7.4661 8.89849 7.21265 9.00303 7.02529 9.18928C6.93156 9.28225 6.85717 9.39285 6.8064 9.51471C6.75563 9.63656 6.72949 9.76727 6.72949 9.89928C6.72949 10.0313 6.75563 10.162 6.8064 10.2839C6.85717 10.4057 6.93156 10.5163 7.02529 10.6093L11.2653 14.8493C11.3583 14.943 11.4689 15.0174 11.5907 15.0682C11.7126 15.1189 11.8433 15.1451 11.9753 15.1451C12.1073 15.1451 12.238 15.1189 12.3599 15.0682C12.4817 15.0174 12.5923 14.943 12.6853 14.8493L16.9753 10.6093C17.068 10.5158 17.1413 10.405 17.1911 10.2832C17.2408 10.1614 17.2661 10.0309 17.2653 9.89928C17.2661 9.76768 17.2408 9.63721 17.1911 9.51538C17.1413 9.39354 17.068 9.28272 16.9753 9.18928C16.7879 9.00303 16.5345 8.89849 16.2703 8.89849C16.0061 8.89849 15.7527 9.00303 15.5653 9.18928L11.9753 12.7293Z"
                  fill="#687684"
                />
              </svg>
            </button>
          </div>

          <div
            id="profile-login-accordion1"
            class="collapse show"
            aria-labelledby="profile-login-accordion1_2"
            data-parent="#accordionExample"
          >
            <div class="profile-login-accordion__body">
              <ul class="profile-login__list">
                <li>
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#profile-login-modal"
                    role="button"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/profile-login__list_img1.png"
                        alt=""
                      />
                    </div>
                    <span> Metamask </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#profile-login-modal"
                    role="button"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/profile-login__list_img2.png"
                        alt=""
                      />
                    </div>
                    <span> WalletConnect </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card profile-login__card">
          <div id="profile-login-accordion2_2" class="card-header">
            <button
              class="profile-login-accordion__link"
              type="button"
              data-toggle="collapse"
              data-target="#profile-login-accordion2"
              aria-expanded="false"
              aria-controls="profile-login-accordion2"
            >
              <div class="thumb">
                <img
                  src="@/assets/img/profile-login-accordion_img2.svg"
                  alt=""
                />
              </div>
              <span> Binance Smart Chain </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9753 12.7293L8.43529 9.18928C8.24793 9.00303 7.99448 8.89849 7.73029 8.89849C7.4661 8.89849 7.21265 9.00303 7.02529 9.18928C6.93156 9.28225 6.85717 9.39285 6.8064 9.51471C6.75563 9.63656 6.72949 9.76727 6.72949 9.89928C6.72949 10.0313 6.75563 10.162 6.8064 10.2839C6.85717 10.4057 6.93156 10.5163 7.02529 10.6093L11.2653 14.8493C11.3583 14.943 11.4689 15.0174 11.5907 15.0682C11.7126 15.1189 11.8433 15.1451 11.9753 15.1451C12.1073 15.1451 12.238 15.1189 12.3599 15.0682C12.4817 15.0174 12.5923 14.943 12.6853 14.8493L16.9753 10.6093C17.068 10.5158 17.1413 10.405 17.1911 10.2832C17.2408 10.1614 17.2661 10.0309 17.2653 9.89928C17.2661 9.76768 17.2408 9.63721 17.1911 9.51538C17.1413 9.39354 17.068 9.28272 16.9753 9.18928C16.7879 9.00303 16.5345 8.89849 16.2703 8.89849C16.0061 8.89849 15.7527 9.00303 15.5653 9.18928L11.9753 12.7293Z"
                  fill="#687684"
                />
              </svg>
            </button>
          </div>

          <div
            id="profile-login-accordion2"
            class="collapse"
            aria-labelledby="profile-login-accordion2_2"
            data-parent="#accordionExample"
          >
            <div class="profile-login-accordion__body">
              <ul class="profile-login__list">
                <li>
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#profile-login-modal"
                    role="button"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/profile-login__list_img1.png"
                        alt=""
                      />
                    </div>
                    <span> Metamask </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#profile-login-modal"
                    role="button"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/profile-login__list_img2.png"
                        alt=""
                      />
                    </div>
                    <span> WalletConnect </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card profile-login__card">
          <div id="profile-login-accordion3_2" class="card-header">
            <button
              class="profile-login-accordion__link"
              type="button"
              data-toggle="collapse"
              data-target="#profile-login-accordion3"
              aria-expanded="false"
              aria-controls="profile-login-accordion3"
            >
              <div class="thumb">
                <img
                  src="@/assets/img/profile-login-accordion_img3.svg"
                  alt=""
                />
              </div>
              <span> Polygon </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9753 12.7293L8.43529 9.18928C8.24793 9.00303 7.99448 8.89849 7.73029 8.89849C7.4661 8.89849 7.21265 9.00303 7.02529 9.18928C6.93156 9.28225 6.85717 9.39285 6.8064 9.51471C6.75563 9.63656 6.72949 9.76727 6.72949 9.89928C6.72949 10.0313 6.75563 10.162 6.8064 10.2839C6.85717 10.4057 6.93156 10.5163 7.02529 10.6093L11.2653 14.8493C11.3583 14.943 11.4689 15.0174 11.5907 15.0682C11.7126 15.1189 11.8433 15.1451 11.9753 15.1451C12.1073 15.1451 12.238 15.1189 12.3599 15.0682C12.4817 15.0174 12.5923 14.943 12.6853 14.8493L16.9753 10.6093C17.068 10.5158 17.1413 10.405 17.1911 10.2832C17.2408 10.1614 17.2661 10.0309 17.2653 9.89928C17.2661 9.76768 17.2408 9.63721 17.1911 9.51538C17.1413 9.39354 17.068 9.28272 16.9753 9.18928C16.7879 9.00303 16.5345 8.89849 16.2703 8.89849C16.0061 8.89849 15.7527 9.00303 15.5653 9.18928L11.9753 12.7293Z"
                  fill="#687684"
                />
              </svg>
            </button>
          </div>

          <div
            id="profile-login-accordion3"
            class="collapse"
            aria-labelledby="profile-login-accordion3_2"
            data-parent="#accordionExample"
          >
            <div class="profile-login-accordion__body">
              <ul class="profile-login__list">
                <li>
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#profile-login-modal"
                    role="button"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/profile-login__list_img1.png"
                        alt=""
                      />
                    </div>
                    <span> Metamask </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#profile-login-modal"
                    role="button"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/profile-login__list_img2.png"
                        alt=""
                      />
                    </div>
                    <span> WalletConnect </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card profile-login__card">
          <div id="profile-login-accordion4_2" class="card-header">
            <button
              class="profile-login-accordion__link"
              type="button"
              data-toggle="collapse"
              data-target="#profile-login-accordion4"
              aria-expanded="false"
              aria-controls="profile-login-accordion4"
            >
              <div class="thumb">
                <img
                  src="@/assets/img/profile-login-accordion_img4.svg"
                  alt=""
                />
              </div>
              <span> Tron </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9753 12.7293L8.43529 9.18928C8.24793 9.00303 7.99448 8.89849 7.73029 8.89849C7.4661 8.89849 7.21265 9.00303 7.02529 9.18928C6.93156 9.28225 6.85717 9.39285 6.8064 9.51471C6.75563 9.63656 6.72949 9.76727 6.72949 9.89928C6.72949 10.0313 6.75563 10.162 6.8064 10.2839C6.85717 10.4057 6.93156 10.5163 7.02529 10.6093L11.2653 14.8493C11.3583 14.943 11.4689 15.0174 11.5907 15.0682C11.7126 15.1189 11.8433 15.1451 11.9753 15.1451C12.1073 15.1451 12.238 15.1189 12.3599 15.0682C12.4817 15.0174 12.5923 14.943 12.6853 14.8493L16.9753 10.6093C17.068 10.5158 17.1413 10.405 17.1911 10.2832C17.2408 10.1614 17.2661 10.0309 17.2653 9.89928C17.2661 9.76768 17.2408 9.63721 17.1911 9.51538C17.1413 9.39354 17.068 9.28272 16.9753 9.18928C16.7879 9.00303 16.5345 8.89849 16.2703 8.89849C16.0061 8.89849 15.7527 9.00303 15.5653 9.18928L11.9753 12.7293Z"
                  fill="#687684"
                />
              </svg>
            </button>
          </div>

          <div
            id="profile-login-accordion4"
            class="collapse"
            aria-labelledby="profile-login-accordion4_2"
            data-parent="#accordionExample"
          >
            <div class="profile-login-accordion__body">
              <ul class="profile-login__list">
                <li>
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#profile-login-modal"
                    role="button"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/profile-login__list_img1.png"
                        alt=""
                      />
                    </div>
                    <span> Metamask </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#profile-login-modal"
                    role="button"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/profile-login__list_img2.png"
                        alt=""
                      />
                    </div>
                    <span> WalletConnect </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card profile-login__card">
          <div id="profile-login-accordion5_2" class="card-header">
            <button
              class="profile-login-accordion__link"
              type="button"
              data-toggle="collapse"
              data-target="#profile-login-accordion5"
              aria-expanded="false"
              aria-controls="profile-login-accordion5"
            >
              <div class="thumb">
                <img
                  src="@/assets/img/profile-login-accordion_img5.svg"
                  alt=""
                />
              </div>
              <span> Solana </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9753 12.7293L8.43529 9.18928C8.24793 9.00303 7.99448 8.89849 7.73029 8.89849C7.4661 8.89849 7.21265 9.00303 7.02529 9.18928C6.93156 9.28225 6.85717 9.39285 6.8064 9.51471C6.75563 9.63656 6.72949 9.76727 6.72949 9.89928C6.72949 10.0313 6.75563 10.162 6.8064 10.2839C6.85717 10.4057 6.93156 10.5163 7.02529 10.6093L11.2653 14.8493C11.3583 14.943 11.4689 15.0174 11.5907 15.0682C11.7126 15.1189 11.8433 15.1451 11.9753 15.1451C12.1073 15.1451 12.238 15.1189 12.3599 15.0682C12.4817 15.0174 12.5923 14.943 12.6853 14.8493L16.9753 10.6093C17.068 10.5158 17.1413 10.405 17.1911 10.2832C17.2408 10.1614 17.2661 10.0309 17.2653 9.89928C17.2661 9.76768 17.2408 9.63721 17.1911 9.51538C17.1413 9.39354 17.068 9.28272 16.9753 9.18928C16.7879 9.00303 16.5345 8.89849 16.2703 8.89849C16.0061 8.89849 15.7527 9.00303 15.5653 9.18928L11.9753 12.7293Z"
                  fill="#687684"
                />
              </svg>
            </button>
          </div>

          <div
            id="profile-login-accordion5"
            class="collapse"
            aria-labelledby="profile-login-accordion5_2"
            data-parent="#accordionExample"
          >
            <div class="profile-login-accordion__body">
              <ul class="profile-login__list">
                <li>
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#profile-login-modal"
                    role="button"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/profile-login__list_img1.png"
                        alt=""
                      />
                    </div>
                    <span> Metamask </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#profile-login-modal"
                    role="button"
                  >
                    <div class="thumb">
                      <img
                        src="@/assets/img/profile-login__list_img2.png"
                        alt=""
                      />
                    </div>
                    <span> WalletConnect </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <a
          href="#"
          class="btn-blue-transparent_button profile-login__more btn_large"
        >
          Show more options
        </a>
      </div>
    </div>

    <!-- Modal -->
    <div
      id="profile-login-modal"
      class="modal fade profile-login-modal"
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
            <h3 class="profile-login-modal__title">Are your sure?</h3>
            <div class="profile-login-modal__text">
              Connect with one of our available wallet providers or create a new
              one.
            </div>
            <div class="profile-login-modal__btns">
              <a
                href="#"
                class="btn-blue-transparent btn_large btn-blue-transparent_button"
              >
                No
              </a>
              <a href="#" class="btn-blue btn_large btn-blue_button"> Yes </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({
  head: {
    title: 'Connect your wallet | Crypto.Page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Connect with one of our available wallet providers or create a new one.',
      },
    ],
  },
})
export default class ConnectPage extends Vue {}
</script>
