import { Inject, Injectable } from 'vue-typedi'
import { Action, Mutation, State, Getter } from 'vuex-simple'

import NFTService from '~/logic/nft/services'
import { NFTType, FetchOneType, FetchManyType } from '~/logic/nft/types'
import tokens from '~/logic/tokens'

@Injectable()
/**
 * Represents a typed Vuex module.
 *
 * @see https://vuex.vuejs.org/guide/modules.html
 * @see https://github.com/sascha245/vuex-simple
 */
export default class NFTModule {
  // Dependencies

  @Inject(tokens.NFT_SERVICE)
  public service!: NFTService

  // State

  @State()
  public nfts: NFTType[] = []

  // Getters

  @Getter()
  public get hasNFTs(): boolean {
    return Boolean(this.nfts && this.nfts.length > 0)
  }

  // Mutations

  @Mutation()
  public setNFT(nft: NFTType): void {
    this.nfts = [nft, ...this.nfts]
  }

  // Actions

  @Action()
  public async fetchOne({
    tokenId,
    contractAddress
  }: FetchOneType): Promise<NFTType> {
    const nft: NFTType = await this.service.fetchOne({
      tokenId,
      contractAddress
    })
    this.setNFT(nft)
    return nft
  }

  @Action()
  public async fetchMany({
    address,
    page,
    pageSize
  }: FetchManyType): Promise<NFTType[]> {
    const nfts: NFTType[] = await this.service.fetchMany({
      address,
      page,
      pageSize
    })
    nfts.forEach((nft: NFTType) => {
      this.setNFT(nft)
    })
    return nfts
  }
}
