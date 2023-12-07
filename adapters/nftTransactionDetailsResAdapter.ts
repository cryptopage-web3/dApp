import {
  EAttachmentType,
  INftTransaction,
  INftTransactionDetailsResponse,
} from '~/types';
import { getCryptedText } from '~/utils/getCryptedText';
import { normalizeAmountToFront } from '~/utils/normalizeAmount';

export const nftTransactionDetailsResAdapter = (
  nft: INftTransaction,
  data: INftTransactionDetailsResponse,
): INftTransaction => {
  const { isEncrypted, attachments } = data;

  const encryptedImage = isEncrypted
    ? attachments?.find(({ type }) => type === EAttachmentType.encryptedImage)
    : null;
  const encryptedText = isEncrypted
    ? attachments?.find(({ type }) => type === EAttachmentType.encryptedText)
    : null;

  return {
    ...nft,
    hasDetails: true,
    date: data.date,
    chain: data.chain,
    name: data.name,
    description: data.description,
    creator: data.creator || '',
    contentUrl:
      encryptedImage &&
      typeof encryptedImage.data !== 'string' &&
      'bluredImageUrl' in encryptedImage.data
        ? encryptedImage.data.bluredImageUrl
        : data.contentUrl,
    encryptedText: encryptedText ? getCryptedText(encryptedText.id) : undefined,
    attributes: data.attributes,
    attachments: data.attachments,
    isEncrypted: data.isEncrypted,
    accessPrice: normalizeAmountToFront(parseFloat(data.payAmount || '0')),
    accessDuration: parseFloat(data.minimalPeriod || '0'),
    comments: data.comments,
  };
};
