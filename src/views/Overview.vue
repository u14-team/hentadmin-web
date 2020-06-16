<template>
  <v-content style="max-height: 100vh">
    <Notifications/>
    <v-app-bar color="blue-grey" dark dense>
      <v-toolbar-title>HentAdmin</v-toolbar-title>
      <v-spacer/>
      <ToolbarMenu/>
    </v-app-bar>

    <v-container class="content">
      <h4 class="display-1 font-weight-bold my-3">Мониторинг</h4>

      <div class="py-2">
        <v-btn small outlined color="primary" class="mr-3">
          <v-icon small left>mdi-plus</v-icon>
          Добавить бота
        </v-btn>

        <v-btn icon color="primary" small :loading="refreshing" @click="refresh">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </div>

      <v-row>
        <BotCard v-for="bot in $store.state.botList" :key="bot.id" :value="bot"/>
      </v-row>
    </v-container>
  </v-content>
</template>

<style scoped>
.content {
  max-height: 100%;
  overflow-y: auto;
  padding-bottom: 64px
}
</style>

<script>
import Notifications from '@/components/Common/Notifications.vue'
import ToolbarMenu from '@/components/Common/ToolbarMenu.vue'
import BotCard from '@/components/Overview/BotCard.vue'

export default {
  components: { Notifications, ToolbarMenu, BotCard },

  data: () => ({
    refreshing: false
  }),

  methods: {
    async refresh () {
      this.refreshing = true
      const { response: botList } = await this.api.execMethod('bots')
      this.$store.commit({ type: 'updateBotList', botList })
      this.refreshing = false
    },

    updateStatus ({ id, status }) { this.$store.commit({ type: 'updateBot', id, status }) },
    updateInfo ({ id, info }) { this.$store.commit({ type: 'updateBot', id, info }) }
  },

  created () {
    this.api.ws.on('status_new', this.updateStatus)
    this.api.ws.on('info_new', this.updateInfo)
  },
  beforeDestroy () {
    this.api.ws.off('status_new', this.updateStatus)
    this.api.ws.on('info_new', this.updateInfo)
  },

  mounted () {
    this.refresh()
  }
}
</script>
