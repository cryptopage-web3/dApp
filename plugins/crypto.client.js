const Gun = require('gun')
require('gun/sea')
const SEA = Gun.SEA
const gun = Gun('https://gunjs.herokuapp.com/gun')
const user = gun.user()

const authUser = (privateKey, publicKey, createIfNotExist = false) => {
  user.auth(privateKey, publicKey, function (data) {
    if (data.err && data.err === 'Wrong user or password.') {
      if (createIfNotExist) {
        return createUser(privateKey, publicKey)
      }
    }
    return gun.user()._.sea
  })
}

const createUser = (privateKey, publicKey, authIfAlreadyCreated = false) => {
  user.create(privateKey, publicKey, function (data) {
    if (data.err && data.err === 'User already created!') {
      if (authIfAlreadyCreated) {
        return authUser(privateKey, publicKey)
      }
    }
    return gun.user()._.sea
  })
}

const getKeysByPublicKey = (publicKey) =>
  gun.user(publicKey).once((data, key) => data)

const getKeysByAddress = (address, callback) =>
  gun.get(`~@${address}`).once((data) => {
    if (data) {
      const publicKey = Object.keys(data)[1].slice(1)
      return getKeysByPublicKey(publicKey).then((keys) => {
        callback(keys)
        return keys
      })
    }
  })

const getPair = (username, password) => {
  // let pair
  if (gun.get(`~@${username}`).once((data, key) => data)) {
    return authUser(username, password, true)
  } else {
    return createUser(username, password, true)
  }
  // if (pair && pair.is) return pair._.sea
}

const secret = async (epub, pair) => await SEA.secret(epub, pair)

const encrypt = async (message, epub, pair) =>
  await SEA.encrypt(message, await SEA.secret(epub, pair))

const decrypt = async (message, epub, pair) =>
  await SEA.decrypt(message, await SEA.secret(epub, pair))

const sendMessage = async (data, room) => {
  const hash = await SEA.work(data, null, null, { name: 'SHA-256' })
  gun.get(room).get(`#`).get(hash).put(data)
}

const createRoom = async (fromPublicKey, toPublicKey) => {
  const room = `${fromPublicKey}.${toPublicKey}`
  const hash = await SEA.work(room, null, null, { name: 'SHA-256' })
  await gun.get('rooms').get('#').get(hash).put(room).once()
  return hash
}

const getRooms = (address, roomsList) => {
  return gun
    .get('rooms')
    .get('#')
    .once()
    .map()
    .on(function (data, key) {
      if (address && data.toLowerCase().includes(address.toLowerCase())) {
        roomsList.push(key)
      }
    })
}

const getRoom = async (hash) => {
  return await gun
    .get('rooms')
    .get('#')
    .get(hash)
    .once((data) => data)
}

const subscribeMessage = (room, callback) => {
  gun.get(room).get('#').map().on(callback)
}

export default ({ app }, inject) => {
  inject('gun', gun)
  inject('sea', SEA)
  inject('getPair', (username, password) => getPair(username, password))
  inject('authUser', (privateKey, publicKey, createIfNotExist) =>
    authUser(privateKey, publicKey, createIfNotExist)
  )
  inject('createUser', (privateKey, publicKey, authIfAlreadyCreated) =>
    createUser(privateKey, publicKey, authIfAlreadyCreated)
  )
  inject('pair', () => SEA.pair())
  inject('sign', (enc, pair) => SEA.sign(enc, pair))
  inject('verify', (data, pub) => SEA.verify(data, pub))
  inject('encrypt', (message, epub, pair) => encrypt(message, epub, pair))
  inject('decrypt', (message, epub, pair) => decrypt(message, epub, pair))
  inject('secret', (epub, pair) => secret(epub, pair))
  inject('sendMessage', (data, room) => sendMessage(data, room))
  inject('subscribeMessage', (room, cb) => subscribeMessage(room, cb))
  inject('createRoom', (fromPublicKey, toPublicKey) =>
    createRoom(fromPublicKey, toPublicKey)
  )
  inject('getRooms', (address, roomsList) => getRooms(address, roomsList))
  inject('getRoom', (hash) => getRoom(hash))
  inject('getKeysByAddress', (address, callback) =>
    getKeysByAddress(address, callback)
  )
}
