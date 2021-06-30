<template>
  <router-view/>
</template>
<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'App',
  data () {
    return {}
  },
  methods: {
    ...mapActions('chat', ['handleAuthStateChanged'])
  },
  mounted () {
    this.handleAuthStateChanged()
  }
})
</script>
