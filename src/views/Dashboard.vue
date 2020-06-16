<template>
  <v-content>
    <Notifications/>
    <v-layout column fill-height style="max-height: 100vh">
      <v-flex shrink>
        <v-app-bar color="blue-grey" dark dense>
          <v-btn icon to="/overview" small class="ml-0">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>HentAdmin</v-toolbar-title>
          <v-spacer/>
          <ToolbarMenu/>
        </v-app-bar>
      </v-flex>

      <v-flex grow style="max-height: calc(100% - 48px)">
        <v-layout fill-height>
          <v-flex shrink class="elevation-3 hidden-sm-and-down"><Sidebar/></v-flex>
          <!-- <v-flex grow style="flex: 1.5; overflow-y: auto"> -->
          <v-flex grow style="flex: 1.5; overflow-y: auto">
            <router-view v-if="loaded"/>
            <div v-else class="preloader">
              <v-progress-circular indeterminate size="48" color="primary"/>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<style scoped>
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%
}
</style>

<script>
import Notifications from '@/components/Common/Notifications.vue'
import ToolbarMenu from '@/components/Common/ToolbarMenu.vue'
import Sidebar from '@/components/Dashboard/Sidebar.vue'

export default {
  components: { Notifications, ToolbarMenu, Sidebar },

  data: () => ({ loaded: false }),

  async beforeMount () {
    const { id } = this.$route.params

    const { response: bot } = await this.api.execMethod('bots.get', { id })
    this.$store.commit({ type: 'selectBot', bot })
    this.loaded = true
  },

  methods: {
    updateStatus ({ id: updatedId, status }) {
      console.log('status_new')
      const { id } = this.$route.params
      if (Number(id) !== updatedId) return
      this.$store.commit({ type: 'updateSelectedBot', status })
    },
    updateInfo ({ id: updatedId, info }) {
      const { id } = this.$route.params
      if (Number(id) !== updatedId) return
      this.$store.commit({ type: 'updateSelectedBot', info })
    }
  },

  created () {
    this.api.ws.on('status_new', this.updateStatus)
    this.api.ws.on('info_new', this.updateInfo)
  },
  beforeDestroy () {
    this.api.ws.off('status_new', this.updateStatus)
    this.api.ws.on('info_new', this.updateInfo)
  }
}
</script>
