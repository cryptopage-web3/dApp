const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS'
const POP_SELECTED_ADDRESS = 'POP_SELECTED_ADDRESS'
const SET_IS_AUTH = 'SET_IS_AUTH'
const SET_SELECTED_CHAIN_ID = 'SET_SELECTED_CHAIN_ID'
const POP_SELECTED_CHAIN_ID = 'POP_SELECTED_CHAIN_ID'

export const state = () => ({
  selectedAddress: '',
  chainId: '',
  isAuth: false
})

export const getters = {
  selectedAddress: (state) => state.selectedAddress,
  isAuth: (state) => state.isAuth,
  chainId: (state) => state.chainId
}

export const mutations = {
  [SET_SELECTED_ADDRESS](state, payload) {
    state.selectedAddress = payload
  },
  [POP_SELECTED_ADDRESS](state) {
    state.selectedAddress = ''
  },
  [SET_IS_AUTH](state, payload) {
    state.isAuth = payload
  },
  [SET_SELECTED_CHAIN_ID](state, payload) {
    state.chainId = payload
  },
  [POP_SELECTED_CHAIN_ID](state) {
    state.chainId = ''
  }
}

export const actions = {
  setSelectedAddress({ commit }, payload) {
    commit(SET_SELECTED_ADDRESS, payload)
  },
  popSelectedAddress({ commit }) {
    commit(POP_SELECTED_ADDRESS)
  },
  signout({ commit }) {
    commit(POP_SELECTED_ADDRESS)
    commit(POP_SELECTED_CHAIN_ID)
    commit(SET_IS_AUTH, false)
  },
  signin({ commit }, { address, redirectURL }) {
    commit(SET_SELECTED_ADDRESS, address)
    commit(SET_IS_AUTH, true)
    if (redirectURL) {
      this.$router.push(redirectURL)
    }
  },
  setSelectedChainId({ commit }, payload) {
    commit(SET_SELECTED_CHAIN_ID, payload)
  },
  popSelecteChainId({ commit }) {
    commit(POP_SELECTED_CHAIN_ID)
  }
}
