<template>
    <q-page
        ref="pageChat"
        class="flex column page-chat">
        <q-banner
            v-if="!otherUserDetails.online"
            class="bg-grey-4 text-center fixed-top">
            {{ otherUserDetails.name }} is offline.
        </q-banner>

        <div
            id="divChat"
            :class="{invisible: !showMessages }"
            class="q-pa-md column col justify-end divChat">
            <q-chat-message
                v-for="(message, key) in messages"
                :key="key"
                :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
                :text="[message.text]"
                :sent="message.from == 'me' ? true : false"
                :bg-color="message.from == 'me' ? 'white' : 'light-green-2'"
            />
        </div>
        <q-footer elevated>
            <q-toolbar>
                <q-form class="full-width" @submit="sendMessage">
                    <q-input
                        v-model="newMessage"
                        @blur="scrollToBottom"
                        ref="newMessage"
                        class="q-pb-none"
                        bg-color="white" rounded outlined
                        label="Message"
                        counter
                        dense>
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
import { defineComponent, watch, ref } from 'vue'
import { mapState, mapActions } from 'vuex'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'

export default defineComponent({
    name: 'PageChat',
    mixins: [mixinOtherUserDetails],
    data () {
        return {
            newMessage: '',
            showMessages: false,
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
            this.clearMessage()
        },
        clearMessage () {
            this.newMessage = ''
            this.$refs.newMessage.focus()
        },
        scrollToBottom () {
            let page = document.getElementById('divChat')
            let height = page.scrollHeight + 700
            setTimeout(() => {
                page.scrollTop = height
            }, 20)

            // let pageChat = this.$refs.pageChat.$el
            // setTimeout(() => {
            //     window.scrollTo(0, pageChat.scrollHeight)
            // })
        },
        messageBottomWatcher () {
            this.scrollToBottom()
            setTimeout(() => {
                this.showMessages = true
            }, 200)
            // if (Object.keys(val).length) {
            //     this.scrollToBottom()
            //     setTimeout(() => {
            //         this.showMessages = true
            //     }, 200)
            // }
        }
    },
    mounted () {
        this.firebaseGetMessages(this.$route.params.otherUserId)
        this.messageBottomWatcher()
    },
    unmounted () {
        this.firebaseStopGettingMessages()
    },
})
</script>

<style>
.page-chat {
    background: #e2dfd5;
}

.page-chat:after {
    content: '';
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.1;
    background-image: radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 0 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 50% 100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent), radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent), radial-gradient(circle at 0 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent);
    background-size: 100px 50px;
}

.q-banner {
    top: 50px;
    z-index: 2;
    opacity: 0.8;
}

.q-message {
    z-index: 1;
}
</style>
