<template>
  <v-window-item :key="1" class="container">
    <div class="content">
      <h6 class="title" v-t="'auth.authForm.title'"/>

      <ValidationObserver ref="form" v-slot="{ invalid }">
        <form class="py-3">
          <ValidationProvider v-slot="{ errors, validate }" name="Login" rules="required|alpha_dash">
            <v-text-field
              :error-messages="errors"
              required
              :label="$t('auth.authForm.login')"
              hide-details
              class="mb-3"
              v-model="login"
              @input="validate"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors, validate }" name="Password" rules="required">
            <v-text-field
              :error-messages="errors"
              required
              :label="$t('auth.authForm.password')"
              type="password"
              class="mb-3"
              v-model="password"
              @input="validate"
            />
          </ValidationProvider>

          <div class="pt-3">
            <v-btn
              color="primary"
              @click="auth"
              :disabled="invalid"
              :loading="authorizing"
              class="mr-3"
              v-t="'auth.authForm.signin'"
            />
            <v-btn
              color="primary"
              text
              @click="$emit('input', 0)"
              v-t="'auth.authForm.back'"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </v-window-item>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center
}

.content {
  flex-grow: 0;
  width: fit-content
}
</style>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, alpha_dash as alphaDash } from 'vee-validate/dist/rules'

extend('required', { ...required, message: 'Это поле обязательно' })
extend('alpha_dash', { ...alphaDash, message: 'Введите корректный логин (A-z, 0-9 и _)' })

export default {
  components: { ValidationProvider, ValidationObserver },

  data: () => ({
    login: '',
    password: '',
    authorizing: false
  }),

  methods: {
    async auth () {
      this.authorizing = true
      const { login, password } = this
      const { error, response: token } = await this.api.execMethod('auth', { login, password })
      this.authorizing = false

      if (error) {
        return this.$refs.form.setErrors({ Password: [error.message] })
      }

      this.$store.commit({ type: 'auth', token })
      this.$store.commit({ type: 'updateLogin', login })

      this.api.openWS()
      return this.$router.push('/overview')
    }
  }
}
</script>
