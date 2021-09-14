<template>
  <div
    class="tweet-add d-flex align-start justify-space-between"
    @drop.prevent="dragFile"
    @dragover.prevent
  >
    <div
      class="tweet-add__form d-flex flex-column"
      :class="disabled ? `` : `disabled`"
    >
      <form>
        <tweet-message
          :disabled="disabled"
          :min-height="100"
          @onMessageUpdate="text = $event"
        />
        <draggable v-model="properties" draggable=".property">
          <div
            v-for="property in properties"
            :key="property.id"
            class="property"
          >
            <input
              v-model="property.type"
              type="text"
              name="type"
              required
              placeholder="Type"
            />
            <input
              v-model="property.value"
              type="text"
              name="value"
              required
              placeholder="Value"
            />
          </div>
        </draggable>
        <draggable v-model="levels" draggable=".level">
          <div v-for="level in levels" :key="level.id" class="level">
            <input
              v-model="level.name"
              type="text"
              name="level"
              required
              placeholder="Speed"
            />
            <input
              v-model="level.min"
              type="number"
              name="min"
              :max="`${level.max - 1}`"
              min="0"
              required
              style="width: 50px"
              @input="validateMin(level)"
            />
            <input
              v-model="level.max"
              type="number"
              :min="`${level.min + 1}`"
              name="max"
              style="width: 50px"
              required
              @input="validateMax(level)"
            />
          </div>
        </draggable>
        <tweet-image
          :file="file"
          :image-src="imageSrc"
          :video-src="videoSrc"
          @onFileUpdate="fileHandler"
          @onMinHeightUpdate="minHeight = $event"
        />
        <tweet-buttons
          :disabled="disabled"
          @onImageClick="imageClickHandler"
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
      await import('@/components/globals/tweets/TweetAddFormMessage'),
    'tweet-image': async () =>
      await import('@/components/globals/tweets/TweetAddFormImage'),
    'tweet-buttons': async () =>
      await import('@/components/globals/tweets/TweetAddFormButtons'),
    draggable: async () => await import('vuedraggable')
  },
  props: {
    settings: {
      type: Object,
      default: () => ({
        strokeWidth: 100,
        strokeColor: 'black',
        minHeight: 50,
        radius: 100,
        maxCount: 25
      })
    }
  },
  data() {
    return {
      text: '',
      file: null,
      fileType: '',
      imageSrc: null,
      videoSrc: null,
      minHeight: this.settings.minHeight,
      maxCount: 256,
      collection: '',
      properties: [
        {
          id: 0,
          type: '',
          value: ''
        }
      ],
      levels: [
        {
          id: 0,
          name: '',
          min: 3,
          max: 5
        }
      ],
      unlocked: false,
      explicit: false,
      supply: 1,
      blockchain: 'Ethereum'
    }
  },
  computed: {
    disabled() {
      const validText = this.text.length > 0 && this.text.length < this.maxCount
      return validText
    },
    fullProperties() {
      return this.properties.filter((p) => p.type && p.value)
    },
    fullLevels() {
      return this.levels.filter((l) => l.name && l.min && l.max)
    }
  },
  watch: {
    fullProperties(properties) {
      if (properties.length === this.properties.length) {
        this.addProperty()
      } else if (properties.length + 1 < this.properties.length) {
        this.removeProperty()
      }
      return properties
    },
    fullLevels(levels) {
      if (levels.length === this.levels.length) {
        this.addLevel()
      } else if (levels.length + 1 < this.levels.length) {
        this.removeLevel()
      }
      return levels
    }
  },
  methods: {
    validateMin(level) {
      level.min = Number(level.min)
      if (level.min <= 0) level.min = 0
      if (level.min > level.max) level.min = level.max - 1
    },
    validateMax(level) {
      if (level.max <= level.min) level.max = level.min + 1
    },
    removeLevel() {
      for (let i = this.levels.length; i > 0; i++) {
        const level = this.levels[i]
        if (!!level && !level.name && !level.min && !level.max) {
          this.levels.splice(i, 1)
          break
        }
      }
    },
    addLevel() {
      this.levels.push({
        id: this.levels.length,
        name: '',
        min: 3,
        max: 5
      })
    },
    removeProperty() {
      for (let i = this.properties.length; i > 0; i--) {
        const property = this.properties[i]
        if (!!property && !property.type && !property.value) {
          this.properties.splice(i, 1)
          break
        }
      }
    },
    addProperty() {
      this.properties.push({
        id: this.properties.length,
        type: '',
        name: ''
      })
    },
    fileHandler(file) {
      this.file = file
      this.videoSrc = this.imageSrc = null
      if (this.file) {
        this.fileType = this.file.type.split('/')[0]
        const fileURL = window.URL.createObjectURL(this.file)
        if (this.fileType === 'image') {
          this.imageSrc = fileURL
        } else if (this.fileType === 'video') {
          this.videoSrc = fileURL
        }
      }
    },
    imageClickHandler() {
      document.getElementById('file').click()
    },
    dragFile(event) {
      console.log('event', event.dataTransfer) // eslint-disable-line no-console
      this.file = event.dataTransfer.files[0]
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
        stats: [],
        unlocked: this.unlocked,
        explicit: this.explicit,
        supply: this.supply
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
      document.getElementById('input').innerHTML = ''
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
