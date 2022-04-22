export type SignatureType = {
  [signature: string]: {
    text: string
    name: string
  }
}

export const signatures: SignatureType = {
  '0x95d89b41': {
    text: 'symbol()',
    name: 'Symbol'
  },
  '0x06fdde03': {
    text: 'name()',
    name: 'Name'
  },
  '0x095ea7b3': {
    text: 'approve(address,uint256)',
    name: 'Approve'
  },
  '0x313ce567': {
    text: 'decimals()',
    name: 'Decimals'
  },
  '0x18160ddd': {
    text: 'totalSupply()',
    name: 'TotalSupply'
  },
  '0x70a08231': {
    name: 'BalanceOf',
    text: 'balanceOf(address)'
  },
  '0x23b872dd': {
    text: 'transferFrom(address,address,uint256)',
    name: 'TransferFrom'
  },
  '0xa9059cbb': {
    text: 'transfer(address,uint256)',
    name: 'Transfer'
  },
  '0x5f575529': {
    text: 'swap(string,address,uint256,bytes)',
    name: 'Swap'
  },
  '0x5c11d795': {
    text: 'swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256,uint256,address[],address,uint256)',
    name: 'Swap Exact Tokens For Tokens Supporting Fee On Transfer Tokens'
  },
  '0x38ed1739': {
    text: 'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)',
    name: 'Swap Exact Tokens For Tokens'
  }
}
