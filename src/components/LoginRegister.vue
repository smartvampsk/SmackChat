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
export default {
  name: 'LoginRegister',
  props: ['tab'],
  data () {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
      if (this.tab == 'login') {
        alert('login')
      } else {
        alert('register')
      }
    }
  }
}
</script>

<style scoped>

</style>
