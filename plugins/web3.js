import Web3 from 'web3'
import web3Provider from '@/web3/provider'

import {
  _range,
  validateTransaction,
  shortAddress,
  isOwnerTransaction
} from '~/utils'

const PROJECT_ID = `a925609bdb25477d8039c763faa7b61d`

const getInfuraProvider = ({
  name = 'mainnet',
  projectID = PROJECT_ID,
  type = 'https'
}) => {
  if (type !== 'https' || type !== 'wss') return
  let provider

  const https = [
    'mainnet',
    'ropsten',
    'kovan',
    'rinkeby',
    'goerli',
    'polygon-mainnet',
    'polygon-mumbai',
    'arbitrum-mainnet',
    'arbitrum-rinkeby',
    'optimism-mainnet',
    'optimism-kovan'
  ]
  const wss = ['mainnet', 'ropsten', 'kovan', 'rinkeby', 'goerli']

  if (https.includes(name)) {
    provider = {
      https: `https://${name}.infura.io/v3/${PROJECT_ID}`
    }
    if (wss.includes(name)) {
      provider.wss = `wss://${name}.infura.io/ws/v3/${PROJECT_ID}`
    }
  }
  return provider[type]
}

const web3 = new Web3(Web3.givenProvider || getInfuraProvider({ type: 'wss' }))

const getBlocks = async (count, showDetailTransactions = false, callback) => {
  const latest = await web3.eth.getBlockNumber()
  const blockNumbers = _range(latest - count, latest + 1)
  const batch = new web3.eth.BatchRequest()

  blockNumbers.forEach((blockNumber) => {
    batch.add(
      web3.eth.getBlock.request(blockNumber, showDetailTransactions, callback)
    )
  })

  return batch.execute()
}

const getConfirmationsCount = async (txHash) => {
  try {
    const tx = await web3.eth.getTransaction(txHash)
    const currentBlock = await web3.eth.getBlockNumber()
    return tx.blockNumber === null ? 0 : currentBlock - tx.blockNumber
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`ERROR in getConfirmations with txHash ${txHash}:`, error)
  }
}

const watchConfirmation = (
  txHash,
  callback,
  confirmations = 10,
  timeout = 30 * 1000
) => {
  setTimeout(async () => {
    const txConfirmations = await getConfirmationsCount(txHash)
    if (txConfirmations >= confirmations) {
      return callback()
    }
    return watchConfirmation(txHash, callback, confirmations, timeout)
  }, timeout)
}

const watchAddressTransactions = (to, from, callback) => {
  const subscription = web3.eth.subscribe('pendingTransactions')
  subscription
    .subscribe((error, result) => {
      // eslint-disable-next-line no-console
      if (error) console.error(`ERROR in watchAddressTransactions:`, error)
    })
    .on('data', async (txHash) => {
      try {
        const tx = await web3.eth.getTransaction(txHash)
        // console.log('tx', tx)
        const valid = validateTransaction(tx)
        if (!valid) return
        if ((from && tx.from === from) || (to && tx.to === to)) {
          callback()
        }
        // subscription.unsubscribe()
      } catch (error) {
        console.log(`ERROR in watchAddressTransactions:`, error) // eslint-disable-line no-console
      }
    })
}

const watchTokenTransfers = (
  tokenABI,
  tokenContractAddress,
  from,
  to,
  value
) => {
  const tokenContract = new web3.eth.Contract(
    tokenABI,
    tokenContractAddress,
    (error, result) => {
      // eslint-disable-next-line no-console
      if (error) console.log(`ERROR in watchTokenTransfers:`, error)
    }
  )

  const options = {
    filter: {
      _from: from,
      _to: to,
      _value: value
    },
    fromBlock: 'latest'
  }

  tokenContract.events.Transfer(options, (error, event) => {
    if (error) {
      console.log(`ERROR in watchTokenTransfers: `, error) // eslint-disable-line no-console
      return
    }
    console.log('event', event) // eslint-disable-line no-console
  })
}
const getTransactionsByAddress = (address, blockNumbers, callback) => {
  const batch = new web3.eth.BatchRequest()
  const handleBlock = (error, block) => {
    if (error) console.error('ERROR:', error) // eslint-disable-line no-console
    for (const transaction of block.transactions) {
      if (isOwnerTransaction(address, transaction)) {
        callback(transaction)
      }
    }
  }
  blockNumbers.forEach((blockNumber) => {
    batch.add(web3.eth.getBlock.request(blockNumber, true, handleBlock))
  })

  return batch.execute()
}

export default ({ app }, inject) => {
  inject('web3', web3)
  inject('getBlocks', (number, storage) => getBlocks(number, storage))
  inject('watchConfirmation', (txHash, callback, confirmations, timeout) =>
    watchConfirmation(txHash, callback, confirmations, timeout)
  )
  inject('watchAddressTransactions', (to, from, callback) =>
    watchAddressTransactions(to, from, callback)
  )
  inject('shortAddress', (address) => shortAddress(address))
  inject(
    'watchTokenTransfers',
    (tokenABI, tokenContractAddress, from, to, value) =>
      watchTokenTransfers(tokenABI, tokenContractAddress, from, to, value)
  )
  inject('provider', web3Provider)
  inject('getTransactionsByAddress', (address, blockNumbers, callback) =>
    getTransactionsByAddress(address, blockNumbers, callback)
  )
}
