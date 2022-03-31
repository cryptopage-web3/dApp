export const shortAddress = (
  address: string | undefined,
  startCount: number | undefined = 5,
  endCount: number | undefined = 3,
  delimiter: string | undefined = '...'
) => {
  if (!address) {
    return
  }

  address = String(address)
  const start = address.slice(0, startCount)
  const end = address.slice(address.length - endCount, address.length)
  return start + delimiter + end
}

export const normalizeAmount = (exponential: number) => {
  let decimal = exponential.toString().toLowerCase()

  if (decimal.includes('e+')) {
    const exponentialSplitted = decimal.split('e+')
    let postfix = ''

    for (
      let i = 0;
      i <
      +exponentialSplitted[1] -
        (exponentialSplitted[0].includes('.')
          ? exponentialSplitted[0].split('.')[1].length
          : 0);
      i++
    ) {
      postfix += '0'
    }

    const addSeparator = (text: string, separator = ' ') => {
      let j = 3
      let textLength = text.length
      while (j < textLength) {
        text = `${text.slice(0, textLength - j)}${separator}${text.slice(
          textLength - j,
          textLength
        )}`
        textLength++
        j += 3 + 1
      }
      return text
    }

    decimal = addSeparator(exponentialSplitted[0].replace('.', '') + postfix)
  }

  if (decimal.toLowerCase().includes('e-')) {
    const exponentialSplitted = decimal.split('e-')
    let prefix = '0.'
    for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
      prefix += '0'
    }
    decimal = prefix + exponentialSplitted[0].replace('.', '')
  }

  return decimal
}

export const roundAmount = (value: number | string, digits: number) => {
  return +Number(value).toFixed(digits)
}
