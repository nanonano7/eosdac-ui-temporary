export const PING_ENDPOINT_SUCCESS = (state, payload) => {
  state.endpoints[state.activeEndpointIndex].ping = payload.ping
  state.endpoints[state.activeEndpointIndex].lastConnectionStatus = 0
  state.endpoints[state.activeEndpointIndex].lastConnection = Date.now()
  state.lastGetInfo = payload.getInfo
}

export const PING_ENDPOINT_STUCK = (state, payload) => {
  state.endpoints[state.activeEndpointIndex].ping = payload.ping
  state.endpoints[state.activeEndpointIndex].lastConnectionStatus = 2
  state.endpoints[state.activeEndpointIndex].lastConnection = Date.now()
  state.lastGetInfo = payload.getInfo
}

export const PING_ENDPOINT_FAIL = (state) => {
  state.endpoints[state.activeEndpointIndex].lastConnectionStatus = 1
}

export const ADD_ENDPOINT = (state, payload) => {
  let findEndpoint = state.endpoints.find(findEndpoint => {
    return findEndpoint.httpEndpoint === payload.httpEndpoint
  })
  if (!findEndpoint) {
    state.endpoints.push(payload)
  }
}

export const REMOVE_ENDPOINT = (state, url) => {
  let current = state.endpoints[state.activeEndpointIndex].httpEndpoint
  let removed = state.endpoints.filter(function (el) {
    return el.httpEndpoint !== url
  })
  state.endpoints = removed
  let findEndpoint = state.endpoints.findIndex(findEndpoint => findEndpoint.httpEndpoint === current)
  state.activeEndpointIndex = findEndpoint
}

export const CHANGE_ENDPOINT = (state, url) => {
  let findEndpoint = state.endpoints.findIndex(findEndpoint => findEndpoint.httpEndpoint === url)
  state.activeEndpointIndex = findEndpoint
}

export const SCATTER_AVAILABLE = (state, scatter) => {
  state.scatterAvailable = true
  state.scatter = scatter
}

export const SCATTER_UNAVAILABLE = (state) => {
  state.scatterAvailable = false
}

export const CHANGE_INTERVALS = (state, payload) => {
  if (payload.checkIntervalMilSec && !isNaN(payload.checkIntervalMilSec)) {
    state.checkIntervalMilSec = payload.checkIntervalMilSec
  }
  if (payload.connectionTimeoutMilSec && !isNaN(payload.connectionTimeoutMilSec)) {
    state.connectionTimeoutMilSec = payload.connectionTimeoutMilSec
  }
}
