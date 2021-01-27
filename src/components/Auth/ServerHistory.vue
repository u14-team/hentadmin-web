<template>
  <v-list two-line dense class="text-left py-0">
    <template v-if="$store.state.persist.serverHistory.length">
      <v-subheader>
        История серверов
        <v-spacer/>
        <v-btn icon color="primary" small @click="clearHistory">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </v-subheader>
      <v-divider/>
    </template>
    <template v-for="(s, i) in $store.state.persist.serverHistory">
      <v-list-item :key="i" @click="() => selectServer(s, i)">
        <v-list-item-content>
          <v-list-item-title v-text="s.server"/>
          <v-list-item-subtitle v-if="auths[i].updating" class="d-flex">
            <v-progress-circular size="14" width="2" class="mr-2" indeterminate color="primary"/> Проверка...
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else :class="`d-flex ${auths[i].login ? 'text--primary' : 'text--disabled'}`">
            <v-icon left small :class="auths[i].login ? 'text--primary' : 'text--disabled'">mdi-account</v-icon>
            <span v-text="auths[i].login || '(Нет)'"/>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="i !== $store.state.persist.serverHistory.length - 1" :key="'d' + i"/>
    </template>
  </v-list>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({ auths: [] }),

  beforeMount () {
    this.auths = this.$store.state.persist.serverHistory.map(
      ({ server, token, login }, i) => {
        if (token) this.updateInfo(server, token, login, i)
        return { server, token, login, updating: !!token }
      }
    )
  },

  methods: {
    async updateInfo (server, token, login, i) {
      const { data: { error, response } } = await axios.get(server, {
        params: { method: 'auth.check', token },
        responseType: 'json'
      })

      if (error || response.status !== 'valid') this.auths[i].token = undefined
      this.auths[i].login = response ? response.login : `${login} (Offline)`
      this.auths[i].updating = false
    },

    clearHistory () {
      this.$store.commit('clearHistory')
    },

    selectServer (server, i) {
      const { token, login } = this.auths[i]
      const { server: address } = server

      if (token) {
        this.$store.commit({ type: 'saveServer', address })
        this.$store.commit({ type: 'auth', token })
        this.$store.commit({ type: 'updateLogin', login })

        this.api.openWS()
        this.$router.push('/overview')
      } else {
        this.$emit('selected', address)
      }
    }
  }
}
</script>
