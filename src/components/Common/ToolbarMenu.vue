<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <p>
          <span class="overline" v-text="$t('toolbar.signedAs')"/><br/>
          <span class="body-1 accent--text" v-text="$store.state.persist.login"/>
        </p>
        <p>
          <span class="overline" v-text="$t('toolbar.server')"/><br/>
          <span class="body-1 accent--text" v-text="server"/>
        </p>

        <p>
          <LanguageSelect/>
        </p>

        <div class="text-center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <DarkModeSwitch v-on="on" class="mx-3"/>
            </template>
            <span v-text="$t('toolbar.themeSwitch')"/>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon class="mx-3" color="primary" v-on="on">
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </template>
            <span v-text="$t('toolbar.settings')"/>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon class="mx-3" color="red" v-on="on" @click="logout">
                <v-icon>mdi-power-standby</v-icon>
              </v-btn>
            </template>
            <span v-text="$t('toolbar.signout')"/>
          </v-tooltip>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<style scoped>
.username {
  text-transform: initial;
}
</style>

<script>
import LanguageSelect from './LanguageSelect'
import DarkModeSwitch from './DarkModeSwitch'

export default {

  data: () => ({ menu: false }),

  components: { LanguageSelect, DarkModeSwitch },

  computed: {
    server () {
      const url = new URL(this.$store.state.persist.server)
      return url.host
    }
  },

  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/')
    }
  }
}
</script>
