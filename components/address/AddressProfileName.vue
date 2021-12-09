<template>
  <div class="profile-name__container">
    <div v-if="!isOwner" class="profile-name">{{ name }}</div>
    <template v-else>
      <div v-show="!isEdit" class="profile-name">
        <a href="#" @click.prevent="showEdit">{{ name }}</a>
      </div>
      <form v-show="isEdit">
        <div
          class="profile-name__edit"
          :class="{
            'profile-name__edit_loading': loading
          }"
        >
          <input
            ref="input"
            v-model="localName"
            :disabled="loading"
            type="text"
            placeholder="Your name"
            class="profile-name__edit-input"
          />
          <button
            :disabled="loading"
            class="profile-name__edit-btn"
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
            class="profile-name__edit-close"
            @click.prevent="closeEdit"
          >
            <font-awesome-icon :icon="['fas', 'times']" />
          </div>
        </div>
      </form>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { INotifyParams } from '~/types'

@Component({})
export default class AddressProfileName extends Vue {
  isEdit = false
  loading = false
  name = 'John Wick'
  localName = ''
  clickOutsideListener: ((event: JQuery.ClickEvent) => void) | null = null

  $notify!: (params: INotifyParams) => void
  $refs!: {
    input: HTMLInputElement
  }

  get isOwner(): boolean {
    return (
      String(this.$store.getters['address/address']).toLowerCase() ===
      String(this.$store.getters['auth/selectedAddress']).toLowerCase()
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
      !$(event.target).closest('.profile-name__container').length &&
      this.isEdit &&
      !this.loading
    ) {
      this.closeEdit()
    }
  }

  showEdit() {
    this.isEdit = true
    this.localName = this.name

    this.$nextTick(() => {
      this.$refs.input.focus()
    })
  }

  closeEdit() {
    this.isEdit = false
  }

  submit() {
    if (!this.localName) {
      this.$notify({
        type: 'error',
        title: 'Empty name'
      })
      return
    }

    this.loading = true

    setTimeout(() => {
      this.name = this.localName

      this.loading = false
      this.closeEdit()
    }, 1000)
  }
}
</script>
