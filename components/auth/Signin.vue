<template>
  <div />
</template>
<script>
import { recoverPersonalSignature } from 'eth-sig-util'
import { deviceType } from '~/utils'

export default {
  methods: {
    async init() {
      try {
        const device = deviceType()

        /** проверяем подключение к Metamask для десктопа */

        if (device === 'desktop' && !this.validateMetamaskConnect()) {
          return
        }

        /** проверяем подключение к приложению для мобилки */

        if (
          (device === 'mobile' || device === 'tablet') &&
          !this.validateWalletConnect()
        ) {
          return
        }

        /** проверяем полученный address из провайдера подключения */

        const address = this.$provider.selectedAddress
        const signaturePhrase = await this.getSignaturePhrase(address)
        const sig = await this.$provider.provider.request({
          method: 'personal_sign',
          params: [signaturePhrase, address]
        })
        const recoveredAddress = recoverPersonalSignature({
          data: signaturePhrase,
          sig
        })

        if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
          this.$notify({
            type: 'success',
            title: 'Successfully logged in'
          })

          /** авторизация */

          this.$store.dispatch('auth/signin', address)

          /** информация по адресу: баланс, контракт, токены и т.д. */

          try {
            await this.$store.dispatch('auth/updateAddressInfo')
          } catch {}

          /** редирект на home, если авторизация с главной страницы */

          if (this.$route.path === '/') {
            this.$router.push(`/${address}`)
          }

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
    },

    async getSignaturePhrase(address) {
      const timestamp = new Date().getTime()
      const random = Math.random().toString(16).substr(2, length)
      const message = address + timestamp + random
      const salt = await this.$sea.work(message, null, null, {
        name: 'SHA-256'
      })
      return await this.$sea.work(message, salt, null, {
        name: 'SHA-256'
      })
    },

    validateMetamaskConnect() {
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
        return false
      }

      if (!this.$provider.metamaskConnected) {
        this.$notify({
          type: 'info',
          title:
            'Please log in to the MetaMask Ext.<br>reload page and try again'
        })
        return false
      }

      return true
    },

    validateWalletConnect() {
      if (!this.$provider.walletConnectConnected) {
        this.$notify({
          type: 'info',
          title: 'Please connect to the Wallet<br>reload page and try again'
        })
        return false
      }

      return true
    }
  }
}
</script>
