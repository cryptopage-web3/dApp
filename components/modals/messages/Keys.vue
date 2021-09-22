<template>
  <div id="__modal">
    <div class="modal-close d-flex align-center">
      <div
        class="modal-close__btn d-flex align-center justify-center"
        @click="$modal.hide('messageKeys')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path
              d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
            ></path>
          </g>
        </svg>
      </div>
      <div class="profile-other-name__top" style="margin-left: 20px">
        <span>Information</span>
      </div>
    </div>
    <div class="modal-c">
      <div class="page-txt-info">
        <h1>Public key</h1>
        <p>
          Your public key:
          <span style="opacity: 0.8">{{
            sender ? sender.epub.slice(0, 16) : null
          }}</span>
        </p>
      </div>
      <div class="page-txt-info">
        <h1>Private key</h1>
        <p>
          Your private key:
          <span style="opacity: 0.8">{{
            sender ? sender.epriv.slice(0, 16) : null
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sender: null,
      receiver: null
    }
  },
  async mounted() {
    await this.$nextTick(async () => {
      this.sender = await this.$pair()
      this.receiver = await this.$pair()
    })
  }
}
</script>

<style lang="scss" scoped>
.page-txt-info {
  padding-left: 23px !important;
  padding-right: 32px !important;
  padding-top: 23px !important;
  padding-bottom: 23px !important;
  border-bottom: solid 1px rgba(#cfd9de, 0.3);
  &:nth-last-child(1) {
    border-bottom: 0;
  }
  p {
    margin: 0;
  }
}
</style>
=
