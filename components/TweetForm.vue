<template>
  <form class="form">
    <img
      style="cursor: pointer"
      :alt="image.alt"
      :height="image.height"
      :width="image.width"
      :src="image.src"
      @click="$refs.image.click()"
    />
    <input
      id="image"
      ref="image"
      style="display: none"
      type="file"
      accept="image/*"
      name="image"
      @change="handleFileUpload()"
    />
    <textarea v-model="text" class="textarea" />
    <btn @onSubmit="submit" />
  </form>
</template>
<script>
export default {
  data: () => ({
    text: '',
    image: {
      alt: '',
      height: 200,
      width: 200,
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
    },
    loading: false
  }),
  methods: {
    handleFileUpload() {
      const reader = new FileReader()
      const file = this.$refs.image.files[0]
      const image = this.image
      reader.onloadend = function () {
        image.src = reader.result
      }
      reader.readAsDataURL(file)
    },
    async submit() {
      const ipfs = await this.$ipfs
      const data = { text: this.text, image: this.image }
      const file = await ipfs.add(JSON.stringify(data))
      console.log('IPFS path', file.path) // eslint-disable-line no-console
      await ipfs.pin.add(file.path)
      this.text = ''
    }
  }
}
</script>
<style>
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
  margin-top: 100px;
}
.textarea {
  width: 250px;
  height: 150px;
  margin-bottom: 10px;
  margin-top: 10px;
  resize: none;
}
</style>
