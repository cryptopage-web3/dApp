import { nftContractAddress } from '~/contracts';
import { EChainId, INftDashboardItemResponse, INftTransaction } from '~/types';

export function nftDashboardResAdapter(
  data: INftDashboardItemResponse,
): INftTransaction {
  return {
    txHash: '',
    blockNumber: 0,
    contractAddress: nftContractAddress[EChainId.polygon],
    tokenId: data.tokenId,
    to: '',
    from: '',
  };
}
