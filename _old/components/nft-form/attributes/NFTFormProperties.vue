<template>
  <div class="nft-form__attribute">
    <div class="nft-form__attribute-header" @click="toggle">
      <div
        ref="icon"
        class="nft-form__attribute-header-icon"
        title="Textual traits that show up as rectangles"
      >
        <font-awesome-icon :icon="['fas', 'tag']" />
      </div>
      <div class="nft-form__attribute-header-title">Properties</div>
      <div class="nft-form__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
    <div v-show="isShow" class="nft-form__attribute-container">
      <property
        v-for="property in localProperties"
        :key="property.id"
        :property="property"
        @remove="removeProperty(property.id)"
        @change="propertyChangeHandler(property.id, $event)"
      />
      <div
        class="nft-form__property nft-form__property_add"
        @click="addProperty"
      >
        <font-awesome-icon :icon="['fas', 'plus-circle']" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'nuxt-property-decorator'
import { IAttributeProperty, IAttributePropertyFields } from '../types'
import NFTFormProperty from './NFTFormProperty.vue'

@Component({
  components: {
    property: NFTFormProperty
  }
})
export default class NFTFormProperties extends Vue {
  isShow = false
  localProperties: IAttributeProperty[] = []

  $refs!: {
    icon: HTMLDivElement
  }

  @Prop({ type: Array, default: () => [] })
  readonly properties!: IAttributeProperty[]

  // emit

  @Emit('change')
  emitChangeProperties(properties: IAttributeProperty[]) {
    return properties
  }

  // watch

  @Watch('properties', { immediate: true })
  onPropertiesChanged(properties: IAttributeProperty[]) {
    if (JSON.stringify(properties) === JSON.stringify(this.localProperties)) {
      return
    }

    this.localProperties = properties
  }

  @Watch('localProperties')
  onLocalPropertiesChanged(properties: IAttributeProperty[]) {
    this.emitChangeProperties(properties)
  }

  mounted() {
    this.$nextTick(() => {
      ;($(this.$refs.icon) as any).tooltip({
        trigger: 'hover'
      })
    })
  }

  // methods

  toggle() {
    this.isShow = !this.isShow
  }

  hide() {
    this.isShow = false
  }

  show() {
    this.isShow = true
  }

  addProperty() {
    this.localProperties.push({
      id: Number(new Date()),
      type: '',
      value: ''
    })
  }

  removeProperty(propertyId: number) {
    this.localProperties = this.localProperties.filter(
      ({ id }) => id !== propertyId
    )
  }

  propertyChangeHandler(propertyId: number, data: IAttributePropertyFields) {
    this.localProperties = this.localProperties.map((item) =>
      item.id === propertyId
        ? {
            ...item,
            type: data.type,
            value: data.value
          }
        : item
    )
  }
}
</script>
