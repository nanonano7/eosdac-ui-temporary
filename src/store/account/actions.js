import ecc from 'eosjs-ecc'
import CryptoJS from 'crypto-js'

export const unlockAccount = ({
  commit,
  state
}, payload) => {
  return new Promise((resolve, reject) => {
    let keys = state.keys
    for (let i = 0; i < keys.length; i++) {
      let bytes = CryptoJS.AES.decrypt(keys[i].privateKey, payload)
      let plaintext = bytes.toString(CryptoJS.enc.Utf8)
      if (ecc.privateToPublic(plaintext) !== keys[i].key) {
        reject(Error('wrong password'))
      }
      keys[i].decrypted = plaintext
    }
    commit('UNLOCK_ACCOUNT', keys)
    resolve()
  })
}
