<template>
  <div>
    <a-calendar>
      <div slot="dateCellRender" slot-scope="value">
        <div v-for="item in getDateNews(value)" :key="item.title">
          {{ item.title }}
          <hr>
        </div>
      </div>
    </a-calendar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
// eslint-disable-next-line import/named
import { Moment } from 'moment'
import { to2Letters } from '~/server/parsers/support/functions'

export default Vue.extend({
  name: 'HomePage',
  data () {
    return {
      monthlyFeed: []
    }
  },
  methods: {
    ...mapActions({
      getMonthlyFeed: 'news/getMonthlyFeed'
    }),
    getDateNews (moment: Moment) {
      return this.monthlyFeed.find(day => day.date ===
        `${moment.year()}-${to2Letters(moment.month() + 1)}-${to2Letters(moment.date())}`)
        ?.news
    }
  },
  // eslint-disable-next-line vue/order-in-components
  async fetch (): Promise<void> | void {
    this.monthlyFeed = await this.getMonthlyFeed({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    })
  }
})
</script>
