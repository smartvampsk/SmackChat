export default {
    computed: {
        otherUserDetails () {
            if (this.$store.state.chat.users[this.$route.params.otherUserId]) {
                return this.$store.state.chat.users[this.$route.params.otherUserId]
            } else {
                return {}
            }
        }
    }
}
