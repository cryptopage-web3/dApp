<template>
  <div>
    <input
      ref="file"
      style="display: none"
      type="file"
      name="file"
      :accept="accept"
      @change="fileUpdateHandler"
    />
    <div
      v-if="fileURL"
      class="nft-form__file"
      :class="{
        'nft-form__file_video': fileType === 'video',
        'nft-form__file_audio': fileType === 'audio'
      }"
    >
      <div class="nft-form__file-delete" @click="fileDeleteHandler">
        <icon type="close" />
      </div>
      <video v-if="fileType === 'video'" controls>
        <source :src="fileURL" />
      </video>
      <audio v-else-if="fileType === 'audio'" controls>
        <source :src="fileURL" />
      </audio>
      <img v-else :src="fileURL" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'nuxt-property-decorator'

@Component({
  components: {
    icon: async () => await import('@/components/icons/Icon.vue')
  }
})
export default class NFTFormFile extends Vue {
  fileURL: string | null = null
  accept = ''

  $refs!: {
    file: HTMLInputElement
  }

  @Prop({ default: null }) readonly file!: File

  get fileType(): string | null {
    return this.file ? this.file.type.split('/')[0] : null
  }

  @Watch('file', { immediate: true })
  onFileChanged(file: File) {
    this.fileURL = file ? window.URL.createObjectURL(file) : null
  }

  upload(type = 'image') {
    switch (type) {
      case 'image':
        this.accept = '.jpg, .jpeg, .png, .gif, .svg'
        break

      case 'video':
        this.accept = '.mp4, .webm'
        break

      case 'audio':
        this.accept = '.mp3, .wav, .webm'
        break

      default:
        this.accept = ''
        break
    }

    this.$nextTick(() => {
      this.$refs.file.click()
    })
  }

  fileDeleteHandler() {
    this.$emit('onFileUpdate', null)
    this.$refs.file.value = ''
  }

  fileUpdateHandler() {
    const file = this.$refs.file.files?.[0] || null
    this.$emit('onFileUpdate', file)
  }
}
</script>
