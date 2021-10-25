import 'reflect-metadata'
import { AxiosInstance } from 'axios'
import Vue from 'vue'
import { VueConstructor } from 'vue/types'
import VueTypeDI, { Container } from 'vue-typedi'
import Gun from 'gun'
import tokens from '~/logic/tokens'
require('gun/sea')

export function install(
  vueConstructor: VueConstructor,
  $axios: AxiosInstance
): void {
  // Installing Vue dependency:
  vueConstructor.use(VueTypeDI)
  // Then we install the passed `axios` instance to the IoC container,
  // so we can resolve it later:
  Container.set(tokens.AXIOS, $axios)
  Container.set(tokens.SEA, Gun.SEA)
}

/* istanbul ignore next */
export default ({ $axios }: { $axios: AxiosInstance }): void => {
  install(Vue, $axios)
}
