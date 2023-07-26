export const normalizeAmountToServer = (amount: number) => amount * 10 ** 18;

export const normalizeAmountToFront = (amount: number) => amount / 10 ** 18;
