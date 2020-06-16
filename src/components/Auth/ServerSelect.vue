<template>
  <v-window-item :key="0" class="container">
    <v-layout :column="$vuetify.breakpoint.smAndDown" reverse fill-height class="content" style="width: 80%" align-center>
      <v-flex class="container">
        <div class="content">
          <h6 class="title" v-t="'auth.serverSelect.title'"/>

          <ValidationObserver ref="form" v-slot="{ invalid }">
            <form class="py-3">
              <ValidationProvider v-slot="{ errors }" name="Server" rules="url|required">
                <v-text-field
                  :error-messages="errors"
                  required
                  placeholder="http://127.0.0.1:10001"
                  class="mb-3"
                  v-model="server"
                  hide-details
                />
              </ValidationProvider>

              <div class="pt-3">
                <v-btn
                  color="primary"
                  @click="checkServer"
                  :disabled="invalid"
                  :loading="checking"
                  v-t="'auth.serverSelect.continue'"
                />
              </div>
            </form>
          </ValidationObserver>
        </div>
      </v-flex>

      <template v-if="$store.state.persist.serverHistory.length">
        <v-flex xs1/>

        <v-flex justify-center class="container">
          <ServerHistory class="content" @selected="selected"/>
        </v-flex>
      </template>
    </v-layout>
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
import ServerHistory from './ServerHistory'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import isURL from 'validator/es/lib/isURL'
import i18n from '@/plugins/i18n'

console.log(i18n)

extend('required', { ...required, message: i18n.getLocaleMessage('auth.errors.empty') })
extend('url', val =>
  isURL(val, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
    require_tld: false
  }) || i18n.getLocaleMessage('auth.errors.invalid')
)

export default {
  components: { ValidationProvider, ValidationObserver, ServerHistory },

  data: () => ({
    server: '',
    checking: false
  }),

  methods: {
    selected (address) {
      this.server = address
      this.checkServer()
    },
    async checkServer () {
      this.checking = true
      const value = await this.api.checkServer(this.server)
      this.checking = false

      if (value !== true) {
        return this.$refs.form.setErrors({ Server: [value] })
      }

      this.$emit('input', 1)
    }
  }
}
</script>
