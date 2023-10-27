import { MUMBAI_CONTRACT_ADDRESS } from '~/contracts';
import { INftDashboardItemResponse, INftTransaction } from '~/types';

export function nftDashboardResAdapter(
  data: INftDashboardItemResponse,
): INftTransaction {
  return {
    txHash: '',
    blockNumber: 0,
    contractAddress: MUMBAI_CONTRACT_ADDRESS,
    tokenId: data.tokenId,
    to: '',
    from: '',
  };
}
