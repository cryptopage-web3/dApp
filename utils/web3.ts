export const shortAddress = (
  address: string | undefined,
  startCount: number | undefined = 5,
  endCount: number | undefined = 3,
  delimiter: string | undefined = '...',
) => {
  if (!address) {
    return;
  }

  address = String(address);
  const start = address.slice(0, startCount);
  const end = address.slice(address.length - endCount, address.length);
  return start + delimiter + end;
};

export const formatNumber = (value: number, digits: number) => {
  /** сбрасываем лишние числа без округления */
  let rounded = value;
  const pieces = String(value).split('.');

  if (pieces[1]?.length > digits) {
    const decimal = 10 ** digits;
    rounded = +(Math.floor(value * decimal) / decimal).toFixed(digits);
  }

  return new Intl.NumberFormat('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(rounded);
};

export const formatNumberFloatDigits = (value: number) => {
  /** сбрасываем лишние числа без округления */
  let rounded = value;
  const pieces = String(value).split('.');

  const digitsBig = 2;
  const digitsMiddle = 4;
  const digitsSmall = 8;

  const digits =
    value > 10 ? digitsBig : value > 0.01 ? digitsMiddle : digitsSmall;

  if (pieces[1]?.length > digits) {
    const decimal = 10 ** digits;
    rounded = +(Math.floor(value * decimal) / decimal).toFixed(digits);
  }

  return new Intl.NumberFormat('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(rounded);
};
