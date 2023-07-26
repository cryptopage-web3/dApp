import { BigNumber } from 'ethers';

export const normalizeAmountToServer = (amount: number) =>
  BigNumber.from(String(amount * 10 ** 18));

export const normalizeAmountToFront = (amount: number) => amount / 10 ** 18;
