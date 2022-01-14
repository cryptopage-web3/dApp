<template>
  <div />
</template>
<script lang="ts">
import { Component, Emit, mixins } from 'nuxt-property-decorator'
import NetworkNameMixin from '~/mixins/networkName'
import { INotifyParams } from '~/types'

@Component({})
export default class Signin extends mixins(NetworkNameMixin) {
  $notify!: (params: INotifyParams) => void

  @Emit('success')
  emitSuccess() {
    return true
  }

  @Emit('error')
  emitError() {
    return true
  }

  async init() {
    const response = await this.$store.dispatch('auth/signin')

    if (response.status === 'success') {
      this.emitSuccess()
    } else {
      this.$notify({
        type: response.status,
        title: response.message?.title,
        text: response.message?.text
      })

      this.emitError()
    }
  }
}
</script>
