<template>
  <div />
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import NetworkNameMixin from '~/mixins/networkName'
import { INotifyParams } from '~/types'

@Component({})
export default class Signin extends mixins(NetworkNameMixin) {
  $notify!: (params: INotifyParams) => void

  async init() {
    const response = await this.$store.dispatch('auth/signin')

    this.$notify({
      type: response.status,
      title: response.message.title,
      text: response.message.text
    })

    if (response.status === 'success' && this.$route.path === '/') {
      this.$nuxt.$loading.start()

      /** делаем небольшую задержку, чтобы была возможность прочесть уведомление */
      const address = await this.$store.getters['auth/selectedAddress']
      setTimeout(
        () => this.$router.push(`/${this.networkName}/${address}`),
        1000
      )
    }
  }
}
</script>
