export type SignatureType = {
  signature: string
  name: string
}
export const signatures: SignatureType[] = [
  {
    signature: '0x06fdde03',
    name: 'name'
  },
  {
    signature: '0x095ea7b3',
    name: 'approve'
  },
  {
    signature: '0x18160ddd',
    name: 'totalSupply'
  },
  {
    signature: '0x23b872dd',
    name: 'transferFrom'
  },
  {
    signature: '0x313ce567',
    name: 'decimals'
  },
  {
    signature: '0x70a08231',
    name: 'balanceOf'
  },
  {
    signature: '0x95d89b41',
    name: 'symbol'
  },
  {
    signature: '0xa9059cbb',
    name: 'transfer'
  }
]
