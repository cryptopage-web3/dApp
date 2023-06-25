import { ENftFormUnlockableContentAccessDurationType } from '~/types/nft-form';

export const durationTypeList = [
  {
    slug: ENftFormUnlockableContentAccessDurationType.days,
    label: 'Days',
    count: 1,
  },
  {
    slug: ENftFormUnlockableContentAccessDurationType.weeks,
    label: 'Weeks',
    count: 7,
  },
  {
    slug: ENftFormUnlockableContentAccessDurationType.months,
    label: 'Months',
    count: 30,
  },
];

/** продолжительность в секундах */
export const getSecDuration = (
  duration: number | null,
  type: ENftFormUnlockableContentAccessDurationType | null,
) => {
  if (!duration) {
    return 0;
  }

  const find = durationTypeList.find((item) => item.slug === type);
  const count = find?.count || 1;

  return duration * count * 24 * 60 * 60;
};

/** продолжительность в днях */
export const getDaysDuration = (
  duration: number | null,
  type: ENftFormUnlockableContentAccessDurationType | null,
) => {
  if (!duration) {
    return 0;
  }

  const find = durationTypeList.find((item) => item.slug === type);
  const count = find?.count || 1;

  return duration * count;
};
