<template>
  <div style="text-align: center">
    <div v-if="certificate">
      <p>Valid: {{ valid }}</p>
      <p>{{ certificate }}</p>
      <input
        v-model="gistURL"
        type="text"
        placeholder="Gist URL"
        name="gistURL"
      />
      <button @click="check">Check</button>
    </div>
    <div v-else>
      <input
        v-model="username"
        type="text"
        placeholder="GitHub username"
        name="username"
      />
      <input
        v-model="address"
        type="text"
        placeholder="Ethereum address"
        name="address"
      />
      <button @click="submit">Generate key</button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    gistURL:
      'https://gist.github.com/vladimirmyshkovski/2df865d684ec7ebde98cc73347b9a3aa',
    username: 'vladimirmyshkovski',
    address: 'asdasd',
    valid: false,
    certificate: '',
    vector: Buffer.from([
      249, 187, 71, 202, 22, 183, 113, 17, 93, 37, 22, 199, 206, 250, 2, 120
    ]) // window.crypto.getRandomValues(new Uint8Array(16))
  }),
  computed: {
    password() {
      return `${this.username}:${this.address}`
    }
  },
  async mounted() {
    await this.$nextTick(async () => {
      this.vector = Buffer.from(this.password)
      await this.submit()
      await this.check()
    })
  },
  methods: {
    stringToArrayBuffer(str) {
      const buff = new ArrayBuffer(str.length * 2) // Because there are 2 bytes for each char.
      const buffView = new Uint16Array(buff)
      for (let i = 0, strLen = str.length; i < strLen; i++) {
        buffView[i] = str.charCodeAt(i)
      }
      return buff
    },
    arrayBufferToString(buff) {
      return String.fromCharCode.apply(null, new Uint16Array(buff))
    },
    arrayBufferToBase64(arrayBuffer) {
      const byteArray = new Uint8Array(arrayBuffer)
      let byteString = ''
      for (let i = 0; i < byteArray.byteLength; i++) {
        byteString += String.fromCharCode(byteArray[i])
      }
      const b64 = window.btoa(byteString)

      return b64
    },
    base64ToArrayBuffer(base64) {
      const binaryString = window.atob(base64)
      const len = binaryString.length
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      return bytes.buffer
    },
    async generateKey(password) {
      try {
        password = this.stringToArrayBuffer(password)
        return await window.crypto.subtle.importKey(
          'raw',
          password,
          { name: 'PBKDF2' },
          false,
          ['deriveKey']
        )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`ERROR at generateKey with password ${password}`, error)
        return null
      }
    },
    async generateDeriveKey(key) {
      try {
        const salt = this.stringToArrayBuffer('salt')
        return await window.crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt, iterations: 500, hash: 'SHA-256' },
          key,
          {
            name: 'AES-GCM',
            length: 128
          },
          false,
          ['encrypt', 'decrypt']
        )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`ERROR at generateKey with key ${key}`, error)
        return null
      }
    },
    async encrypt(deriveKey, secretMessage, vector = this.vector) {
      try {
        secretMessage = this.stringToArrayBuffer(secretMessage)
        return await window.crypto.subtle.encrypt(
          { name: 'AES-GCM', iv: vector },
          deriveKey,
          secretMessage
        )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `ERROR at encrypt with deriveKey ${deriveKey} and secretMessage ${secretMessage}`,
          error
        )
        return null
      }
    },
    async decrypt(deriveKey, encrypt, vector = this.vector) {
      try {
        return await window.crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: vector },
          deriveKey,
          encrypt
        )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `ERROR at encrypt with deriveKey ${deriveKey} and encrypt ${encrypt}`,
          error
        )
        return null
      }
    },
    async submit() {
      if (!!this.address && !!this.username) {
        const key = await this.generateKey(this.password)
        const deriveKey = await this.generateDeriveKey(key)
        const encrypt = await this.encrypt(deriveKey, this.password)
        const certificate = this.arrayBufferToBase64(encrypt)
        this.certificate = certificate
      }
    },
    getGistResponse() {
      const splittedGistURL = this.gistURL.split('/') // '2df865d684ec7ebde98cc73347b9a3aa'
      const gistHash = splittedGistURL[splittedGistURL.length - 1]
      return fetch(`https://api.github.com/gists/${gistHash}`, {
        method: 'GET',
        headers: { Accept: 'application/vnd.github.v3+json' }
      })
        .then((response) => response.json())
        .then((data) => data)
    },
    async check() {
      if (!!this.address && !!this.username && this.gistURL) {
        const response = await this.getGistResponse()
        for (let i = 0; i < Object.values(response.files).length; i++) {
          try {
            const keys = Object.keys(response.files)
            const file = response.files[keys[i]]
            const content = file.content.trim()
            const key = await this.generateKey(this.password)
            const deriveKey = await this.generateDeriveKey(key)
            const encrypt = this.base64ToArrayBuffer(content)
            const decrypt = await window.crypto.subtle.decrypt(
              { name: 'AES-GCM', iv: this.vector },
              deriveKey,
              encrypt
            )
            const password = String.fromCharCode.apply(
              null,
              new Uint16Array(decrypt)
            )
            const ownerLogin = response.owner.login
            const username = password.split(':')[0]
            if (password === this.password && ownerLogin === username) {
              this.valid = true
              break
            } else {
              this.valid = false
            }
          } catch (error) {
            console.error('error in check', error) // eslint-disable-line no-console
          }
        }
      }
    }
  }
}
</script>
