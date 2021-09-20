import lunr from 'lunr'

class Lunr {
  constructor() {
    this.init()
  }

  url = `http://localhost:3000/_nuxt/search-index/en.json`
  indexedJSON = null
  metas = null
  lunr = null
  init = () => {
    if (!this.indexedJSON) {
      this.getIndexedJSON()
    }
  }

  getIndexedJSON = () => {
    fetch(this.url)
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
      })
      .then((json) => {
        this.indexedJSON = json
        this.metas = this.indexedJSON.metas
        this.getSearchIndex()
      })
  }

  getSearchIndex = () => {
    this.lunr = lunr.Index.load(this.indexedJSON)
  }

  getMeta = (ref) => {
    return this.metas[ref]
  }
}

export default new Lunr()
