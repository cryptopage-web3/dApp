import Vue from 'vue'
import { createInstaller } from 'vue-pwa-installer'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (context, inject) => {
  const installer = createInstaller(Vue, {
    /* options */
  })
  inject('installer', installer)
}
