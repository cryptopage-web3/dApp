<template>
  <div
    class="tweet-add d-flex align-start justify-space-between"
    @drop.prevent="dragFile"
    @dragover.prevent
  >
    <div class="tweet-add__form d-flex flex-column">
      <form>
        <text-field
          v-model="title"
          :is-single-line="true"
          :placeholder="'Enter post title'"
        />
        <text-field v-model="text" :placeholder="'Enter post text'" />
        <upload-image
          ref="upload-image"
          :file="file"
          @onFileUpdate="fileUpdateHandler"
        />
        <buttons
          :disabled="loading || !text || !title"
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
    'text-field': async () =>
      await import('@/components/tweet/TweetAddFormMessage'),
    'upload-image': async () =>
      await import('@/components/tweet/TweetAddFormImage'),
    buttons: async () => await import('@/components/tweet/TweetAddFormButtons')
  },
  data() {
    return {
      loading: false,
      text: '',
      title: '',
      file: null
    }
  },
  watch: {
    loading(loading) {
      if (loading) {
        this.$nuxt.$loading.start()
      } else {
        this.$nuxt.$loading.finish()
      }
    }
  },
  methods: {
    fileUpdateHandler(file) {
      if (!file) {
        this.file = null
        return
      }

      if (!this.validateFileWithNotify(file)) {
        return
      }

      this.file = file
    },

    uploadImage() {
      this.$refs['upload-image'].upload()
    },

    dragFile(event) {
      const file = event.dataTransfer.files[0]

      if (!this.validateFileWithNotify(file)) {
        return
      }

      this.file = file
    },

    validateFileWithNotify(file) {
      if (!file) {
        return false
      }

      const fileType = file.type.split('/')[0]

      if (fileType !== 'image') {
        this.$notify({
          type: 'error',
          title: 'Invalid file extension',
          text: `<div class="notification-content__mt">Please upload only image</div>`
        })

        return false
      }

      return true
    },

    resetForm() {
      this.title = ''
      this.text = ''
      this.file = null
    },

    async submit() {
      this.loading = true

      // get ipfs hash

      const ipfsHash = await this.getFormIPFSHash()

      this.loading = false
      this.resetForm()

      this.$notify({
        type: 'success',
        title: `IPFS hash received`
      })

      // send to contract

      this.sendPostHash(ipfsHash)
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
        name: this.title,
        description: this.text,
        image: fileHash && `https://ipfs.io/ipfs/${fileHash}`
      }

      const ipfs = await this.$ipfs
      const file = await ipfs.add(JSON.stringify(nft))
      await ipfs.pin.add(file.path)

      return file.path
    },

    sendPostHash(ipfsHash) {
      const self = this
      let txHash = ''

      this.$sendPostHash({
        params: {
          from: this.$store.getters['auth/selectedAddress'],
          hash: ipfsHash,
          comment: false
        },
        callbacks: {
          onTransactionHash(hash) {
            txHash = hash

            self.$notify({
              type: 'info',
              title: txHash,
              text: `<div class="notification-content__mt">Transaction on pending</div>`
            })
          },
          onReceipt() {
            self.$notify({
              type: 'success',
              title: txHash || 'Unknown hash',
              text: `<div class="notification-content__mt">Transaction completed</div>`
            })
          },
          onError() {
            self.$notify({
              type: 'error',
              title: txHash || 'Unknown hash',
              text: `<div class="notification-content__mt">Transaction has some error</div>`
            })
          }
        }
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
