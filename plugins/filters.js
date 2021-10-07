import Vue from 'vue'

import { normalizeDate, humanizeDate, humanizeCount } from '~/utils/humanize'
import { shortAddress, toDecimals } from '~/utils/web3'

Vue.filter('normalizeAmount', (value, decimal) => toDecimals(value, decimal))
Vue.filter('normalizeDate', (timestamp) => normalizeDate(timestamp))
Vue.filter('humanizeDate', (value) => humanizeDate(value))
Vue.filter('humanizeCount', (value) => humanizeCount(value))
Vue.filter('shortAddress', (address, startCount, endCount, delimiter) =>
  shortAddress(address, startCount, endCount, delimiter)
)
