import { INft, INftTransaction, ITransaction } from '~/types';

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

export const getNftUniqueKey = (nft: INft) =>
  `${nft.contract_address}_${nft.date}_${nft.to}_${nft.tokenId}`;

export const uniqueNftConcat = (target: INft[], additional: INft[]): INft[] => {
  const result = [...target];

  additional.forEach((item) => {
    const same = result.find(
      (tx) => getNftUniqueKey(tx) === getNftUniqueKey(item),
    );

    if (!same) {
      result.push(item);
    }
  });

  return result;
};

export const getNftTransactionUniqueKey = (nft: INftTransaction) =>
  `${nft.contract_address}_${nft.date}_${nft.to}_${nft.tokenId}_${nft.txHash}`;

export const uniqueNftTransactionConcat = (
  target: INftTransaction[],
  additional: INftTransaction[],
): INftTransaction[] => {
  const result = [...target];

  additional.forEach((item) => {
    const same = result.find(
      (tx) =>
        getNftTransactionUniqueKey(tx) === getNftTransactionUniqueKey(item),
    );

    if (!same) {
      result.push(item);
    }
  });

  return result;
};
