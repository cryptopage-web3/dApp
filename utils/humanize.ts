import moment from 'moment'

export const humanizeCount = (count: number) => {
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
  }

  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }

  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }

  return count
}

export const truncate = (str: string, length: number) => {
  const dots = String(str).length > length ? '...' : ''
  return String(str).substring(0, length) + dots
}

export const normalizeDate = (timestamp: string) => {
  const date = new Date(Number(timestamp) * 1000)
  const minute = date.getMinutes()
  const hour = date.getHours()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const minuteStr = (minute < 10 ? '0' : '') + minute
  const hourStr = (hour < 10 ? '0' : '') + hour
  const dayStr = (day < 10 ? '0' : '') + day
  const monthStr = (month < 10 ? '0' : '') + month
  const yearStr = (year < 10 ? '0' : '') + year

  return `${hourStr}:${minuteStr} / ${dayStr}.${monthStr}.${yearStr}`
}

export const shortMonthAndDay = (timestamp: string) => {
  return moment(timestamp, 'X').format('MMM D')
}

export const ucFirstLetter = (str: string) => {
  if (!str) {
    return ''
  }

  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}
