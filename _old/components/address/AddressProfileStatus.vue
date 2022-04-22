<template>
  <div class="profile-status__container">
    <div v-if="!isOwner || !isSameChain" class="profile-status" :title="status">
      Status: <span>{{ status }}</span>
    </div>
    <template v-else>
      <div v-show="!isEdit" class="profile-status">
        Status:
        <a href="#" :title="status" @click.prevent="showEdit">{{ status }}</a>
      </div>
      <form v-show="isEdit">
        <div
          class="profile-status__edit"
          :class="{
            'profile-status__edit_loading': loading
          }"
        >
          <input
            ref="input"
            v-model="localStatus"
            :disabled="loading"
            type="text"
            placeholder="Your status"
            class="profile-status__edit-input"
          />
          <button
            :disabled="loading"
            class="profile-status__edit-btn"
            @click.prevent="submit"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
            <template v-else>Save</template>
          </button>
          <div
            v-if="!loading"
            class="profile-status__edit-close"
            @click.prevent="closeEdit"
          >
            <img src="@/assets/img/post-comment__close.svg" alt="" />
          </div>
        </div>
      </form>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { useStore } from 'vuex-simple'
import TypedStore from '~/logic/store'

@Component({})
export default class AddressProfileStatus extends Vue {
  public typedStore: TypedStore = useStore(this.$store)

  isEdit = false
  loading = false
  status = 'Hello, World!'
  localStatus = ''
  clickOutsideListener: ((event: JQuery.ClickEvent) => void) | null = null

  $refs!: {
    input: HTMLInputElement
  }

  get isOwner(): boolean {
    return (
      String(this.typedStore.address.address).toLowerCase() ===
      String(this.typedStore.auth.selectedAddress).toLowerCase()
    )
  }

  get isSameChain(): boolean {
    return (
      String(this.typedStore.address.chainId).toLowerCase() ===
      String(this.typedStore.auth.chainId).toLowerCase()
    )
  }

  mounted() {
    this.$nextTick(() => {
      this.clickOutsideListener = this.clickOutsideHandler.bind(this)
      $(document).on('click', this.clickOutsideListener)
    })
  }

  beforeDestroy() {
    if (!this.clickOutsideListener) {
      return
    }

    $(document).off('click', this.clickOutsideListener)
    this.clickOutsideListener = null
  }

  // methods

  clickOutsideHandler(event: JQuery.ClickEvent) {
    if (
      !$(event.target).closest('.profile-status__container').length &&
      this.isEdit &&
      !this.loading
    ) {
      this.closeEdit()
    }
  }

  showEdit() {
    this.isEdit = true
    this.localStatus = this.status

    this.$nextTick(() => {
      this.$refs.input.focus()
    })
  }

  closeEdit() {
    this.isEdit = false
  }

  submit() {
    if (!this.localStatus) {
      this.$notify({
        type: 'error',
        title: 'Empty status'
      })
      return
    }

    this.loading = true

    setTimeout(() => {
      this.status = this.localStatus

      this.loading = false
      this.closeEdit()
    }, 1000)
  }
}
</script>
