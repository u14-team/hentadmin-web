import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ru from '@/assets/locales/ru.json'
import debug from '@/assets/locales/debug.json'

const messages = { ru, debug }

if (process.env.NODE_ENV !== 'development') {
  delete messages.debug
}

Vue.use(VueI18n)

const i18n = new VueI18n({
  messages, locale: 'ru', fallbackLocale: 'ru'
})

Vue.mixin({
  data: () => ({ languages: Object.keys(messages) }),
  methods: {
    changeLanguage (locale) {
      i18n.locale = locale
    }
  }
})

export default i18n
