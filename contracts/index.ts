import { EChainId } from '~/types';

/**
 * mumbai - https://mumbai.polygonscan.com/
 *
 * все плагины - 0x03D2F15cc5d2AC4F90cBf297f28B426e9CD5a4A7
 * общий контракт - 0x7E754F7D127eea39a3F7078ad4a8e9c61D6cD534
 * контракт executor - 0x43876793bd3a12f84773542033b2ebc29f7f02c5
 * тесты - https://github.com/cryptopage-web3/smart_contracts/tree/master/test
 */

/** executor */
export const nftContractAddress: Record<number | string, string> = {
  [EChainId.mumbai]: '0x43876793BD3a12F84773542033B2eBc29F7f02c5',
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
};

/** адрес сообщества по умолчанию */
export const defaultCommunityAddress =
  '0xd22aa224814A189d0A4a972678885de91015D4F2';

/** нулевой адрес */
export const zeroAddress = '0x0000000000000000000000000000000000000000';
