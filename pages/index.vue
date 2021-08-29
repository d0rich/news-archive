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
    const monthlyFeed: any[] = []
    return {
      monthlyFeed
    }
  },
  async fetch () {
    this.monthlyFeed = await this.getMonthlyFeed({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    })
  },
  methods: {
    ...mapActions({
      getMonthlyFeed: 'news/getMonthlyFeed'
    }),
    getDateNews (moment: Moment) {
      return this.monthlyFeed.find((day: any) => day.date ===
        `${moment.year()}-${to2Letters(moment.month() + 1)}-${to2Letters(moment.date())}`)
        ?.news
    }
  }
})
</script>
