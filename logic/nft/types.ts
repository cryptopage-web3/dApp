import { ParsedNFTType } from '~/logic/nft/models'

/**
 * These are inner types, they are only used inside the client.
 *
 * If your exchange some information with a server - make it a model.
 * And place it in `/models.ts` file.
 */

// We add owner only on the client (for demo purposes)
export type NFTType = ParsedNFTType & {
  owner: string
}

export type NFTAdapterType = {
  request: (owner: string) => NFTType
}

export interface FetchOneType {
  tokenId: string
  contractAddress: string
}

export interface FetchManyType {
  address: string
  page: number
  pageSize: number
}
