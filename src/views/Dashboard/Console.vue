<template>
<div>
  <AppBar>Консоль</AppBar>
  <v-sheet color="gray darken-4 console">
    <div class="consoleLines">
      <div class="consoleLine" v-for="(line, i) in lines" :key="i">
        <span
          v-for="({ css, text }, i) in parseLine(line)"
          :style="css"
          v-text="text"
          :key="i"
        />
      </div>
    </div>
  </v-sheet>
  <v-text-field
    @keyup="sendButton"
    @click:append="send"
    placeholder="Введите команду..."
    style="border-radius: 0px; height: 40px"
    append-icon="mdi-send"
    v-model="command"
    solo
    hide-details
    dense
    autofocus
    flat
  >
  </v-text-field>
</div>
</template>

<style scoped>
  .console {
    height: calc(100vh - 48px - 40px);
    overflow-y: scroll;
    padding: 10px;
  }

  .consoleLines {
    display: flex;
    flex-direction: column-reverse;
  }

  .consoleLine {
    font-family: Fira Code, monospace;
    font-size: 12px;
    max-width: 100%;
    width: 100%;
    word-wrap: break-word;
  }
</style>

<script>
import AppBar from '@/components/Dashboard/AppBar.vue'
import { parse } from 'ansicolor'

export default {
  components: { AppBar },
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
    sendButton (event) {
      if (event.keyCode !== 13) return
      event.preventDefault()
      this.send()
    },
    send () {
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
