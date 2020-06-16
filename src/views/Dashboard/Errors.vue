<template>
  <v-container>
    <v-expand-transition>
      <div v-if="loading" class="d-flex align-center">
        <v-progress-circular color="primary" class="mr-3" size="20" width="2" indeterminate/>
        Загрузка журнала ошибок...
      </div>
    </v-expand-transition>
    <v-list two-line color="transparent">
      <v-subheader v-if="!loading">
        Всего ошибок: {{errors.length}} (<btn text @click="clearAll">удалить все</btn>)
      </v-subheader>
      <v-list-item
        v-for="(error, i) in renderedErrors" :key="error.id"
        v-intersect="(...args) => onIntersect(i, ...args)"
        @mouseover="hover = i"
        @mouseleave="hover = -1"
      >
        <!-- TODO distinguish errors and warnings with icon -->
        <v-list-item-icon>
          <v-icon color="red">mdi-alert</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="stripColor(error.message.split('\n')[0])"/>
          <v-list-item-subtitle>
            <div v-text="error.message.split('\n').slice(1).join('\n')"/>
            <b>Время возникновения ошибки: {{parseDate(error.createdAt)}}</b>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-fade-transition>
          <v-list-item-action v-if="hover === i" class="d-flex" style="flex-direction: row">
            <v-btn icon color="primary" @click="() => removeError(error, i)" :loading="removing === i">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon color="primary">
              <v-icon>mdi-file-export</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-fade-transition>
      </v-list-item>
      <v-subheader v-if="errors.length === renderedErrors.length && !loading">
        Больше ошибок нет.
      </v-subheader>
    </v-list>
  </v-container>
</template>

<script>
import { strip } from 'ansicolor'
import { format } from 'date-fns'
import locales from '@/assets/locales/dateLocales'

export default {
  data: () => ({
    errors: [],
    renderedErrors: [],
    hover: 0,
    removing: -1,
    loading: true,
    busy: false
  }),

  mounted () {
    this.updateErrors()
  },

  methods: {
    async removeError ({ id, botId }, i) {
      this.removing = i
      await this.api.execMethod('bots.removeError', {
        id: botId,
        errorId: id
      })

      this.removing = -1
      this.updateErrors()
    },
    async clearAll () {
      const { id } = this.$store.state.dashboard.selectedBot
      await this.api.execMethod('bots.flushErrors', { id })
      this.updateErrors()
    },
    onIntersect (i, entries, observer, isIntersecting) {
      if (i !== this.renderedErrors.length - 1) return
      if (!isIntersecting) return

      console.log(this.errors.length, this.renderedErrors.length)
      this.renderedErrors = this.errors.slice(0, this.renderedErrors.length + 10)
    },
    parseDate (stamp) {
      // TODO localize
      return format(new Date(stamp * 1000), 'Pp', { locale: locales.ru })
    },
    stripColor (line) {
      return strip(line)
    },
    async updateErrors () {
      const { id } = this.$store.state.dashboard.selectedBot
      const { response: errors } = await this.api.execMethod('bots.getErrors', { id })

      this.renderedErrors = []
      this.errors = errors.reverse()
      this.renderedErrors = this.errors.slice(0, 10)
      this.loading = false
    }
  }
}
</script>
