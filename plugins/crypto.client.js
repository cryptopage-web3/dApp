const Gun = require('gun')
require('gun/sea')
const SEA = Gun.SEA
const gun = Gun('http://gunjs.herokuapp.com/gun')
const user = gun.user()

const authUser = (privateKey, publicKey) =>
  user.auth(privateKey, publicKey, function (data) {
    if (!data.err) {
      return gun.user()._.sea
    } else if (data.err === 'Wrong user or password.') {
      return createUser(privateKey, publicKey)
    }
  })

const createUser = (privateKey, publicKey) => {
  user.create(privateKey, publicKey, function (data) {
    if (data.err && data.err === 'User already created!') {
      return authUser(privateKey, publicKey)
    }
    return data
  })
}

const getPair = (username, password) => {
  let pair
  if (gun.get(`~@${username}`).once((data, key) => data)) {
    pair = authUser(username, password)
  } else {
    pair = createUser(username, password)
  }
  if (pair && pair.is) return pair._.sea
}

const secret = async (epub, pair) => await SEA.secret(epub, pair)

const encrypt = async (message, epub, pair) =>
  await SEA.encrypt(message, await SEA.secret(epub, pair))

const decrypt = async (message, epub, pair) =>
  await SEA.decrypt(message, await SEA.secret(epub, pair))

const sendMessage = async (data, topic) => {
  const hash = await SEA.work(data, null, null, { name: 'SHA-256' })
  gun.get(topic).get(`#`).get(hash).put(data)
}

const subscribeMessage = (topic, callback) => {
  gun.get(topic).get('#').map().on(callback)
}

export default ({ app }, inject) => {
  inject('sea', SEA)
  inject('getPair', (username, password) => getPair(username, password))
  inject('pair', () => SEA.pair())
  inject('sign', (enc, pair) => SEA.sign(enc, pair))
  inject('verify', (data, pub) => SEA.verify(data, pub))
  inject('encrypt', (message, epub, pair) => encrypt(message, epub, pair))
  inject('decrypt', (message, epub, pair) => decrypt(message, epub, pair))
  inject('secret', (epub, pair) => secret(epub, pair))
  inject('sendMessage', (data, topic) => sendMessage(data, topic))
  inject('subscribeMessage', (topic, cb) => subscribeMessage(topic, cb))
}
