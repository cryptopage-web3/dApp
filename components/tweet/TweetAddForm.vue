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

        <attributes
          ref="attributes"
          :attributes="attributes"
          @change="attributesChangeHandler"
        />

        <div class="tweet-add__buttons">
          <div class="tweet-add__post-links">
            <a class="post-link post-link_blue" @click="uploadImage">
              <div>
                <icon type="uploadImage" />
              </div>
            </a>
            <comment-checkbox v-model="hasComment" />
          </div>
          <div class="tweet-add__send">
            <button
              type="button"
              class="post-follow-top__link btn btn_blue btn_blue--bg"
              :disabled="loading || !text || !title"
              @click="submit"
            >
              Send crypto-post
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'text-field': async () =>
      await import('@/components/tweet/TweetAddFormMessage'),
    'comment-checkbox': async () =>
      await import('@/components/tweet/TweetAddFormComment'),
    'upload-image': async () =>
      await import('@/components/tweet/TweetAddFormImage'),
    attributes: async () =>
      await import('@/components/tweet/attributes/TweetAddFormAttributes'),
    icon: async () => await import('@/components/icons/Icon')
  },
  data() {
    return {
      loading: false,
      text: '',
      title: '',
      hasComment: false,
      attributes: {},
      file: null
    }
  },
  computed: {
    isMediaFile() {
      if (!this.file) {
        return false
      }

      const fileType = this.file.type.split('/')[0]

      return /(audio|video)/.test(fileType)
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

      if (!/(image|video|audio)/.test(fileType)) {
        this.$notify({
          type: 'error',
          title: 'Invalid file extension',
          text: `<div class="notification-content__mt">Please upload only image, audio or video</div>`
        })

        return false
      }

      return true
    },

    attributesChangeHandler(attributes) {
      this.attributes = attributes
    },

    resetForm() {
      this.title = ''
      this.text = ''
      this.file = null
      this.attributes = {}
      this.hasComment = false
      this.$refs.attributes.hide()
    },

    validateFormWithNotify() {
      if (!this.title) {
        this.$notify({
          type: 'error',
          title: 'Empty title'
        })
        return false
      }

      if (!this.text) {
        this.$notify({
          type: 'error',
          title: 'Empty text'
        })
        return false
      }

      if (this.attributes.properties?.length) {
        const hasEmptyField = this.attributes.properties.some(
          ({ type, value }) => !type || !value
        )

        if (hasEmptyField) {
          this.$notify({
            type: 'error',
            title: 'Empty field in properties'
          })
          return false
        }
      }

      if (this.attributes.levels?.length) {
        let levelError = ''

        this.attributes.levels.forEach(({ type, value, maxValue }) => {
          if (levelError) {
            return
          }

          if (!type || !value || !maxValue) {
            levelError = 'Empty field in levels'
            return
          }

          if (!isFinite(value) || !isFinite(maxValue)) {
            levelError = 'Value is not a number in levels'
            return
          }

          if (+maxValue < +value) {
            levelError = 'Value is greater than maximum in levels'
          }
        })

        if (levelError) {
          this.$notify({
            type: 'error',
            title: levelError
          })
          return false
        }
      }

      return true
    },

    async submit() {
      if (!this.validateFormWithNotify()) {
        return
      }

      this.loading = true

      // get ipfs hash

      const ipfsHash = await this.getFormIPFSHash()

      // send to contract

      this.sendPostHash(ipfsHash)

      // success

      this.loading = false
      this.resetForm()

      this.$notify({
        type: 'success',
        title: `IPFS hash received`
      })
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
        attributes: this.getAdaptedAttributes(),
        [this.isMediaFile ? 'animation_url' : 'image']:
          fileHash && `https://ipfs.io/ipfs/${fileHash}`
      }

      const ipfs = await this.$ipfs
      const file = await ipfs.add(JSON.stringify(nft))
      await ipfs.pin.add(file.path)

      return file.path
    },

    getAdaptedAttributes() {
      // преобразуем properties для nft

      const properties = (this.attributes.properties || []).map((property) => ({
        trait_type: property.type,
        value: property.value
      }))

      // преобразуем levels для nft

      const levels = (this.attributes.levels || []).map((level) => ({
        trait_type: level.type,
        value: +level.value,
        max_value: +level.maxValue
      }))

      return [...properties, ...levels]
    },

    sendPostHash(ipfsHash) {
      const self = this
      let txHash = ''

      this.$sendPostHash({
        params: {
          from: this.$store.getters['auth/selectedAddress'],
          hash: ipfsHash,
          comment: this.hasComment
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
