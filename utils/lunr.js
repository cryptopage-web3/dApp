import lunr from 'lunr'

class Lunr {
  constructor() {
    this.init()
  }

  indexedJSON = null
  metas = null
  lunr = null
  init = async () => {
    if (!this.indexedJSON) {
      const json = await this.getIndexedJSON()
      this.indexedJSON = json
      this.metas = this.indexedJSON.metas
    }
    if (!this.lunr) {
      this.lunr = await lunr.Index.load(this.indexedJSON)
    }
  }

  getIndexedJSON = async () => {
    return await fetch('_nuxt/search-index/en.json').then((res) => {
      if (res.status === 200) {
        return res.json()
      }
    })
  }

  getMeta = (ref) => {
    return this.metas[ref]
  }

  search = (data) => {
    if (this.lunr) {
      return this.lunr.search(data)
    } else {
      return setTimeout(() => {
        return this.search(data)
      }, 100)
    }
  }

  getFirstMeta = (data) => {
    const searchResults = this.search(data)
    const ref = searchResults[0] ? searchResults[0].ref : null
    if (ref) {
      return this.getMeta(ref)
    }
  }
}

export default new Lunr()
