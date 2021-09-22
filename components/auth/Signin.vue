<template>
  <div />
</template>
<script>
import { recoverPersonalSignature } from 'eth-sig-util'
import { SIGNATURE_PHRASE } from '@/constants'

export default {
  methods: {
    async init() {
      try {
        if (!this.$provider.metamaskInstalled) {
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
          return
        }

        if (!this.$provider.metamaskConnected) {
          this.$notify({
            type: 'info',
            title:
              'Please log in to the MetaMask Ext.<br>reload page and try again'
          })
          return
        }

        const address = this.$provider.selectedAddress
        const sig = await this.$provider.provider.request({
          method: 'personal_sign',
          params: [SIGNATURE_PHRASE, address]
        })
        const recoveredAddress = recoverPersonalSignature({
          data: SIGNATURE_PHRASE,
          sig
        })

        if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
          this.$store.dispatch('auth/signin', { address, sig })

          this.$notify({
            type: 'success',
            title: 'Successfully logged in'
          })

          return
        }

        this.$notify({
          type: 'error',
          title: 'Something went wrong',
          text: `<div class="notification-content__mt">
            Please reload page and try again
          </div>`
        })
      } catch (error) {
        this.$notify({
          type: 'error',
          title: 'Something went wrong',
          text: `<div class="notification-content__mt">
            Please reload page and try again
          </div>`
        })

        console.error('ERROR in authenticate:', error) // eslint-disable-line no-console
      }
    }
  }
}
</script>
