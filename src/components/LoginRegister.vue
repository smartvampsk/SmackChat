<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      class="q-mb-md"
      v-model="formData.name"
      type="text" outlined
      label="Name"/>
    <q-input
      class="q-mb-md"
      v-model="formData.email"
      type="email" outlined
      label="Email"/>
    <q-input
      class="q-mb-md"
      v-model="formData.password"
      type="password" outlined
      label="Password"/>
    <div class="row">
      <q-space/>
      <q-btn
        type="submit"
        color="primary"
        :label="tab"/>
    </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginRegister',
  props: ['tab'],
  data () {
    return {
      formData: {
        name: '',
        email: 'danny@test.com',
        password: '123456'
      }
    }
  },
  methods: {
    ...mapActions('chat', ['registerUser', 'loginUser']),

    submitForm () {
      if (this.tab == 'login') {
        this.loginUser(this.formData)
      } else {
        this.registerUser(this.formData)
      }
    }
  }
}
</script>

<style scoped>

</style>
