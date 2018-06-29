
export const IMPORT_ACCOUNT = (state, payload) => {
  state.info = payload.info
  state.keys = payload.keys
}

export const UNLOCK_ACCOUNT = (state, payload) => {
  state.keys = payload.keys
  state.pkeys = payload.pkeys
  state.unlocked = true
  state.lastUnlock = Math.floor(Date.now() / 1000)
}

export const SET_AUTOLOCK = (state, payload) => {
  if (payload.autolock === true) {
    state.autolock = true
  } else {
    state.autolock = false
  }
  state.autolockIntervalSec = payload.autolockIntervalSec
}

export const LOCK_ACCOUNT = (state, payload) => {
  state.keys = payload.keys
  state.pkeys = []
  state.unlocked = false
}

export const ADD_CONTACT = (state, payload) => {
  if (!state.contacts.includes(payload)) {
    state.contacts.push(payload)
  }
}

export const REMOVE_CONTACT = (state, payload) => {
  if (state.contacts.indexOf(payload) > -1) {
    state.contacts.splice(state.contacts.indexOf(payload), 1)
  }
}

export const DELETE_DRAFT = (state) => {
  state.proposalDraft = null
}

export const SAVE_DRAFT = (state, payload) => {
  state.proposalDraft.text = payload.text
}

export const SAVE_DRAFT_META = (state, payload) => {
  Object.assign(state.proposalDraft, payload)
}
