import { TNftTransaction } from '../types';

class NftTokenDetailsCache {
  tokens: TNftTransaction[] = [];

  has(chain: string, contractAddress: string, tokenId: string) {
    return !!this.get(chain, contractAddress, tokenId);
  }

  get(chain: string, contractAddress: string, tokenId: string) {
    return this.tokens.find(
      (t) =>
        t.chain === chain &&
        t.contractAddress === contractAddress &&
        tokenId === t.tokenId,
    );
  }

  add(token: TNftTransaction) {
    if (this.has(token.chain as string, token.contractAddress, token.tokenId)) {
      return;
    }

    this.tokens.push(token);

    if (this.tokens.length > 200) {
      this.tokens.shift();
    }
  }
}

export const nftTokenDetailsCache = new NftTokenDetailsCache();
