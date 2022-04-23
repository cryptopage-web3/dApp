type BaseStrictTransaction = {
  value?: string
  gas: string
  hash: string
  input: string
  nonce: string
  to: string
}

export type BaseTransaction = BaseStrictTransaction
