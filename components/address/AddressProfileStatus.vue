<template>
  <div class="profile-status__container">
    <div v-if="!isOwner" class="profile-status">Status: {{ status }}</div>
    <template v-else>
      <div v-show="!isEdit" class="profile-status">
        Status: <a href="#" @click.prevent="showEdit">{{ status }}</a>
      </div>
      <form v-show="isEdit">
        <div
          class="profile-status__edit"
          :class="{
            'profile-status__edit_loading': loading
          }"
        >
          <input
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

@Component({})
export default class AddressProfileStatus extends Vue {
  isEdit = false
  loading = false
  status = 'Hello, World!'
  localStatus = ''
  clickOutsideListener: ((event: JQuery.ClickEvent) => void) | null = null

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
