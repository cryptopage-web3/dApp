import { FOR_SINGLE_POST_DAYS, FOR_SINGLE_POST_ONE_TIME } from '~/constants';
import { ENftFormUnlockableContentAccessType } from '~/types/nft-form';

/** paymentType для контракта */
export const getAccessTypeContract = (
  type: ENftFormUnlockableContentAccessType | null,
) => {
  if (type === ENftFormUnlockableContentAccessType.oneTime) {
    return FOR_SINGLE_POST_ONE_TIME;
  }

  if (type === ENftFormUnlockableContentAccessType.customDuration) {
    return FOR_SINGLE_POST_DAYS;
  }

  return 0;
};
