<template>
<v-content>
  <Notifications/>
  <v-layout column fill-height style="max-height: 100vh">
    <v-flex grow style="max-height: 100%">
      <v-layout fill-height>
        <v-flex shrink class="hidden-sm-and-down"><Sidebar/></v-flex>
        <v-flex grow style="flex: 1.5; overflow-y: auto" class="elevation-21">
          <transition name="fade" mode="out-in" v-if="loaded"><router-view/></transition>
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
import Sidebar from '@/components/Bot/Sidebar.vue'

export default {
  components: { Notifications, Sidebar },

  data: () => ({ loaded: false }),

  async beforeMount () {
    const { id } = this.$route.params

    if (this.$store.state.dashboard.selectedBot && id !== this.$store.state.dashboard.selectedBot.id) {
      this.$store.state.dashboard.selectedBot = null
      this.loaded = false
    }

    const { response: bot } = await this.api.execMethod('bots.get', { id })
    this.$store.commit({ type: 'selectBot', bot })
    this.loaded = true
  },

  methods: {
    updateStatus ({ id: updatedId, status }) {
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
    console.log('adsad')
    this.loaded = false
    this.api.ws.off('status_new', this.updateStatus)
    this.api.ws.on('info_new', this.updateInfo)
  }
}
</script>
