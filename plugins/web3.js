import Web3 from 'web3'
import web3Provider from '@/web3/provider'

import { _range } from '~/utils/array'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/constants/contract'
import { nftDataDecoder, tokenURItoURI } from '~/utils/web3'

const PROJECT_ID = `03d727fcc0e4440badfadb46a5388165`

const getInfuraProvider = ({ name, type }) => {
  if (!name) name = 'mainnet'
  if (type !== 'https' || type !== 'wss') type = 'wss'
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
      provider = {
        ...provider,
        wss: `wss://${name}.infura.io/ws/v3/${PROJECT_ID}`
      }
    }
  }
  return provider[type]
}

const web3 = new Web3(getInfuraProvider({ type: 'wss' }) || Web3.givenProvider)

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

const watchAddressTransactions = ({ address, callback }) => {
  const subscription = web3.eth.subscribe('pendingTransactions')
  subscription
    .subscribe((error, result) => {
      // eslint-disable-next-line no-console
      if (error) console.error(`ERROR in watchAddressTransactions:`, error)
    })
    .on('data', async (txHash) => {
      try {
        address = web3.utils.toChecksumAddress(address)
        const tx = await web3.eth.getTransaction(txHash)
        if (tx) {
          const toAddress = tx.to ? web3.utils.toChecksumAddress(tx.to) : null
          const fromAddress = tx.from
            ? web3.utils.toChecksumAddress(tx.from)
            : null
          if (toAddress === address || fromAddress === address) {
            callback(tx)
          }
        }
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
      if (error) console.log(`ERROR in watchTokenTransfers:`, error) // eslint-disable-line no-console
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

const sendPostHash = ({ params, callbacks }) => {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

  contract.methods
    .safeMint(params.hash, params.comment)
    .send({
      from: params.from
    })
    .on('transactionHash', callbacks.onTransactionHash)
    .on('receipt', callbacks.onReceipt)
    .on('error', callbacks.onError)
}

const getERC20TransferByHash = async (hash) => {
  const tx = await web3.eth.getTransaction(hash)
  if (
    tx !== null &&
    (tx.input.length === 138 || tx.input.slice(2, 10) === 'a9059cbb')
  ) {
    const receiver = web3.utils.toChecksumAddress(`0x${tx.input.slice(34, 74)}`)
    const amount = web3.utils.toBN('0x' + tx.input.slice(74)) // hexToDec(tx.input.slice(74))
    const symbol = tx.to
    const sender = web3.utils.toChecksumAddress(tx.from)
    return { receiver, amount, symbol, hash, sender }
  }
  return {}
}

const getERC20Balance = async (address, contractAddress) => {
  const minABI = [
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ name: '', type: 'uint8' }],
      type: 'function'
    }
  ]
  try {
    const contract = new web3.eth.Contract(minABI, contractAddress)
    const balanceOf = await contract.methods.balanceOf(address).call()
    const decimals = await contract.methods.decimals().call()
    const balance = balanceOf / 10 ** decimals
    return balance.toString()
  } catch (error) {
    console.error('ERROR in getERC20Balance: ', error) // eslint-disable-line no-console
    return 0
  }
}

const getERC721Data = async (tokenId, contractAddress) => {
  const minABI = [
    {
      constant: true,
      inputs: [{ name: 'tokenId', type: 'uint256' }],
      name: 'tokenURI',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: '_tokenId', type: 'uint256' }],
      name: 'ownerOf',
      outputs: [{ name: 'owner', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }
  ]
  try {
    const contract = new web3.eth.Contract(minABI, contractAddress)
    const tokenURI = await contract.methods.tokenURI(tokenId).call()
    const owner = await contract.methods.ownerOf(tokenId).call()
    if (tokenURI) {
      let response = {}
      if (tokenURI.startsWith('data:') && tokenURI.includes(';base64,')) {
        const base64 = tokenURI.split(';base64,')[1]
        response = JSON.parse(atob(base64))
      } else {
        const URI = tokenURItoURI(tokenURI)
        response = await fetch(URI).then((response) => response.json())
      }
      const nftData = Object.assign(response, { owner })
      return nftDataDecoder(nftData)
    }
  } catch (error) {
    console.error('ERROR in getERC721Data: ', error) // eslint-disable-line no-console
    return null
  }
}

export default ({ app }, inject) => {
  inject('web3', web3)
  inject('getBlocks', (number, storage) => getBlocks(number, storage))
  inject('watchConfirmation', (txHash, callback, confirmations, timeout) =>
    watchConfirmation(txHash, callback, confirmations, timeout)
  )
  inject('watchAddressTransactions', (opt) => watchAddressTransactions(opt))
  inject(
    'watchTokenTransfers',
    (tokenABI, tokenContractAddress, from, to, value) =>
      watchTokenTransfers(tokenABI, tokenContractAddress, from, to, value)
  )
  inject('provider', web3Provider)
  inject('sendPostHash', (params) => sendPostHash(params))
  inject('getERC20TransferByHash', (hash) => getERC20TransferByHash(hash))
  inject('getERC20Balance', (address, contractAddress) =>
    getERC20Balance(address, contractAddress)
  )
  inject('getERC721Data', (address, contractAddress) =>
    getERC721Data(address, contractAddress)
  )
}
