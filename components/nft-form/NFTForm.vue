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
          @click.prevent="uploadFile('audio')"
        >
          <img src="@/assets/img/creat-post-link_img1.png" alt="" />
        </a>
        <a
          href="#"
          class="nft-form__control"
          title="Upload image"
          @click.prevent="uploadFile('image')"
        >
          <img src="@/assets/img/creat-post-link_img2.png" alt="" />
        </a>
        <a
          href="#"
          class="nft-form__control"
          title="Upload video"
          @click.prevent="uploadFile('video')"
        >
          <img src="@/assets/img/creat-post-link_img3.png" alt="" />
        </a>
        <a
          href="#"
          class="nft-form__control"
          title="Setting additional fields"
          @click.prevent="openAttributes"
        >
          <font-awesome-icon :icon="['fas', 'cog']" />
        </a>
      </div>

      <attributes
        ref="attributes"
        :attributes="attributes"
        @change="attributesChangeHandler"
      />

      <div class="creat-post-bottom">
        <button
          type="button"
          class="btn btn_blue btn_creat-post"
          :disabled="loading"
          @click="submit"
        >
          <template v-if="loading">
            <span
              class="spinner-border spinner-border-sm creat-post-bottom__spinner"
              role="status"
              aria-hidden="true"
            ></span>
            <span> {{ isSendTo ? 'Sending...' : 'Creating...' }} </span>
          </template>
          <template v-else>
            <img src="@/assets/img/btn_creat-post_img.png" alt="" />
            <span> {{ isSendTo ? 'Send NFT' : 'Create NFT' }} </span>
          </template>
        </button>
        <div
          v-if="loading"
          class="creat-post-bottom__continue"
          @click="createNext"
        >
          Create next
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'nuxt-property-decorator'
import { Inject } from 'vue-typedi'
import { validateForm, getAdaptedAttributes } from './utils'
import { IAttributesFront, INFTServer } from './types'
import NFTFormFile from './NFTFormFile.vue'
import NFTFormAttributes from './attributes/NFTFormAttributes.vue'
import NFTService from '~/logic/nft/services'
import tokens from '~/logic/tokens'
import { INotifyParams } from '~/types'

@Component({
  components: {
    'upload-file': NFTFormFile,
    attributes: NFTFormAttributes
  }
})
export default class NFTForm extends Vue {
  loading = false
  text = ''
  title = ''
  attributes: IAttributesFront = {}
  file: File | null = null

  @Prop({ type: Boolean, default: false })
  readonly isSendTo!: boolean

  $notify!: (params: INotifyParams) => void
  $refs!: {
    attributes: any
    'upload-file': any
  }

  @Inject(tokens.NFT_SERVICE)
  public nftService!: NFTService

  get isMediaFile(): boolean {
    if (!this.file) {
      return false
    }

    const fileType = this.file.type.split('/')[0]

    return /(audio|video)/.test(fileType)
  }

  @Watch('loading')
  onLoadingChanged(loading: boolean) {
    if (loading) {
      this.$nuxt.$loading.start()
    } else {
      this.$nuxt.$loading.finish()
    }
  }

  @Emit('submited')
  onSubmited() {
    return true
  }

  mounted() {
    ;($('.nft-form__control') as any).tooltip({
      trigger: 'hover'
    })
  }

  fileUpdateHandler(file?: File | null) {
    if (!file) {
      this.file = null
      return
    }

    if (!this.validateFileWithNotify(file)) {
      return
    }

    this.file = file
  }

  openAttributes() {
    this.$refs.attributes.toggle()
  }

  uploadFile(type: string) {
    this.$refs['upload-file'].upload(type)
  }

  dragFile(event: DragEvent) {
    const file = event.dataTransfer?.files[0]

    if (!file || !this.validateFileWithNotify(file)) {
      return
    }

    this.file = file
  }

  validateFileWithNotify(file: File): boolean {
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
  }

  attributesChangeHandler(attributes: IAttributesFront) {
    this.attributes = attributes
  }

  resetForm() {
    this.title = ''
    this.text = ''
    this.file = null
    this.attributes = {}
    this.$refs.attributes.hideAll()
  }

  createNext() {
    this.loading = false
    this.resetForm()
    this.onSubmited()
  }

  validateFormWithNotify(): boolean {
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
  }

  async submit() {
    if (!this.validateFormWithNotify()) {
      return
    }

    this.loading = true

    // get ipfs hash

    const ipfsHash = await this.getFormIPFSHash()

    this.$notify({
      type: 'success',
      title: `IPFS hash received`
    })

    // send to contract

    this.sendPostHash(ipfsHash)
  }

  async getFileIPFSHash(): Promise<string> {
    const ipfs = await (this as any).$ipfs
    const file = await ipfs.add(this.file)
    await ipfs.pin.add(file.path)
    return file.path
  }

  async getFormIPFSHash() {
    const fileHash = this.file ? await this.getFileIPFSHash() : null

    const nft: INFTServer = {
      name: this.title,
      description: this.text,
      attributes: getAdaptedAttributes(this.attributes),
      [this.isMediaFile ? 'animation_url' : 'image']:
        fileHash && `https://ipfs.io/ipfs/${fileHash}`
    }

    const ipfs = await (this as any).$ipfs
    const file = await ipfs.add(JSON.stringify(nft))
    await ipfs.pin.add(file.path)

    return file.path
  }

  sendPostHash(ipfsHash: string) {
    this.nftService.sendNFTHash({
      params: {
        address: this.isSendTo
          ? this.$store.getters['address/address']
          : this.$store.getters['auth/selectedAddress'],
        from: this.$store.getters['auth/selectedAddress'],
        hash: ipfsHash
      },
      callback: ({ status, txHash }) => {
        const title = txHash || 'Unknown hash'

        switch (status) {
          case 'pending':
            this.$notify({
              type: 'info',
              title,
              text: 'Transaction on pending'
            })
            break

          case 'success':
            this.$notify({
              type: 'success',
              title,
              text: 'Transaction completed'
            })

            if (this.loading) {
              this.loading = false
              this.resetForm()
              this.onSubmited()
            }
            break

          case 'error':
            this.$notify({
              type: 'error',
              title,
              text: 'Transaction has some error'
            })

            this.loading = false
            break
        }
      }
    })
  }
}
</script>
