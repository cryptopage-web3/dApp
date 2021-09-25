export const balanceOf = {
  constant: true,
  inputs: [{ name: '_owner', type: 'address' }],
  name: 'balanceOf',
  outputs: [{ name: 'balance', type: 'uint256' }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}
export const decimals = {
  constant: true,
  inputs: [],
  name: 'decimals',
  outputs: [{ name: '', type: 'uint8' }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}

export const tokenURI = {
  constant: true,
  inputs: [{ name: 'tokenId', type: 'uint256' }],
  name: 'tokenURI',
  outputs: [{ name: '', type: 'string' }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}
export const ownerOf = {
  constant: true,
  inputs: [{ name: '_tokenId', type: 'uint256' }],
  name: 'ownerOf',
  outputs: [{ name: 'owner', type: 'address' }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}

export const ERC20ABI = [balanceOf, decimals]
export const ERC721ABI = [tokenURI, ownerOf]
