<template>
  <div class="nft-form" @drop.prevent="dragFile" @dragover.prevent>
    <form>
      <input
        v-model="title"
        type="text"
        placeholder="Enter post title"
        class="creat-post-form__title"
      />

      <div class="creat-post-form__cont">
        <textarea
          v-model="text"
          class="creat-post-form__text"
          placeholder="Enter post text"
        ></textarea>

        <upload-file
          ref="upload-file"
          :file="file"
          @onFileUpdate="fileUpdateHandler"
        />

        <attributes
          ref="attributes"
          :attributes="attributes"
          @change="attributesChangeHandler"
        />

        <div class="creat-post-form__bottom">
          <div class="creat-post-form__icons">
            <a
              href="#"
              class="creat-post-form__icon"
              title="Upload audio"
              @click.prevent="uploadFile('audio')"
            >
              <icon type="upload_audio" />
            </a>
            <a
              href="#"
              class="creat-post-form__icon"
              title="Upload image"
              @click.prevent="uploadFile('image')"
            >
              <icon type="upload_image" />
            </a>
            <a
              href="#"
              class="creat-post-form__icon"
              title="Upload video"
              @click.prevent="uploadFile('video')"
            >
              <icon type="upload_video" />
            </a>
            <a
              href="#"
              class="creat-post-form__icon"
              title="Setting additional fields"
              @click.prevent="openAttributes"
            >
              <icon type="attributes" />
            </a>
          </div>
          <div class="creat-post-form__btns">
            <a
              href="#"
              class="creat-post-form__cancel"
              @click.prevent="onCanceled"
            >
              Cancel
            </a>
            <button
              type="button"
              class="profile__add btn_profile btn btn_blue"
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
                <img src="@/assets/img/profile__add_img.svg" alt="" />
                <span> {{ isSendTo ? 'Send' : 'Create' }} </span>
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
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'nuxt-property-decorator'
import { Inject } from 'vue-typedi'
import { useStore } from 'vuex-simple'
import { validateForm, getAdaptedAttributes } from './utils'
import { IAttributesFront } from './types'
import NFTFormFile from './NFTFormFile.vue'
import NFTFormAttributes from './attributes/NFTFormAttributes.vue'
import Icon from '~/components/icons/Icon.vue'
import NFTService from '~/logic/nft/services'
import tokens from '~/logic/tokens'
import TypedStore from '~/logic/store'

@Component({
  components: {
    'upload-file': NFTFormFile,
    attributes: NFTFormAttributes,
    icon: Icon
  }
})
export default class NFTForm extends Vue {
  public typedStore: TypedStore = useStore(this.$store)

  loading = false
  text = ''
  title = ''
  attributes: IAttributesFront = {}
  file: File | null = null

  @Prop({ type: Boolean, default: false })
  readonly isSendTo!: boolean

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

  @Emit('canceled')
  onCanceled() {
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

  submit() {
    if (!this.validateFormWithNotify()) {
      return
    }

    // create NFT

    const nft = {
      name: this.title,
      description: this.text,
      file: this.file,
      attributes: getAdaptedAttributes(this.attributes)
    }

    this.loading = true

    this.nftService.createNFT({
      params: {
        nft,
        address: this.isSendTo
          ? this.typedStore.address.address
          : this.typedStore.auth.selectedAddress,
        from: this.typedStore.auth.selectedAddress
      },
      callback: ({ status, message, txHash }) => {
        const titleTx = txHash || 'Unknown hash'

        switch (status) {
          case 'pending':
            this.$notify({
              type: 'info',
              title: message
            })
            break

          case 'error':
            this.$notify({
              type: 'error',
              title: message
            })

            this.loading = false
            break

          case 'pendingTx':
            this.$notify({
              type: 'info',
              title: titleTx,
              text: 'Transaction on pending'
            })
            break

          case 'successTx':
            this.$notify({
              type: 'success',
              title: titleTx,
              text: 'Transaction completed'
            })

            if (this.loading) {
              this.loading = false
              this.resetForm()
              this.onSubmited()
            }
            break

          case 'errorTx':
            this.$notify({
              type: 'error',
              title: titleTx,
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
