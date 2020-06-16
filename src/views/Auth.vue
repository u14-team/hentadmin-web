<template>
  <v-content style="height: 100%">
    <div class="text-xs-center text-sm-right text-md-right pa-3 pb-0">
      <div>
        <LanguageSelector class="ml-2"/>
        <DarkModeSwitch class="ml-2"/>
      </div>
    </div>
    <v-layout column justify-center align-center fill-height>
      <v-flex xs3><h1 class="display-3">HentAdmin</h1></v-flex>

      <v-flex xs4 text-center>
        <v-window v-model="window" style="width: 100vw" transition="slide-x-transition">
          <ServerSelect v-model="window"/>
          <AuthForm v-model="window"/>
          <TokenCheck v-model="window"/>
        </v-window>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import DarkModeSwitch from '@/components/Common/DarkModeSwitch'
import LanguageSelector from '@/components/Auth/LanguageSelector'
import ServerSelect from '@/components/Auth/ServerSelect'
import AuthForm from '@/components/Auth/AuthForm'
import TokenCheck from '@/components/Auth/TokenCheck'

export default {
  name: 'Auth',

  components: { DarkModeSwitch, LanguageSelector, ServerSelect, AuthForm, TokenCheck },

  data: () => ({
    window: 0
  }),

  mounted () {
    const { token } = this.$store.state.persist
    if (token) this.window = 2
  }
}
</script>
