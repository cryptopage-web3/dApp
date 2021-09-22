import Vue from 'vue'

import { humanizeDate, humanizeCount } from '~/utils/humanize'
import { shortAddress, toDecimals } from '~/utils/web3'

Vue.filter('humanizeDate', (value) => humanizeDate(value))
Vue.filter('humanizeCount', (value) => humanizeCount(value))
Vue.filter('shortAddress', (address, startCount, endCount, delimiter) =>
  shortAddress(address, startCount, endCount, delimiter)
)
Vue.filter('toDecimals', (value, decimal) => toDecimals(value, decimal))
