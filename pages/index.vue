<template>
  <div>
    <a-calendar>
      <div slot="dateCellRender" slot-scope="value">
        <a-popover :title="value.calendar()">
          <template slot="content">
            <div v-for="item in getDateNews(value)" :key="item.title">
              <b>{{ $store.state.editions.find(e => e.id === item.editionId).name }}</b>: {{ item.title }}
              <hr>
            </div>
          </template>
          <div v-if="getDateNews(value)">
            <div v-if="getDateNews(value)[0]">
              {{ getDateNews(value)[0].title }}
            </div>
          </div>
        </a-popover>
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
