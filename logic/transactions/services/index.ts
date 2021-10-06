import { Service } from 'vue-typedi'
import TransactionAPIService from '~/logic/transactions/services/api'
import tokens from '~/logic/tokens'

@Service(tokens.TRANSACTION_SERVICE)
export default class TransactionService extends TransactionAPIService {}
