import { AbiItem } from 'web3-utils'
export const name: AbiItem = {
  constant: true,
  inputs: [],
  name: 'name',
  outputs: [{ name: '', type: 'string' }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}
export const approve: AbiItem = {
  constant: false,
  inputs: [
    { name: '_spender', type: 'address' },
    { name: '_value', type: 'uint256' }
  ],
  name: 'approve',
  outputs: [{ name: '', type: 'bool' }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}
export const totalSupply: AbiItem = {
  constant: true,
  inputs: [],
  name: 'totalSupply',
  outputs: [{ name: '', type: 'uint256' }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}
export const transferFrom: AbiItem = {
  constant: false,
  inputs: [
    {
      name: '_from',
      type: 'address'
    },
    {
      name: '_to',
      type: 'address'
    },
    {
      name: '_value',
      type: 'uint256'
    }
  ],
  name: 'transferFrom',
  outputs: [{ name: '', type: 'bool' }],
  payable: false,
  stateMutability: 'nonpayable',
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
export const balanceOf: AbiItem = {
  constant: true,
  inputs: [{ name: '_owner', type: 'address' }],
  name: 'balanceOf',
  outputs: [{ name: 'balance', type: 'uint256' }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}
export const symbol: AbiItem = {
  constant: true,
  inputs: [],
  name: 'symbol',
  outputs: [{ name: '', type: 'string' }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}
export const transfer: AbiItem = {
  constant: false,
  inputs: [
    {
      name: '_to',
      type: 'address'
    },
    {
      name: '_value',
      type: 'uint256'
    }
  ],
  name: 'transfer',
  outputs: [{ name: '', type: 'bool' }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}
export const allowance: AbiItem = {
  constant: true,
  inputs: [
    {
      name: '_owner',
      type: 'address'
    },
    {
      name: '_spender',
      type: 'address'
    }
  ],
  name: 'allowance',
  outputs: [
    {
      name: '',
      type: 'uint256'
    }
  ],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}
export const payable: AbiItem = {
  payable: true,
  stateMutability: 'payable',
  type: 'fallback'
}
export const Approval: AbiItem = {
  anonymous: false,
  inputs: [
    {
      indexed: true,
      name: 'owner',
      type: 'address'
    },
    {
      indexed: true,
      name: 'spender',
      type: 'address'
    },
    {
      indexed: false,
      name: 'value',
      type: 'uint256'
    }
  ],
  name: 'Approval',
  type: 'event'
}
export const Transfer: AbiItem = {
  anonymous: false,
  inputs: [
    {
      indexed: true,
      name: 'from',
      type: 'address'
    },
    {
      indexed: true,
      name: 'to',
      type: 'address'
    },
    {
      indexed: false,
      name: 'value',
      type: 'uint256'
    }
  ],
  name: 'Transfer',
  type: 'event'
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

export const ERC20ABI: AbiItem[] = [
  name,
  approve,
  totalSupply,
  transferFrom,
  decimals,
  balanceOf,
  symbol,
  transfer,
  allowance
]
export const ERC721ABI: AbiItem[] = [tokenURI, ownerOf]

export const BalanceCheckerABI: AbiItem[] = [
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback'
  },
  {
    constant: true,
    inputs: [
      { name: 'user', type: 'address' },
      { name: 'token', type: 'address' }
    ],
    name: 'tokenBalance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: 'users', type: 'address[]' },
      { name: 'tokens', type: 'address[]' }
    ],
    name: 'balances',
    outputs: [{ name: '', type: 'uint256[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
]
