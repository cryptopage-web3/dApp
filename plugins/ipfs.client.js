import { create } from 'ipfs-http-client'

export default ({ app }, inject) => {
  inject(
    'ipfs',
    create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'
    })
  )
}
