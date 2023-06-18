import { INftTransaction, INftTransactionServer } from '~/types';

export function nftTransactionResAdapter(
  data: INftTransactionServer,
): INftTransaction {
  return {
    txHash: data.txHash,
    blockNumber: data.blockNumber,
    contract_address: data.contract_address,
    tokenId: data.tokenId,
    to: data.to,
    from: data.from,
  };
}
