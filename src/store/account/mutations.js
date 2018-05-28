
export const IMPORT_ACCOUNT = (state, payload) => {
  state.info = payload.info
  state.keys = payload.keys
}

export const UNLOCK_ACCOUNT = (state, payload) => {
  state.keys = payload
  state.unlocked = true
}

export const DELETE_DRAFT = (state) => {
  state.proposalDraft = null
}

export const SAVE_DRAFT = (state, payload) => {
  state.proposalDraft.text = payload.text
}

export const SAVE_DRAFT_TITLE = (state, payload) => {
  state.proposalDraft.title = payload.title
}
