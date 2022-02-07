import Vue from 'vue'
import { Component, Watch } from 'nuxt-property-decorator'

@Component({})
export default class PaginationMixin extends Vue {
  scrollListener: null | (() => void) = null

  // computed

  /** геттер будем получать из основных компонентов,
   * в mixin для ts
   */
  get hasAllPages(): boolean {
    return false
  }

  get address(): string {
    return this.$store.getters['address/address']
  }

  get chainId(): number | string {
    return this.$store.getters['auth/chainId']
  }

  get isFetchDisabled(): boolean {
    return Boolean(
      this.hasAllPages || this.$fetchState.pending || this.$fetchState.error
    )
  }

  // watch

  @Watch('address')
  onAddressChanged() {
    this.reset()
  }

  @Watch('chainId')
  onChainIdChanged(newChain: number | string, oldChain: number | string) {
    this.resetChain(newChain, oldChain)
  }

  /** в момент получения новых транзакций необходим триггер скролла
   * чтобы обновилось положение сайдбаров
   */
  @Watch('transactions')
  onTransactionsChanged() {
    this.$nextTick(() => {
      $(window).trigger('scroll')
    })
  }

  // lifecycle hooks

  mounted() {
    this.$nextTick(() => {
      this.scrollListener = this.scrollHandler.bind(this)
      $(window).on('scroll', this.scrollListener)
    })
  }

  beforeDestroy() {
    if (!this.scrollListener) {
      return
    }

    $(window).off('scroll', this.scrollListener)
    this.scrollListener = null
  }

  // methods

  next() {
    /** нельзя вызвать $fetch, если уже получили полный список транзакций,
     * либо текущий статус запроса pending или error */
    if (this.isFetchDisabled) return
    this.$fetch()
  }

  reset() {
    /** очищаем транзакции при смене адреса */
    this.$store.dispatch('address/clearTransactions')

    /** после очистки нужно запустить $fetch
     * если $fetch не запущен, то сразу его вызываем
     * если $fetch выполняется, то необходимо дождаться его завершения, а потом запустить
     * иначе $fetch не запустится
     */
    if (!this.$fetchState.pending) {
      this.$fetch()
      return
    }

    /** ожидаем окончания $fetch, очищаем watcher, запускаем повторно $fetch */
    const unwatchPending = this.$watch('$fetchState.pending', (pending) => {
      if (!pending) {
        unwatchPending()

        this.$nextTick(() => {
          this.$fetch()
        })
      }
    })
  }

  /** Не сбрасываем транзакции и не редиректим при смене selectedAddress
   * Для данной страницы selectedAddress никакого значения не имеет, проверяем только address
   * Иначе нельзя перейти на страницу любого адреса,
   * т.к. в этот момент selectedAddress меняется с пустой строки на адрес провайдера и происходит редирект
   * Поэтому удалил resetAddress (Nail M.)
   * chain не поддается данной логике, т.к. выбранный chain присутствует в URL, поэтому при изменении должны редиректить
   */
  /* async resetAddress(newAddress: string, oldAddress: string) {
    ...
  } */

  async resetChain(newChain: number | string, oldChain: number | string) {
    /** проверяем, что chain изменился вне зависимости от типа: string, number
     * TODO: в какой момент приходит строка, нужно сделать приведение типа и хранить всегда в number
     */
    if (Number(newChain) === Number(oldChain)) {
      return
    }

    const params = this.$route.params
    const chainId = this.chainId

    const validNetworks: Record<number | string, string> = {
      1: 'eth',
      3: 'ropsten',
      4: 'rinkeby',
      5: 'goerly',
      42: 'kovan',
      56: 'bsc',
      97: 'bsc-testnet',
      137: 'polygon',
      80001: 'polygon-testnet',
      tron: 'tron',
      solana: 'solana'
    }
    const networkName = validNetworks[chainId]
    if (networkName) params.networkName = networkName
    /*
    if (chainId === 1) {
      params.networkName = 'eth'
    } else if (chainId === 4) {
      params.networkName = 'rinkeby'
    } else if (chainId === 56) {
      params.networkName = 'bsc'
    } else if (chainId === 137) {
      params.networkName = 'matic'
    }
    */
    await this.$store.dispatch('address/clearTransactions')
    await this.$router.push({ params })
  }

  scrollHandler() {
    /** пагинатор только для транзакций,
     * если доскролили до низа блока транзакций, то делаем запрос на следующую страницу
     */
    const windowHeight = Number($(window).height())
    const windowScrollTop = Number($(window).scrollTop())
    const elemOffsetTop = Number($('.transactions-body').offset()?.top)
    const elemHeight = Number($('.transactions-body').height())

    if (windowScrollTop + windowHeight > elemOffsetTop + elemHeight) {
      this.next()
    }
  }
}
