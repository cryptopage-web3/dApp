export const _range = (start:number, stop:number, step:number):number[] => {
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

export const paginate = (array: object[], pageNumber:number = 1, pageSize:number = 10):object[] => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}