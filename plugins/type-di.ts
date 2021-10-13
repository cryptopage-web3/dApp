import 'reflect-metadata'
import { AxiosInstance } from 'axios'
import Vue from 'vue'
import { VueConstructor } from 'vue/types'
import VueTypeDI, { Container } from 'vue-typedi'
// import Web3 from 'web3'
import Gun from 'gun'
import tokens from '~/logic/tokens'
require('gun/sea')

// const gun = Gun('https://gunjs.herokuapp.com/gun')
// const user = gun.user()

// const PROJECT_ID = process.env.INFURA_PROJECT_ID
/*
const web3: Web3 = new Web3(
  Web3.givenProvider ||
    `https://mainnet.infura.io/v3/${process.env.infuraProjectId}`
)
*/
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
  // Container.set(tokens.WEB3, web3)
}

/* istanbul ignore next */
export default ({ $axios }: { $axios: AxiosInstance }): void => {
  install(Vue, $axios)
}
