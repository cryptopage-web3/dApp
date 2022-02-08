import { Service, Inject } from 'vue-typedi'
import AuthService from '~/logic/auth/service'
import AddressService from '~/logic/address/services'
import TokenCacheService from '~/logic/tokens/services/cache'
import TokenAPIService from '~/logic/tokens/services/api'
import TokenIPFSService from '~/logic/tokens/services/ipfs'
import TokenWeb3Service from '~/logic/tokens/services/web3'
import { TokenBalanceType, TokenInfoType } from '~/logic/tokens/types'
import tokens from '~/logic/tokens'

@Service(tokens.TOKEN_SERVICE)
export default class TokenService {
  @Inject(tokens.AUTH_SERVICE)
  public authService!: AuthService

  @Inject(tokens.ADDRESS_SERVICE)
  public addressService!: AddressService

  @Inject(tokens.TOKEN_CACHE_SERVICE)
  public tokenCacheService!: TokenCacheService

  @Inject(tokens.TOKEN_API_SERVICE)
  public tokenAPIService!: TokenAPIService

  @Inject(tokens.TOKEN_IPFS_SERVICE)
  public tokenIPFSService!: TokenIPFSService

  @Inject(tokens.TOKEN_WEB3_SERVICE)
  public tokenWeb3Service!: TokenWeb3Service

  public getTokenRate = async (
    address: string,
    currency = 'usd'
  ): Promise<number> => {
    const tokenInfo = await this.getTokenInfo(address)
    if (currency === 'usd') {
      return tokenInfo && tokenInfo.rate && tokenInfo.rate.usd
        ? tokenInfo.rate.usd
        : 0
    }
    return 0
  }

  public getTokenInfo = async (
    address: string
  ): Promise<TokenInfoType | null> => {
    if (await this.tokenCacheService.tokenInfoCached(address)) {
      return await this.tokenCacheService.getTokenInfo(address)
    } else {
      let tokenInfo = await this.tokenIPFSService.getTokenInfo(address)
      if (!tokenInfo) {
        tokenInfo = await this.tokenWeb3Service.getTokenInfo(address)
      }
      this.tokenCacheService.setTokenInfo(address, tokenInfo)
      return tokenInfo
    }
  }

  /**
   * Returns sorted desc by usdBalance, but at first plase always basicToken
   */
  public getTokenBalances = async (
    address: string
  ): Promise<TokenBalanceType[]> => {
    let tokenBalances = await this.tokenAPIService.getTokenBalances(address)
    const pageTokenBalance = await this.getPageTokenBalance(address)

    /** tokenBalances - список токенов, полученный от Сovalent API
     * для solana - используется public-api.solscan.io
     * для tron - используется apilist.tronscan.org
     *
     * Если Сovalent API возвращает токены по адресу, то данные токены будут являться результатом операции
     * Если токенов нет (обычно для тестовых сетей), то балансы получаем по каждому токену из списка, который хранится в ipfs
     * в tokenBalances в таком случае записываются по условию: balance > 0
     **/

    if (tokenBalances.length > 0) {
      /** токен, соответствующий выбранному chainId */
      let basicTokenBalance = tokenBalances.find((tokenBalance) => {
        return (
          tokenBalance.tokenInfo.symbol?.toLowerCase() ===
          this.basicToken.symbol?.toLowerCase()
        )
      })

      tokenBalances = tokenBalances.filter((tokenBalance) => {
        return (
          tokenBalance.tokenInfo.symbol?.toLowerCase() !==
          this.basicToken.symbol?.toLowerCase()
        )
      })

      /** Sort desc by usdBalance */
      tokenBalances = tokenBalances.sort((a, b) =>
        a.usdBalance > b.usdBalance ? -1 : 1
      )

      /** если нет нужного токена в списке, то пробуем его получить из web3 (eth) */
      if (!basicTokenBalance) {
        basicTokenBalance = await this.getBasicTokenBalance(address)
      }

      /** итоговый список: токен выбранной сети, баланс crypto.page, все остальные токены */
      tokenBalances = [basicTokenBalance, pageTokenBalance, ...tokenBalances]
    } else {
      /** Add basic token, because IPFSTokenStorage don't store it  */
      const basicTokenBalance = await this.getBasicTokenBalance(address)
      tokenBalances = await this.tokenWeb3Service.getTokenBalances(address)

      /** Sort desc by usdBalance */
      tokenBalances = tokenBalances.sort((a, b) =>
        a.usdBalance > b.usdBalance ? -1 : 1
      )

      /** итоговый список: токен выбранной сети, баланс crypto.page, все остальные токены */
      tokenBalances = [basicTokenBalance, pageTokenBalance, ...tokenBalances]
    }

    /** Add to cache each token */
    await tokenBalances.forEach(async (tokenBalance: TokenBalanceType) => {
      if (tokenBalance.tokenInfo) {
        await this.tokenCacheService.setTokenInfo(
          tokenBalance.tokenInfo.address,
          tokenBalance.tokenInfo
        )
      }
    })

    return tokenBalances
  }

  public getBasicTokenBalance = async (
    address: string
  ): Promise<TokenBalanceType> => {
    const rawBalance = await this.addressService.getBalance(address)
    const tokenInfo = this.basicToken
    const rate = await this.getTokenRate(tokenInfo.address, 'usd')
    tokenInfo.rate = { usd: rate }
    const balance = rawBalance / 10 ** tokenInfo.decimals
    const usdBalance = balance * Number(tokenInfo.rate ? tokenInfo.rate.usd : 0)
    return {
      balance,
      usdBalance,
      diff: 0,
      tokenInfo
    }
  }

  public subscribePageTokenBalance = async (
    address: string
    // callback?: (tokenBalance: TokenBalanceType) => {}
  ) => {
    try {
      const CONTRACT = await import(
        `../../../contracts/${this.authService.selectedNetworkSlug}/PageToken.json`
      )
      const contract = new this.tokenWeb3Service.$web3.eth.Contract(
        CONTRACT.abi,
        CONTRACT.address
      )
      const options = {
        filter: {
          address: [address]
        },
        fromBlock: 0
      }
      contract.events
        .Transfer(options)
        .on('data', (event: string) => console.log(event))
        .on('changed', (changed: string) => console.log(changed))
        .on('error', (err: string) => {
          throw err
        })
        .on('connected', (str: string) => console.log(str))
    } catch (error) {}
  }

  public getPageTokenBalance = async (
    address: string
  ): Promise<TokenBalanceType> => {
    const tokenInfo = this.pageToken
    try {
      const contractABI = await import(
        `../../../contracts/${this.authService.selectedNetworkSlug}/PageToken.json`
      )
      tokenInfo.address = contractABI.address
      const balance = await this.addressService.addressWEB3Service.getBalanceOf(
        address,
        tokenInfo.address
      )
      const rate = await this.getTokenRate(tokenInfo.address, 'usd')
      tokenInfo.rate = { usd: rate }
      const usdBalance =
        balance * Number(tokenInfo.rate ? tokenInfo.rate.usd : 0)
      return {
        balance,
        usdBalance,
        diff: 0,
        tokenInfo
      }
    } catch {
      return {
        balance: 0,
        usdBalance: 0,
        diff: 0,
        tokenInfo
      }
    }
  }

  public get pageToken(): TokenInfoType {
    return {
      address: '0x1F33CF88A6D824650FF4b58d377B4D62604495B7',
      name: 'Crypto Page',
      symbol: 'PAGE',
      decimals: 18,
      image: require('@/assets/img/logo.svg'),
      rate: { usd: 0 }
    }
  }

  public get basicToken(): TokenInfoType {
    const chainId = this.authService.selectedChainId
    const baseURL =
      'https://www.covalenthq.com/static/images/icons/display-icons/'
    let tokenInfo = {
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      name: 'Ethereum coin',
      symbol: 'ETH',
      decimals: 18,
      image: `${baseURL}ethereum-eth-logo.png`,
      rate: { usd: 0 }
    }
    if ([56, 97].includes(Number(chainId))) {
      tokenInfo = {
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        name: 'Binance coin',
        symbol: 'BNB',
        decimals: 18,
        image: `${baseURL}binance-coin-bnb-logo.png`,
        rate: { usd: 0 }
      }
    } else if ([137, 80001].includes(Number(chainId))) {
      tokenInfo = {
        address: '0x0000000000000000000000000000000000001010',
        name: 'Polygon coin',
        symbol: 'MATIC',
        decimals: 18,
        image: `https://logos.covalenthq.com/tokens/1/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png`,
        rate: { usd: 0 }
      }
    } else if (chainId === 'tron') {
      tokenInfo = {
        address: '0x0000000000000000000000000000000000001010',
        name: 'Tron',
        symbol: 'TRX',
        decimals: 6,
        image: `https://etherscan.io/token/images/trontrx_32.png`,
        rate: { usd: 0 }
      }
    } else if (chainId === 'solana') {
      tokenInfo = {
        address: '0x0000000000000000000000000000000000001010',
        name: 'Solana',
        symbol: 'SOL',
        decimals: 18,
        image: `https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png`,
        rate: { usd: 0 }
      }
    }
    return tokenInfo
  }
}
