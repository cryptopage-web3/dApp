import lunr from 'lunr'

class Lunr {
  constructor() {
    this.init()
  }

  host = window.location.protocol + '//' + window.location.host
  url = `${this.host}/_nuxt/search-index/en.json`
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
