<template>
  <v-content fill-height style="height: 100%" class="pa-3">
    <v-sheet dark color="gray darken-4 console">
      <div class="consoleContent">
        <div class="consoleLine" v-for="(line, i) in lines" :key="i">
          <span
            v-for="({ css, text }, i) in parseLine(line)"
            :style="css"
            v-text="text"
            :key="i"
          />
        </div>
      </div>
      <div class="consoleLine promptWrapper">
        <b>cmd:&nbsp;</b>
        <input class="consolePrompt" v-model="command" @keyup="send"/>
      </div>
    </v-sheet>
    <div class="consoleStatus body-2">
      <span v-if="status === 'fetching'">
        <v-progress-circular indeterminate color="primary" size="20" width="2" class="mr-2"/>
        Загрузка журнала...
      </span>
      <span v-if="status === 'subscribing'">
        <v-progress-circular indeterminate color="primary" size="20" width="2" class="mr-2"/>
        Включение автообновления журнала...
      </span>
      <span v-if="status === 'unavailable'">
        <v-progress-circular indeterminate color="primary" size="20" width="2" class="mr-2"/>
        Ожидание доступности консоли...
      </span>
    </div>
  </v-content>
</template>

<style scoped>
.console {
  width: 100%;
  height: calc(100% - 32px);
  max-width: 100%;
  max-height: calc(100% - 32px);
  align-self: start;
  padding: 8px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

/* Just because Firefox is a pile of shit */
/* God bless Chromium */
.consoleContent {
  display: flex;
  flex-direction: column-reverse;
}

.console::-webkit-scrollbar {
  width: 8px;
}

.console::-webkit-scrollbar-track {
  background: transparent;
}

.console::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  margin-right: 2px;
  transition: background 0.2s;
}

.console:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}

.console::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

.consoleStatus {
  width: 100%;
  margin-top: 8px;
  height: 28px;
  padding: 0 10px
}

.consoleStatus, .consoleStatus > * {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.consoleLine {
  font-family: 'Fira Code', monospace;
  font-size: 12px;
  max-width: 100%;
  width: 100%;
  word-wrap: break-word;
}

.consolePrompt:focus {
  outline: none
}

.consolePrompt {
  flex: 2;
  margin-left: 12px
}

.promptWrapper {
  display: flex;
  padding-top: 12px;
}
</style>

<script>
import { parse } from 'ansicolor'

export default {
  data: () => ({
    lines: [],
    command: '',
    status: 'fetching',
    unwatch: null
  }),

  methods: {
    parseLine (line) {
      const parsed = parse(line).spans || []
      return parsed.map(({ css, text }) => ({ css, text }))
    },
    send (event) {
      if (event.keyCode !== 13) return
      event.preventDefault()
      const { id } = this.$store.state.dashboard.selectedBot
      this.api.execMethod('bots.command', { id, command: this.command })
      this.command = ''
    },
    async init () {
      const { id } = this.$store.state.dashboard.selectedBot
      const { response: lines } = await this.api.execMethod('bots.getLog', { id, count: 100 })
      this.lines = lines.reverse()

      this.status = 'subscribing'

      await this.api.setRtcState('console', id)
      this.api.ws.on('console', line =>
        line.split('\n').map(v => lines.unshift(v))
      )

      if (this.unwatch) {
        this.unwatch()
      }

      this.unwatch = this.$store.watch(
        state => state.dashboard.selectedBot.status,
        status => {
          if (status === 'reloading') {
            this.status = 'unavailable'
            this.lines = []
          }
          if (status === 'enabling') this.init()
        }
      )

      this.status = ''
    }
  },

  mounted () {
    this.init()
  }
}
</script>
