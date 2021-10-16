export const shortAddress = (
  address,
  startCount = 5,
  endCount = 3,
  delimiter = '...'
) => {
  if (address) {
    address = String(address)
    const start = address.slice(0, startCount)
    const end = address.slice(address.length - endCount, address.length)
    return start + delimiter + end
  }
}

export const normalizeAmount = (exponentialNumber) => {
  const str = exponentialNumber.toString()
  if (str.includes('e')) {
    const exponent = parseInt(str.split('-')[1], 10)
    const result = Number(exponentialNumber).toFixed(exponent)
    return result
  } else {
    return exponentialNumber
  }
}
