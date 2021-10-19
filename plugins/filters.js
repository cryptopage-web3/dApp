import Vue from 'vue'

import {
  normalizeDate,
  humanizeDate,
  humanizeCount,
  truncate
} from '~/utils/humanize'
import { shortAddress, normalizeAmount } from '~/utils/web3'

Vue.filter('humanizeDate', (value) => humanizeDate(value))
Vue.filter('humanizeCount', (value) => humanizeCount(value))
Vue.filter('normalizeDate', (timestamp) => normalizeDate(timestamp))
Vue.filter('normalizeAmount', (value) => normalizeAmount(value))
Vue.filter('shortAddress', (address, startCount, endCount, delimiter) =>
  shortAddress(address, startCount, endCount, delimiter)
)
Vue.filter('truncate', (string, length) => truncate(string, length))
