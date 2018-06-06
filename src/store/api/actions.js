import Eos from 'eosjs'
import axios from 'axios'

export const getProposalsTEMP = ({
  state
}, payload) => {
  return new Promise((resolve, reject) => {
    axios.get('/assets/demo-data.json').then((response) => {
      resolve(response.data.proposals)
    }).catch(() => {
    })
  })
}

export const getAccountsTEMP = ({
  state
}, payload) => {
  return new Promise((resolve, reject) => {
    axios.get('/assets/demo-data.json').then((response) => {
      resolve(response.data.accounts)
    }).catch(() => {
    })
  })
}

export const pingAndGetInfo = ({
  commit,
  state
}) => {
  return new Promise((resolve, reject) => {
    let eos = Eos.Testnet(state.endpoints[state.activeEndpointIndex])
    let sTime = Date.now()
    let timeout = setTimeout(function () {
      commit('PING_ENDPOINT_FAIL')
      reject(Error('timeout'))
    }, state.connectionTimeoutMilSec)
    eos.getInfo({}).then((res) => {
      clearTimeout(timeout)
      let ping = Math.floor((Date.now() - sTime) / 1000)
      let utcD = new Date().toISOString().slice(0, -5)
      if (new Date(res.head_block_time).getTime() + state.connectionTimeoutMilSec > new Date(utcD).getTime()) {
        commit('PING_ENDPOINT_SUCCESS', {
          getInfo: res,
          ping: ping
        })
      } else {
        commit('PING_ENDPOINT_STUCK', {
          getInfo: res,
          ping: ping
        })
      }
      resolve(res)
    }, (err) => {
      clearTimeout(timeout)
      if (err) {
        commit('PING_ENDPOINT_FAIL')
        reject(Error('failed'))
      }
    })
  })
}

export const getAccount = ({
  state
}, payload) => {
  return new Promise((resolve, reject) => {
    let eos = Eos.Testnet(state.endpoints[state.activeEndpointIndex])
    let timeout = setTimeout(function () {
      reject(Error('timeout'))
    }, state.connectionTimeoutMilSec)
    eos.getAccount({account_name: payload.account_name}).then((res) => {
      clearTimeout(timeout)
      resolve(res)
    }, (err) => {
      clearTimeout(timeout)
      if (err) {
        reject(Error('notFound'))
      }
    })
  })
}

export const changeEndpoint = ({
  commit,
  state
}, payload) => {
  return new Promise((resolve, reject) => {
    commit('CHANGE_ENDPOINT', payload)
    resolve()
  })
}
