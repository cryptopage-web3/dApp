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
    return this.$store.getters['auth/selectedAddress']
  }

  get chainId(): number | string {
    return this.$store.getters['auth/chainId']
  }

  get isFetchDisabled(): boolean {
    return Boolean(
      this.hasAllPages || this.$fetchState.pending || this.$fetchState.error
    )
  }

  /** если сменился адрес, но в сторе адрес еще старый,
   * если сменилась сеть, но в сторе сеть еще старая
   */
  get isNotSyncedAddressWithStore(): boolean {
    return Boolean(
      (this.address && this.address !== this.$route.params.address) ||
        (this.chainId &&
          this.getNetworkNameByChainId(this.chainId) !==
            this.$route.params.networkName)
    )
  }

  // watch

  @Watch('address')
  onAddressChanged(newAddress: string, oldAddress: string) {
    this.reset(newAddress, oldAddress)
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

  async reset(newAddress: string, oldAddress: string) {
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

    if (newAddress !== oldAddress) {
      const params = this.$route.params
      params.address = newAddress
      await this.$router.push({ params })
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

  async resetChain(newChain: number | string, oldChain: number | string) {
    /** проверяем, что chain изменился вне зависимости от типа: string, number
     * TODO: в какой момент приходит строка, нужно сделать приведение типа и хранить всегда в number
     */
    if (Number(newChain) === Number(oldChain)) {
      return
    }

    const params = this.$route.params
    const chainId = this.chainId

    const networkName = this.getNetworkNameByChainId(chainId)
    if (networkName) params.networkName = networkName
    await this.$store.dispatch('address/clearTransactions')
    await this.$router.push({ params })
  }

  // methods

  next() {
    /** нельзя вызвать $fetch, если уже получили полный список транзакций,
     * либо текущий статус запроса pending или error */
    if (this.isFetchDisabled) return
    this.$fetch()
  }

  getNetworkNameByChainId(chainId: number | string) {
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

    return validNetworks[chainId]
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
