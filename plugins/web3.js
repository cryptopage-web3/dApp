import Web3 from 'web3'

const PROJECT_ID = `a925609bdb25477d8039c763faa7b61d`

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

export const web3 = new Web3(
  getInfuraProvider({ type: 'wss' } || Web3.givenProvider)
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ app }, inject) => {
  inject('web3', web3)
}
