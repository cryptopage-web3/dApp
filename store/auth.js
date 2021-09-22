const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS'
const POP_SELECTED_ADDRESS = 'POP_SELECTED_ADDRESS'
const SET_SIGNATURE = 'SET_SIGNATURE'
const POP_SIGNATURE = 'POP_SIGNATURE'

export const state = () => ({
  selectedAddress: '',
  signature: ''
})

export const getters = {
  selectedAddress: (state) => state.selectedAddress,
  signature: (state) => state.signature,
  isAuth: (state) => !!state.selectedAddress
}

export const mutations = {
  [SET_SELECTED_ADDRESS](state, payload) {
    state.selectedAddress = payload
  },
  [POP_SELECTED_ADDRESS](state) {
    state.selectedAddress = ''
  },
  [SET_SIGNATURE](state, payload) {
    state.signature = payload
  },
  [POP_SIGNATURE](state) {
    state.signature = ''
  }
}

export const actions = {
  setSelectedAddress({ commit }, payload) {
    commit(SET_SELECTED_ADDRESS, payload)
  },
  popSelectedAddress({ commit }) {
    commit(POP_SELECTED_ADDRESS)
  },
  setSignature({ commit }, payload) {
    commit(SET_SIGNATURE, payload)
  },
  popSignature({ commit }) {
    commit(POP_SIGNATURE)
  },
  signout({ commit }) {
    commit(POP_SELECTED_ADDRESS)
    commit(POP_SIGNATURE)
  },
  signin({ commit }, { address, sig }) {
    commit(SET_SELECTED_ADDRESS, address)
    commit(SET_SIGNATURE, sig)
  }
}
