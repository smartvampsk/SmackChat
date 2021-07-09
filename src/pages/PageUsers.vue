<template>
    <q-page class="flex q-pa-md">
        <q-list class="full-width" separator>
            <q-item
                v-for="(user, key) in users"
                :key="key"
                :to="'/chat/'+key"
                clickable
                v-ripple>
                <q-item-section avatar>
                    <q-avatar color="primary" text-color="white">
                        {{ user.name ? user.name.charAt(0) : '' }}
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{ user.name }}</q-item-label>
                    <q-item-label caption lines="1">{{ user.email }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                    <q-badge :color="user.online ? 'light-green-5' : 'grey-4'">
                        {{ user.online ? 'Online' : 'Offline' }}
                    </q-badge>
                </q-item-section>
            </q-item>
        </q-list>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

/* eslint-disable */
export default defineComponent({
    name: 'PageUsers',
    data () {
        return {}
    },
    computed: {
        ...mapGetters('chat', ['users'])
    }
})
</script>

<style lang="sass">

</style>
