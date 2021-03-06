import Vue from 'vue'
import axios from 'axios'
import io from 'socket.io-client'
import store from '../store/index'
import router from '../router/index'

const api = {}

api.checkServer = async function (address) {
  try {
    const { data } = await axios.get(address, {
      params: { method: 'test' }
    })

    if (data && data.response === 'ok') {
      store.commit({ type: 'saveServer', address })
      api.ws = io(new URL(address).origin, { autoConnect: false, path: `${new URL(address).pathname}rtc` })
      return true
    }
    return 'Указанный адрес не является сервером HentAdmin.'
  } catch (e) {
    return `Ошибка: ${e.message}.`
  }
}

api.logout = function () {
  store.commit('logout', { saveToken: false })
  router.push('/auth')
}

api.getServer = function () {
  return store.state.persist.server
}

api.execMethod = async function (method, args) {
  const { server, token } = store.state.persist
  if (!server || (!token && method !== 'auth')) {
    api.logout()
  }

  try {
    const { data } = await axios.get(server, {
      params: { method, token, ...args },
      responseType: 'json'
    })

    if (data.error) {
      switch (data.error.slug) {
        case 'invalid_token_ip':
        case 'invalid_token':
          api.logout()
          break
      }
    }

    return data
  } catch (e) {
    console.error('[HA API ERROR]', e)
    // TODO global api error catching
  }
}

api.ws = io(new URL(store.state.persist.server || window.location.href).origin,
  { autoConnect: false, path: `${new URL(store.state.persist.server || window.location.href).pathname}rtc` }
)

api.state = {}

api.ws.on('reconnect', function () {
  Object.entries(api.state).forEach(([slug, data]) => {
    api.ws.emit('state', { slug, data })
  })
})

api.openWS = function () {
  const { token } = store.state.persist
  api.ws.io.opts.query = { token }
  api.ws.open()
}

api.setRtcState = function (slug, data) {
  api.ws.emit('state', { slug, data })
  api.state[slug] = data
}

api.ws.on('connect_error', console.log)
api.ws.on('connecting', console.log)

Vue.mixin({
  data: () => ({ api })
})
