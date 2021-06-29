<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width" separator>
      <q-item v-for="user in users" :key="user.id" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption lines="1">{{ user.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-5' : 'grey-4'">{{ user.online ? 'Online' : 'Offline'}}</q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
/* eslint-disable */
export default defineComponent({
  name: 'PageUsers',
  data () {
    return {
      users: [
        {
          id: 1,
          name: 'Ruddy Jedrzej',
          online: true,
          email: 'rjedrzej0@discuz.net',
        }, {
          id: 2,
          name: 'Mallorie Alessandrini',
          online: false,
          email: 'malessandrini1@marketwatch.com',
        }, {
          id: 3,
          name: 'Elisabetta Wicklen',
          online: true,
          email: 'ewicklen2@microsoft.com',
        }, {
          id: 4,
          name: 'Seka Fawdrey',
          online: false,
          email: 'sfawdrey3@wired.com',
        }]
    }
  }
})
</script>

<style lang="sass">

</style>
