
export const getAccount = (state) => {
  return state.info
}

export const getContacts = (state) => {
  return state.contacts
}

export const unlocked = (state) => {
  return state.unlocked
}

export const lastUnlock = (state) => {
  return state.lastUnlock
}

export const getAutolockInterval = (state) => {
  if (state.autolock) {
    return state.autolockIntervalSec
  } else {
    return 0
  }
}

export const getProposalDraft = (state) => {
  return state.proposalDraft
}
