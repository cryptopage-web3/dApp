import Vue from 'vue'

import {
  normalizeDate,
  humanizeCount,
  truncate,
  shortMonthAndDay,
  ucFirstLetter
} from '~/utils/humanize'
import { shortAddress, normalizeAmount, roundAmount } from '~/utils/web3'

Vue.filter('humanizeCount', (value: number) => humanizeCount(value))
Vue.filter('normalizeDate', (timestamp: string) => normalizeDate(timestamp))
Vue.filter('normalizeAmount', (value: number) => normalizeAmount(value))
Vue.filter('shortMonthAndDay', (value: string) => shortMonthAndDay(value))
Vue.filter('roundAmount', (value: number | string, digits = 7) =>
  roundAmount(value, digits)
)
Vue.filter('ucFirstLetter', (value: string) => ucFirstLetter(value))
Vue.filter(
  'shortAddress',
  (
    address: string | undefined,
    startCount: number | undefined,
    endCount: number | undefined,
    delimiter: string | undefined
  ) => shortAddress(address, startCount, endCount, delimiter)
)
Vue.filter('truncate', (string: string, length: number) =>
  truncate(string, length)
)
