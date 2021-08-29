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
    try {
      const response = await this.$axios.$get('/editions/all')
      commit('setEditions', response.editions)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}
