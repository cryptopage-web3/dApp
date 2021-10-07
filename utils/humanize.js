export const humanizeCount = (count) => {
  if (count >= 1000 && count <= 1000000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  } else if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  } else if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
  } else {
    return count
  }
}

export const normalizeDate = (timestamp) => {
  const date = new Date(timestamp * 1000)
  let minute = date.getMinutes()
  let hour = date.getHours()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  minute = (minute < 10 ? '0' : '') + minute
  hour = (hour < 10 ? '0' : '') + hour
  day = (day < 10 ? '0' : '') + day
  month = (month < 10 ? '0' : '') + month
  year = (year < 10 ? '0' : '') + year

  return `${hour}:${minute} / ${day}.${month}.${year}`
}

export const humanizeDate = (date) => {
  const MINUTE = 60
  const HOUR = MINUTE * 60
  const DAY = HOUR * 24
  const WEEK = DAY * 7
  const MONTH = WEEK * 4
  const YEAR = DAY * 365

  const secondsAgo = Math.round((new Date() - new Date(date * 1000)) / 1000)

  if (secondsAgo < MINUTE) {
    return secondsAgo + ' s'
  } else if (secondsAgo < HOUR) {
    return Math.floor(secondsAgo / MINUTE) + ' m'
  } else if (secondsAgo < DAY) {
    return Math.floor(secondsAgo / HOUR) + ' h'
  } else if (secondsAgo < WEEK) {
    return Math.floor(secondsAgo / DAY) + ' d'
  } else if (secondsAgo < MONTH) {
    return Math.floor(secondsAgo / WEEK) + ' w'
  } else if (secondsAgo < YEAR) {
    return Math.floor(secondsAgo / MONTH) + ' m'
  } else if (secondsAgo < YEAR * 100) {
    return Math.floor(secondsAgo / YEAR) + ' y'
  } else {
    return date.toLocaleString('default', {
      year: 'numeric',
      month: 'short'
    })
  }
}
