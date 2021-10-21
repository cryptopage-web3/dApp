import lunr from 'lunr'

import { TokenInfoType } from '~/logic/address/types'

type TokenExtendedType = {
	[address: string]: {
		name: string
		symbol: string
		decimals: number
		images: {
			[size: number]: string
		}
	}
}

class SearchService {
  // indexedJSON = null
  // metas = null
  // public get indexFields: string[] = ['address', 'name', 'symbol', 'decimals', 'image']
  public tokens: TokenExtendedType[] = []
  
  public get lunr() {
  	const tokens = this.tokens
  	const fields = ['address', 'name', 'symbol', 'decimals', 'image']
	return lunr(function() {
	  	// const tokens = this.tokens
	  	fields.forEach((field: string) => {
	  		this.field(field)	
	  	})
	  	/*
	  	this.field('address')
	  	this.field('name')
	  	this.field('symbol')
	  	this.field('decimals')
	  	this.field('image')
	  	*/
	  	// const arr: TokenExtendedType[] = []
	  	tokens.forEach((item: TokenExtendedType) => {
	  		const address = Object.keys(item)[0]
	  		console.log('address', address)
	  		const ipfsCID = item[address].images.128
	  		const image = `https://ipfs.io/ipfs/${ipfsCID}`
	  		const name = item[address].name
	  		const symbol = item[address].symbol
	  		const decimals = 0
	  		const tokenInfo = { address, name, symbol, decimals, image }
	  		this.add(tokenInfo)
	  	})
  } 
  	/*
  		const address = Object.keys(item)[0]
  		const image = `https://ipfs.io/ipfs/${item[address].images.128}`
  		const tokenInfo = {
  			address,
    		name: item[address].name,
    		symbol: item[address].symbol,
    		decimals: 0,
    		image
  		}
  		this.add(tokenInfo)
  	})
  */
  })
  /*
  (function () {
  	this.field('address')
  	this.field('name')
  	this.field('symbol')
  	this.field('decimals')
  	this.field('image')
  })
	*/
	/*
  private addIndexes = () => {
  	this.lunr.field('address')
  	this.lunr.field('name')
  	this.lunr.field('symbol')
  	this.lunr.field('decimals')
  	this.lunr.field('image')
  }
  private index = () => {
  	this.tokens.forEach((item: TokenExtendedType) => {
  		const address = Object.keys(item)[0]
  		const image = `https://ipfs.io/ipfs/${item[address].images.128}`
  		const tokenInfo = {
  			address,
    		name: item[address].name,
    		symbol: item[address].symbol,
    		decimals: 0,
    		image
  		}
  		this.lunr.add(tokenInfo)
  	})
  }
	*/

  // private init = () => {
  	// this.addIndexes()
  	// this.index()
  	/*
    if (!this.indexedJSON) {
      const json = await this.getIndexedJSON()
      this.indexedJSON = json
      this.metas = this.indexedJSON.metas
    }
    if (!this.lunr) {
      this.lunr = await lunr.Index.load(this.indexedJSON)
    }
    */
  // }
  /*
  private getIndexedJSON = async () => {
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
  */
}