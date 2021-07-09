// import Vue from 'vue'

export function setUserDetails (state, payload) {
    state.userDetails = payload
}

export function addUsers (state, payload) {
    state.users[payload.userId] = payload.userDetails
}

export function updateUsers (state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails)
}

export function addMessages (state, payload) {
    state.messages[payload.messageId] = payload.messageDetails
}

export function clearMessages (state) {
    state.messages = {}
}
