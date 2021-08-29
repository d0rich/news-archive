export const actions = {
  async getMonthlyFeed (_state, { year, month }) {
    const response = await this.$axios.$get(`/news/year/${year}/month/${month}`)
    return response.news
  }
}
