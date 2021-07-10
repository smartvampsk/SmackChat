import { firebaseAuth, firebaseDb } from 'boot/firebase'

let messagesRef

export function registerUser ({}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            let userId = firebaseAuth.currentUser.uid
            firebaseDb.ref('users/' + userId).set({
                name: payload.name,
                email: payload.email,
                online: true
            })
            console.log(response)
        })
        .catch(function (error) {
            console.log(error.message)
        })
}

export function loginUser ({}, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.message)
        })
}

export function logoutUser () {
    firebaseAuth.signOut()
}

export function handleAuthStateChanged ({
    commit,
    dispatch,
    state
}) {
    firebaseAuth.onAuthStateChanged(user => {
        if (user) {
            let userId = firebaseAuth.currentUser.uid
            firebaseDb.ref('users/' + userId).once('value', snapshot => {
                let userDetails = snapshot.val()
                commit('setUserDetails', {
                    name: userDetails.name,
                    email: userDetails.email,
                    userId: userId
                })
            })
            dispatch('firebaseUpdateUser', {
                userId: userId,
                updates: {
                    online: true
                }
            })
            dispatch('firebaseGetUsers')
            this.$router.push('/')
        } else {
            dispatch('firebaseUpdateUser', {
                userId: state.userDetails.userId,
                updates: {
                    online: false
                }
            })
            commit('setUsersDetails', {})
            this.$router.replace('/auth')
        }
    })
}

export function firebaseUpdateUser ({}, payload) {
    firebaseDb.ref('users/' + payload.userId).update(payload.updates)
}

export function firebaseGetUsers ({ commit }) {
    firebaseDb.ref('users').on('child_added', snapshot => {
        let userDetails = snapshot.val()
        let userId = snapshot.key
        commit('addUsers', {
            userId,
            userDetails
        })
    })
    firebaseDb.ref('users').on('child_changed', snapshot => {
        let userDetails = snapshot.val()
        let userId = snapshot.key
        commit('updateUsers', {
            userId,
            userDetails
        })
    })
}

export function firebaseGetMessages ({
    commit,
    state
}, otherUserId) {
    let userId = state.userDetails.userId
    messagesRef = firebaseDb.ref('chats/' + userId + '/' + otherUserId)
    messagesRef.on('child_added', snapshot => {
        let messageDetails = snapshot.val()
        let messageId = snapshot.key
        commit('addMessages', {
            messageId,
            messageDetails
        })
    })
}

export function firebaseStopGettingMessages ({ commit }) {
    if (messagesRef) {
        messagesRef.off('child_added')
        commit('clearMessages')
    }
}

export function firebaseSendMessage ({ state }, payload) {
    firebaseDb.ref('chats/' + state.userDetails.userId + '/' + payload.otherUserId)
        .push(payload.message)

    payload.message.from = 'them'
    firebaseDb.ref('chats/' + payload.otherUserId + '/' + state.userDetails.userId)
        .push(payload.message)
}
