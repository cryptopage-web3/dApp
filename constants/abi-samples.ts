import { AbiItem } from 'web3-utils'

export const balanceOf: AbiItem = {
  constant: true,
  inputs: [{ name: '_owner', type: 'address' }],
  name: 'balanceOf',
  outputs: [{ name: 'balance', type: 'uint256' }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}
export const decimals: AbiItem = {
  constant: true,
  inputs: [],
  name: 'decimals',
  outputs: [{ name: '', type: 'uint8' }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}

export const tokenURI: AbiItem = {
  constant: true,
  inputs: [{ name: 'tokenId', type: 'uint256' }],
  name: 'tokenURI',
  outputs: [{ name: '', type: 'string' }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}
export const ownerOf: AbiItem = {
  constant: true,
  inputs: [{ name: '_tokenId', type: 'uint256' }],
  name: 'ownerOf',
  outputs: [{ name: 'owner', type: 'address' }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}

export const ERC20ABI: AbiItem[] = [balanceOf, decimals]
export const ERC721ABI: AbiItem[] = [tokenURI, ownerOf]
