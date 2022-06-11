import Vue from 'vue';

import {
  normalizeDate,
  humanizeCount,
  truncate,
  shortMonthAndDay,
  ucFirstLetter,
  shortMonthDayYear,
  formatDate,
} from '~/utils/humanize';
import {
  shortAddress,
  formatNumber,
  formatNumberFloatDigits,
} from '~/utils/web3';

Vue.filter('humanizeCount', (value: number) => humanizeCount(value));
Vue.filter('normalizeDate', (timestamp: string) => normalizeDate(timestamp));
Vue.filter('formatDate', (timestamp: string) => formatDate(timestamp));
Vue.filter('shortMonthAndDay', (value: string) => shortMonthAndDay(value));
Vue.filter('shortMonthDayYear', (value: string) => shortMonthDayYear(value));
Vue.filter('formatNumber', (value: number, digits = 8) =>
  formatNumber(value, digits),
);
Vue.filter('formatNumberFloatDigits', (value: number) =>
  formatNumberFloatDigits(value),
);
Vue.filter('ucFirstLetter', (value: string) => ucFirstLetter(value));
Vue.filter(
  'shortAddress',
  (
    address: string | undefined,
    startCount: number | undefined,
    endCount: number | undefined,
    delimiter: string | undefined,
  ) => shortAddress(address, startCount, endCount, delimiter),
);
Vue.filter('truncate', (string: string, length: number) =>
  truncate(string, length),
);
