<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center">
      User is offline.
    </q-banner>

    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
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
              <q-btn type="submit" color="white" round dense flat icon="send"/>
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pagechat',
  data () {
    return {
      newMessage: '',
      messages: [
        {
          text: 'Hey you, how are you',
          from: 'me'
        },
        {
          text: 'hey me, I am good. You?',
          from: 'them'
        },
        {
          text: 'Pretty good!',
          from: 'me'
        },
      ],
    }
  },
  methods: {
    sendMessage () {
      this.messages.push({
        text: this.newMessage,
        from: 'me',
      })
    }
  }
})
</script>

<style lang="sass">

</style>
