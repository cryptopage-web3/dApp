export const _range = (start, stop, step) => {
  if (stop == null) {
    stop = start || 0
    start = 0
  }
  if (!step) {
    step = stop < start ? -1 : 1
  }

  const length = Math.max(Math.ceil((stop - start) / step), 0)
  const range = Array(length)

  for (let idx = 0; idx < length; idx++, start += step) {
    range[idx] = start
  }

  return range
}

export const validateTransaction = (tx) => tx && tx.to !== null
export const isFrom = (address, tx) =>
  tx.from && address.toLowerCase() === tx.from.toLowerCase()
export const isTo = (address, tx) =>
  tx.to && address.toLowerCase() === tx.to.toLowerCase()

export const isOwnerTransaction = (address, tx) =>
  isFrom(address, tx) || isTo(address, tx)

export const paginate = (array, pageNumber = 1, pageSize = 10) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}

export const shortAddress = (
  address,
  startCount = 5,
  endCount = 3,
  delimiter = '...'
) => {
  const start = address.slice(0, startCount)
  const end = address.slice(address.length - endCount, address.length)
  return start + delimiter + end
}
