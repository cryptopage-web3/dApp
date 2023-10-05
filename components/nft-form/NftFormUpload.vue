<template>
  <div>
    <div class="form-creat-files" :class="{ active: file }">
      <div class="form-creat-files-item">
        <a
          href="#"
          class="form-creat-files-item__close"
          @click.prevent="remove"
        >
          <img src="@/assets/img/form-creat-files-item_close_img.svg" alt="" />
        </a>
        <div class="form-creat-files-item__thumb">
          <video v-if="fileType === 'video'" controls>
            <source :src="fileLink" />
          </video>
          <audio v-else-if="fileType === 'audio'" controls>
            <source :src="fileLink" />
          </audio>
          <img v-else :src="fileLink" alt="" />
        </div>
      </div>
    </div>

    <input
      ref="refFile"
      style="display: none"
      type="file"
      name="file"
      :accept="accept"
      @change="update"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';
import { MAX_FILE_SIZE } from '~/constants';

@Component({})
export default class NftFormUpload extends Vue {
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

  upload(type = 'image') {
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

    if (file.size > MAX_FILE_SIZE) {
      this.$notify({
        type: 'error',
        title: 'File size cannot exceed 5 Mb',
      });

      return false;
    }

    return true;
  }
}
</script>
