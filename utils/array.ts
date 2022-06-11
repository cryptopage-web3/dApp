import { ITransaction } from '~/types';

export const getUniqueKey = (transaction: ITransaction) =>
  `${transaction.hash}_${transaction.from}_${transaction.to}_${transaction.value}`;

export const uniqueHashConcat = (
  target: ITransaction[],
  additional: ITransaction[],
): ITransaction[] => {
  const result = [...target];

  additional.forEach((item) => {
    const same = result.find((tx) => getUniqueKey(tx) === getUniqueKey(item));

    if (!same) {
      result.push(item);
    }
  });

  return result;
};
