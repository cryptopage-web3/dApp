<template>
  <div />
</template>
<script>
export default {
  methods: {
    async init() {
      const response = await this.$store.dispatch('auth/signin')
      if (response.status === 'success') {
        this.$notify({
          type: 'success',
          title: 'Successfully logged in'
        })
      } else if (response.message === 'MetaMask not installed') {
        this.$notify({
          type: 'info',
          title:
            'Please install MetaMask extension for sign in<br>reload page and try again',
          text: `<div class="notification-content__mt">
              <a href="https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank">
                Install MetaMask for Chrome
              </a>
            </div>`
        })
      } else if (response.message === 'Not authorized in MetaMask') {
        this.$notify({
          type: 'info',
          title:
            'Please log in to the MetaMask Ext.<br>reload page and try again'
        })
      } else {
        this.$notify({
          type: 'error',
          title: 'Something went wrong',
          text: `<div class="notification-content__mt">
            Please reload page and try again
          </div>`
        })
      }
    }
  }
}
</script>
