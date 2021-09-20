const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS'
const POP_SELECTED_ADDRESS = 'POP_SELECTED_ADDRESS'
const SET_SIGNATURE = 'SET_SIGNATURE'
const POP_SIGNATURE = 'POP_SIGNATURE'
const SET_SELECTED_CHAIN_ID = 'SET_SELECTED_CHAIN_ID'
const POP_SELECTED_CHAIN_ID = 'POP_SELECTED_CHAIN_ID'

export const state = () => ({
  selectedAddress: '',
  signature: '',
  chainId: ''
})

export const getters = {
  selectedAddress: (state) => state.selectedAddress,
  signature: (state) => state.signature,
  chainId: (state) => state.chainId
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
  setSignature({ commit }, payload) {
    commit(SET_SIGNATURE, payload)
  },
  popSignature({ commit }) {
    commit(POP_SIGNATURE)
  },
  setSelectedChainId({ commit }, payload) {
    commit(SET_SELECTED_CHAIN_ID, payload)
  },
  popSelecteChainId({ commit }) {
    commit(POP_SELECTED_CHAIN_ID)
  }
}
