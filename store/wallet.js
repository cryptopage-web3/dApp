import Vue from 'vue'
import api from '~/services/api'
const SET = 'SET'

export const state = () => ({
  balance: 0,
  price: 0,
  transactionsCount: 0,
  tokens: []
})

export const getters = {
  balance: (state) => state.balance,
  price: (state) => state.price,
  transactionsCount: (state) => state.transactionsCount,
  tokens: (state) => state.tokens
}

export const mutations = {
  [SET](state, payload) {
    state.balance = payload.ETH.balanc
    state.price = payload.ETH.price.rate
    state.transactionsCount = payload.countTxs
    state.tokens = []
    if (!payload.tokens) payload.tokens = []
    payload.tokens.forEach((token) => {
      if (token.tokenInfo.image) {
        token.tokenInfo.image = `https://ethplorer.io${token.tokenInfo.image}`
      } else {
        token.tokenInfo.image =
          'https://ps.w.org/kama-thumbnail/assets/icon-128x128.png'
      }
      token.normalBalance =
        Number(token.rawBalance) / 10 ** Number(token.tokenInfo.decimals)
      if (!token.tokenInfo.price) {
        token.tokenInfo.price = {
          rate: 0
        }
      }
      token.USDBalance =
        Number(token.normalBalance) * token.tokenInfo.price.rate
      Vue.set(state.tokens, state.tokens.length, token)
    })
  }
}

export const actions = {
  async get({ rootState, commit }) {
    const address = rootState.auth.selectedAddress
    if (address) {
      const response = await api.getAddressInfo({ address })
      commit(SET, response)
    }
  }
}
