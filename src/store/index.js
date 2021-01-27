import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import dashboard from './dashboardStore'
import notifications from './notificationsStore'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ paths: ['persist'] })],
  state: {
    persist: {
      server: null,
      token: null,
      login: null,
      dark: false,
      serverHistory: []
    },
    botList: []
  },

  mutations: {
    saveServer (state, { address }) {
      state.persist.server = address
    },
    auth (state, { token }) {
      state.persist.token = token
    },
    updateBotList (state, { botList }) {
      state.botList = botList
    },
    updateLogin (state, { login }) {
      state.persist.login = login
    },
    updateBot (state, { id, ...data }) {
      const i = state.botList.findIndex(e => e.id === id)
      if (i === -1) return

      state.botList[i] = Object.assign(state.botList[i], data)
    },
    updateTheme (state, { isDark }) {
      state.persist.dark = isDark
    },
    logout (state) {
      state.persist.server = null
      state.persist.login = null
      state.persist.token = null
    },
    pushHistory (state, { server, token, login }) {
      if (state.persist.serverHistory.find(v => v.token === token)) {
        return
      }

      state.persist.serverHistory.push(
        { server, token, login }
      )

      if (state.persist.serverHistory.length > 3) {
        state.persist.serverHistory.shift()
      }
    },
    clearHistory (state) {
      state.persist.serverHistory = []
    }
  },

  modules: {
    dashboard, notifications
  }
})
