import Web3 from 'web3'
import { Container } from 'vue-typedi'
import tokens from '~/logic/tokens'
import { PROVIDER_HOST_BY_CHAINID } from '~/constants'

export const web3 = new Web3(Web3.givenProvider || PROVIDER_HOST_BY_CHAINID[1])

Container.set(tokens.WEB3, web3)
