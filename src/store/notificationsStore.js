export default {
  state: {
    id: 0,
    list: []
  },

  mutations: {
    notify (state, { text }) {
      state.list.push({ id: state.id++, text })
    },
    closeNotification (state, { id }) {
      const i = state.list.findIndex(e => e.id === id)
      if (!i) return
      state.list.splice(i, 1)
    }
  }
}
