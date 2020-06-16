import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        accent: '#000000'
      },
      dark: {
        accent: '#ffffff'
      }
    }
  }
})
