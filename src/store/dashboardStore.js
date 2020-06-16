export default {
  state: {
    selectedBot: null
  },

  mutations: {
    selectBot (state, { bot }) {
      state.selectedBot = bot
    },
    updateSelectedBot (state, { status, info }) {
      if (status) state.selectedBot.status = status
      if (info) state.selectedBot.info = info
    }
  }
}
