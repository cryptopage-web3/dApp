import Vue from 'vue'
import { Component, Watch } from 'nuxt-property-decorator'
import { useStore } from 'vuex-simple'
import { networkHelper } from '~/utils/networkHelper'
import TypedStore from '~/logic/store'

@Component({})
export default class PaginationMixin extends Vue {
  public typedStore: TypedStore = useStore(this.$store)

  scrollListener: null | (() => void) = null

  // computed

  /** геттер будем получать из основных компонентов,
   * в mixin для ts
   */
  get hasAllPages(): boolean {
    return false
  }

  get address(): string {
    return this.typedStore.address.address
  }

  get chainId(): number | string {
    return this.typedStore.address.chainId
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
          networkHelper.getNetworkSlug(this.chainId) !==
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
