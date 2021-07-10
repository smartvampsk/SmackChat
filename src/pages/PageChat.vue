<template>
    <q-page
        ref="pageChat"
        class="flex column">
        <q-banner
            v-if="!otherUserDetails.online"
            class="bg-grey-4 text-center">
            {{ otherUserDetails.name }} is offline.
        </q-banner>

        <div class="q-pa-md column col justify-end">
            <q-chat-message
                v-for="(message, key) in messages"
                :key="key"
                :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
                :text="[message.text]"
                :sent="message.from == 'me' ? true : false"
            />
        </div>
        <q-footer elevated>
            <q-toolbar>
                <q-form class="full-width" @submit="sendMessage">
                    <q-input class="q-pb-none" bg-color="white" rounded outlined v-model="newMessage" label="Message"
                             counter dense>
                        <template v-slot:after>
                            <q-btn type="submit" color="white" round dense flat icon="send" @click="sendMessage"/>
                        </template>
                    </q-input>
                </q-form>
            </q-toolbar>
        </q-footer>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'

export default defineComponent({
    name: 'PageChat',
    mixins: [mixinOtherUserDetails],
    data () {
        return {
            newMessage: '',
        }
    },
    computed: {
        ...mapState('chat', ['messages', 'userDetails']),
    },
    methods: {
        ...mapActions('chat', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),

        sendMessage () {
            this.firebaseSendMessage({
                message: {
                    text: this.newMessage,
                    from: 'me',
                },
                otherUserId: this.$route.params.otherUserId
            })
            this.newMessage = ''
        },
        scrollToBottom () {
            console.log('scroll')
            let pageChat = this.$refs.pageChat.$el
            console.log(pageChat.scrollHeight)
            setTimeout(() => {
                window.scrollTo(0, pageChat.scrollHeight)
            }, 20)
        }
    },

    mounted () {
        this.firebaseGetMessages(this.$route.params.otherUserId)
    },
    unmounted () {
        this.firebaseStopGettingMessages()
    },
})
</script>

<style lang="sass">

</style>
