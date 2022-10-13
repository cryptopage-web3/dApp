<template>
  <div class="form-creat-bottom">
    <input
      ref="refFile"
      style="display: none"
      type="file"
      name="file"
      :accept="accept"
      @change="update"
    />

    <div v-if="file" class="form-creat-avatar mt_20 mb_20">
      <div class="form-creat-avatar__thumb">
        <video v-if="fileType === 'video'" controls>
          <source :src="fileLink" />
        </video>
        <audio v-else-if="fileType === 'audio'" controls>
          <source :src="fileLink" />
        </audio>
        <img v-else :src="fileLink" alt="" />
      </div>
      <a href="#" class="form-creat-files-item__close" @click.prevent="remove">
        <img src="@/assets/img/form-creat-files-item_close_img.svg" alt="" />
      </a>
    </div>

    <div class="form-creat-nav">
      <a
        href="#"
        class="form-creat-nav-item stroke"
        @click.prevent="uploadFile('audio')"
      >
        <NftFormAudioIcon />
      </a>
      <a
        href="#"
        class="form-creat-nav-item all"
        @click.prevent="uploadFile('image')"
      >
        <NftFormImageIcon />
      </a>
      <a
        href="#"
        class="form-creat-nav-item all"
        @click.prevent="uploadFile('video')"
      >
        <NftFormVideoIcon />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import NftFormAudioIcon from '~/components/icon/nft-form/NftFormAudioIcon.vue';
import NftFormImageIcon from '~/components/icon/nft-form/NftFormImageIcon.vue';
import NftFormVideoIcon from '~/components/icon/nft-form/NftFormVideoIcon.vue';
import { nftFormModule } from '~/store';

@Component({
  components: {
    NftFormAudioIcon,
    NftFormImageIcon,
    NftFormVideoIcon,
  },
})
export default class NftFormFile extends Vue {
  accept = '';

  $refs!: {
    refFile: HTMLInputElement;
  };

  get file(): File | null {
    return nftFormModule.values.file;
  }

  get fileType(): string | null {
    return this.file ? this.file.type.split('/')[0] : null;
  }

  get fileLink(): string | null {
    return this.file ? window.URL.createObjectURL(this.file) : null;
  }

  uploadFile(type = 'image') {
    switch (type) {
      case 'image':
        this.accept = '.jpg, .jpeg, .png, .gif, .svg';
        break;

      case 'video':
        this.accept = '.mp4, .webm';
        break;

      case 'audio':
        this.accept = '.mp3, .wav, .webm';
        break;

      default:
        this.accept = '';
        break;
    }

    this.$nextTick(() => {
      this.$refs.refFile.click();
    });
  }

  update() {
    const file = this.$refs.refFile.files?.[0] || null;

    this.save(file);
  }

  save(file: File | null) {
    if (!this.validateFileWithNotify(file)) {
      return;
    }

    /** браузер кеширует тег и не обновляет его при смене выбранного аудио или видео */
    nftFormModule.setFile(null);

    setTimeout(() => {
      nftFormModule.setFile(file);
    }, 500);
  }

  remove() {
    nftFormModule.setFile(null);
  }

  validateFileWithNotify(file: File | null): boolean {
    if (!file) {
      return false;
    }

    const fileType = file.type.split('/')[0];

    if (!/(image|video|audio)/.test(fileType)) {
      this.$notify({
        type: 'error',
        title: 'Invalid file extension',
        text: 'Please upload only image, audio or video',
      });

      return false;
    }

    return true;
  }
}
</script>
