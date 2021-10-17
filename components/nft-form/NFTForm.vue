<template>
  <div class="nft-form" @drop.prevent="dragFile" @dragover.prevent>
    <form>
      <div class="nft-form__field">
        <input
          v-model="title"
          class="nft-form__text"
          placeholder="Enter post title"
        />
      </div>

      <div class="nft-form__field">
        <textarea
          v-model="text"
          class="nft-form__textarea"
          placeholder="Enter post text"
        ></textarea>
      </div>

      <upload-file
        ref="upload-file"
        :file="file"
        @onFileUpdate="fileUpdateHandler"
      />

      <div class="nft-form__controls">
        <a
          href="#"
          class="nft-form__control"
          title="Upload audio"
          @click.prevent="uploadFile"
        >
          <img src="@/assets/img/creat-post-link_img1.png" alt="" />
        </a>
        <a
          href="#"
          class="nft-form__control"
          title="Upload image"
          @click.prevent="uploadFile"
        >
          <img src="@/assets/img/creat-post-link_img2.png" alt="" />
        </a>
        <a
          href="#"
          class="nft-form__control"
          title="Upload video"
          @click.prevent="uploadFile"
        >
          <img src="@/assets/img/creat-post-link_img3.png" alt="" />
        </a>
        <a
          href="#"
          class="nft-form__control"
          title="Setting additional fields"
          @click.prevent="uploadFile"
        >
          <font-awesome-icon :icon="['fas', 'cog']" />
        </a>
      </div>

      <attributes
        ref="attributes"
        :attributes="attributes"
        @change="attributesChangeHandler"
      />

      <div class="nft-form__buttons">
        <div class="nft-form__post-links">
          <a class="post-link post-link_blue" @click="uploadFile">
            <div>
              <icon type="uploadImage" />
            </div>
          </a>
          <comment-checkbox v-model="hasComment" />
        </div>
        <div class="nft-form__send">
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
</template>

<script>
import { validateForm, getAdaptedAttributes } from '@/utils/tweetForm'

export default {
  components: {
    'comment-checkbox': async () =>
      await import('@/components/nft-form/NFTFormComment'),
    'upload-file': async () =>
      await import('@/components/nft-form/NFTFormFile'),
    attributes: async () =>
      await import('@/components/nft-form/attributes/NFTFormAttributes'),
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
  mounted() {
    $('.nft-form__control').tooltip()
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

    uploadFile() {
      this.$refs['upload-file'].upload()
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
          text: 'Please upload only image, audio or video'
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
      const result = validateForm({
        title: this.title,
        text: this.text,
        attributes: this.attributes
      })

      if (!result.status) {
        this.$notify({
          type: 'error',
          title: result.error || 'Invalid data'
        })

        return false
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
        attributes: getAdaptedAttributes(this.attributes),
        [this.isMediaFile ? 'animation_url' : 'image']:
          fileHash && `https://ipfs.io/ipfs/${fileHash}`
      }

      const ipfs = await this.$ipfs
      const file = await ipfs.add(JSON.stringify(nft))
      await ipfs.pin.add(file.path)

      return file.path
    },

    sendPostHash(ipfsHash) {
      const self = this // eslint-disable-line @typescript-eslint/no-this-alias
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
              text: 'Transaction on pending'
            })
          },
          onReceipt() {
            self.$notify({
              type: 'success',
              title: txHash || 'Unknown hash',
              text: 'Transaction completed'
            })
          },
          onError() {
            self.$notify({
              type: 'error',
              title: txHash || 'Unknown hash',
              text: 'Transaction has some error'
            })
          }
        }
      })
    }
  }
}
</script>
