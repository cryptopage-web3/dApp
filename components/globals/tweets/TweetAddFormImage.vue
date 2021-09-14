<template>
  <div>
    <input
      id="file"
      ref="file"
      style="display: none"
      type="file"
      name="file"
      @change="fileUpdateHandler"
    />
    <div
      v-if="!!imageSrc || !!videoSrc"
      class="tweet-add__image d-flex justify-center align-start"
    >
      <div
        class="tweet-add__image-delete d-flex justify-center align-center"
        @click="fileDeleteHandler"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path
              d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
            />
          </g>
        </svg>
      </div>
      <img v-if="!!imageSrc" :src="imageSrc" class="img-block" />
      <video v-if="!!videoSrc" class="video-block" controls>
        <source :src="videoSrc" :type="fileType" />
      </video>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    fileType: {
      type: String,
      default: ''
    },
    imageSrc: {
      type: String,
      default: ''
    },
    videoSrc: {
      type: String,
      default: ''
    }
  },
  methods: {
    fileDeleteHandler() {
      this.$emit('onFileUpdate', null)
      this.$emit('onMinHeightUpdate', 100)
    },
    fileUpdateHandler() {
      const file = this.$refs.file.files[0]
      this.$emit('onFileUpdate', file)
      this.$emit('onMinHeightUpdate', 100)
    }
  }
}
</script>
<style scoped>
.video-block {
  margin: auto;
  height: 280px;
  width: 100%;
}
.img-block {
  margin: auto;
}
</style>
