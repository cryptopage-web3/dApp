import { IAttribute } from './IAttribute';
import { INftAttachment } from './INftAttachment';
import { INftComment } from './INftComment';

export interface IOwnNftDetailsResponse {
  tokenId: string;
  chain: string;
  contractAddress: string;
  creator?: string;
  name: string;
  description: string;
  contentUrl: string;
  attributes: IAttribute[];
  attachments: INftAttachment[];
  comments?: INftComment[];
  isEncrypted: boolean;
  paymentType: number;
  payAmount: string;
  minimalPeriod?: string;
  date?: string;
}
