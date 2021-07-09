<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    v-if="$route.fullPath.includes('/chat')"
                    @click="$router.go(-1)"
                    icon="arrow_back"
                    flat
                    dense
                    label="Back"
                />

                <q-toolbar-title class="absolute-center">
                    {{ title }}
                </q-toolbar-title>

                <q-btn
                    v-if="!userDetails.userId"
                    to="/auth"
                    class="absolute-right q-pr-sm"
                    no-caps
                    icon="account_circle"
                    flat
                    dense
                    label="Login"
                />
                <q-btn
                    v-else
                    @click="logoutUser"
                    class="absolute-right q-pr-sm"
                    no-caps
                    icon="account_circle"
                    flat
                    dense
                    label="Logout"
                >
                    &nbsp; {{ userDetails.name }}
                </q-btn>

            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script>
/* eslint-disable */

import { defineComponent, ref } from 'vue'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
    name: 'MainLayout',

    components: {},
    computed: {
        ...mapState('chat', ['userDetails']),
        title () {
            const currentPath = this.$route.fullPath
            if (currentPath === '/') {
                return 'SmackChat'
            } else if (currentPath === '/chat') {
                return 'Chat'
            } else if (currentPath === '/auth') return 'Auth'
        }
    },

    setup () {
        const leftDrawerOpen = ref(false)

        return {
            leftDrawerOpen,
            toggleLeftDrawer () {
                leftDrawerOpen.value = !leftDrawerOpen.value
            }
        }
    },
    methods: {
        ...mapActions('chat', ['logoutUser']),
    }
})
</script>
