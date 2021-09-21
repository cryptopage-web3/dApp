<template>
  <div>
    <input
      ref="file"
      style="display: none"
      type="file"
      name="file"
      @change="fileUpdateHandler"
    />
    <div
      v-if="fileURL"
      class="tweet-add__image d-flex justify-center align-start"
    >
      <div
        class="tweet-add__image-delete d-flex justify-center align-center"
        @click="fileDeleteHandler"
      >
        <icon type="close" />
      </div>
      <video v-if="fileType === 'video'" class="video-block" controls>
        <source :src="fileURL" />
      </video>
      <img v-else :src="fileURL" class="img-block" />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    Icon: async () => await import('@/components/icons/Icon')
  },
  props: {
    file: {
      default: null
    }
  },
  data() {
    return {
      fileURL: null
    }
  },
  computed: {
    fileType() {
      return this.file ? this.file.type.split('/')[0] : null
    }
  },
  watch: {
    file: {
      handler(file) {
        this.fileURL = file ? window.URL.createObjectURL(file) : null
      },
      immediate: true
    }
  },
  methods: {
    upload() {
      this.$refs.file.click()
    },

    fileDeleteHandler() {
      this.$emit('onFileUpdate', null)
      this.$refs.file.value = ''
    },

    fileUpdateHandler() {
      const file = this.$refs.file.files[0]
      this.$emit('onFileUpdate', file)
    }
  }
}
</script>
<style scoped>
.img-block {
  margin: auto;
}

.video-block {
  margin: auto;
  height: 280px;
  width: 100%;
  z-index: 1;
}
</style>
