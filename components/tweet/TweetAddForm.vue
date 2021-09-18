<template>
  <div
    class="tweet-add d-flex align-start justify-space-between"
    @drop.prevent="dragFile"
    @dragover.prevent
  >
    <div class="tweet-add__form d-flex flex-column">
      <form>
        <tweet-message v-model="text" />
        <tweet-image
          ref="upload-image"
          :file="file"
          @onFileUpdate="fileUpdateHandler"
        />
        <tweet-buttons
          :disabled="loading"
          @onImageClick="uploadImage"
          @onButtonSubmit="submit"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'tweet-message': async () =>
      await import('@/components/tweet/TweetAddFormMessage'),
    'tweet-image': async () =>
      await import('@/components/tweet/TweetAddFormImage'),
    'tweet-buttons': async () =>
      await import('@/components/tweet/TweetAddFormButtons')
  },
  data() {
    return {
      loading: true,
      text: '',
      file: null
    }
  },
  methods: {
    fileUpdateHandler(file) {
      if (!file) {
        this.file = null
        return
      }

      const fileType = file.type.split('/')[0]

      if (fileType !== 'image') {
        this.$notify({
          type: 'error',
          title: 'Invalid file extension',
          text: `<div class="notification-content__mt">Please upload only image</div>`
        })

        return
      }

      this.file = file
    },

    uploadImage() {
      this.$refs['upload-image'].upload()
    },

    dragFile(event) {
      const file = event.dataTransfer.files[0]
      const fileType = file.type.split('/')[0]

      if (fileType !== 'image') {
        this.$notify({
          type: 'error',
          title: 'Invalid file extension',
          text: `<div class="notification-content__mt">Please upload only image</div>`
        })

        return
      }

      this.file = file
    },

    async getFileIPFSHash() {
      const ipfs = await this.$ipfs
      const file = await ipfs.add(this.file)
      await ipfs.pin.add(file.path)
      return file.path
    },

    async getFormIPFSHash() {
      const fileHash = this.file ? await this.getFileIPFSHash() : null
      const nft = {
        name: this.text,
        externalLink: '',
        description: '',
        file: fileHash,
        collection: this.collection,
        properties: this.properties,
        levels: this.levels,
        stats: []
      }

      const ipfs = await this.$ipfs
      const file = await ipfs.add(JSON.stringify(nft))
      await ipfs.pin.add(file.path)

      return file.path
    },

    async submit() {
      this.$nuxt.$loading.start()
      const ipfsHash = await this.getFormIPFSHash()
      console.log('IPFS path', ipfsHash) // eslint-disable-line no-console
      this.text = ''
      Object.assign(this.$data, this.$options.data.apply(this))
      setTimeout(() => this.$nuxt.$loading.finish(), 500)

      this.$notify({
        type: 'success',
        title: `IPFS path ${ipfsHash}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tweet-add__form {
  width: 100%;
}
</style>
