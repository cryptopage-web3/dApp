import { EChainId } from '~/types';

/**
 * mumbai - https://mumbai.polygonscan.com/
 *
 * общий контракт - 0x7E754F7D127eea39a3F7078ad4a8e9c61D6cD534
 * контракт executor - 0x43876793bd3a12f84773542033b2ebc29f7f02c5
 * контракт pluginList - 0x4442936327dac90961bdfef55514f04252a010c6
 * список плагинов - https://mumbai.polygonscan.com/address/0x4442936327dac90961bdfef55514f04252a010c6#readContract
 * тесты - https://github.com/cryptopage-web3/smart_contracts/tree/master/test
 */

/** executor */
export const nftContractAddress: Record<number | string, string> = {
  [EChainId.mumbai]: '0xc0fc66ba41bea0a1266c681bbc781014e7c67612',
};

/** плагины */
export const contractPlugins = {
  communityJoin:
    '0xabb73a7cacd6d5a3b8b8b9a80071487e18ca4f45686143e16706fd3a9df138e8',
  writePost:
    '0x837b8271e750549d244e6741875c390f9941a5da61478e8846e8bf006133e4cb',
  burnPost:
    '0xb2cde8c07a13cb40b214c39ca8c80ae844ff5ce80b0d241b17fbc9c38f5aa9f9',
  editModerators:
    '0x735720fb886331ee35c4c410405c3733d54a974426a5f7e3aa5e58c777c29215',
  writeComment:
    '0xe32670d3f899fd73be01c80d75c5a93935c33f6f4df302f97f876b03d4e705f9',
  readPost:
    '0x58d1867e9921459336ab353b1045e91c2c345f6e4e42a04a53850ea42e6ce2f1',
  singleWritePost:
    '0xbbff7889cff09dddaf3690b2cfd43476346b29cb488f1f19426947d13094674c',
  singleReadPost:
    '0x9e5224d23f22a6d0daa46d942305d0c94d3739ee0bd58cb2725e2f7f71c2ff73',
  singleBurnPost:
    '0x061c3d03a0e9b92ebecd62c59defb345a1a01269fd2eb0f29e06268290cd9d8b',
  singleWriteComment:
    '0x998072615265679bf1f5709eafe357ca6093b8d24e66cc3c05f76f90504927f6',
  singleReadAllComment:
    '0x4109142687fb920f2169e9f03a6c4544f567cb8d156347cdfbdb34b589e10879',
  singleHasPaymentForAccess:
    '0xf33878605c834f168b1a32454453e38430ee1b250af16141a12cbb3c6bfa4845',
  faucetTestMint:
    '0xbaea0fffd27eb7471ad5d7d8cdff64cb1a7334c2ebdc728432c91a5159480073',
  subscriptionBuyForSinglePost:
    '0xb5f209e6571e660710906b7b924ba0716e0af7b6999bcac36489c6b839b5a376',
};

/** адрес сообщества по умолчанию */
export const defaultCommunityAddress =
  '0xd22aa224814A189d0A4a972678885de91015D4F2';
