import axios from 'axios'

export const state = () => ({
  editions: []
})

export const mutations = {
  setEditions (state, editions) {
    state.editions = editions
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    const response = await axios.get('/api/editions/all')
    commit('setEditions', response.data.editions)
  }
}
