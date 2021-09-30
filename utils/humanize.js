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

export const humanizeDate = (date) => {
  const MINUTE = 60
  const HOUR = MINUTE * 60
  const DAY = HOUR * 24
  const WEEK = DAY * 7
  const MONTH = WEEK * 4
  const YEAR = DAY * 365

  const secondsAgo = Math.round((+new Date() - new Date(date)) / 1000)

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
