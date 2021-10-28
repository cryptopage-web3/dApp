<template>
  <div class="nft-form__attribute" @click="toggle">
    <div class="nft-form__attribute-header">
      <div
        ref="icon"
        class="nft-form__attribute-header-icon"
        title="Availability to add a comment"
      >
        <font-awesome-icon :icon="['fas', 'comments']" />
      </div>
      <div class="nft-form__attribute-header-title">Сomments</div>
      <div class="nft-form__attribute-header-arrow">
        <div
          class="nft-form__сomments-switch"
          :class="{ 'nft-form__сomments-switch_selected': value }"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'nuxt-property-decorator'

@Component({})
export default class NFTFormComment extends Vue {
  @Prop({ type: Boolean })
  readonly value!: boolean

  $refs!: {
    icon: HTMLDivElement
  }

  mounted() {
    this.$nextTick(() => {
      ;($(this.$refs.icon) as any).tooltip({
        trigger: 'hover'
      })
    })
  }

  toggle() {
    this.emitInput(!this.value)
  }

  @Emit('input')
  emitInput(value: boolean) {
    return value
  }
}
</script>
