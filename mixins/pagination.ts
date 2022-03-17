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
    return this.$store.getters['address/chainId']
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
