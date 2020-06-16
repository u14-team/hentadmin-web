<template>
  <div>
    <v-navigation-drawer floating permanent color="transparent">
      <div v-if="!bot" class="pt-3 pb-2 pl-4 d-flex align-center">
        <v-progress-circular :size="24" :width="2" indeterminate color="primary"/>
        <h1 class="subtitle-1 ml-4">Загрузка...</h1>
      </div>
      <div class="ma-4 mb-2 d-flex align-center" v-else>
        <v-avatar class="mr-3">
          <v-img :src="bot.info.photos[1]"/>
        </v-avatar>
        <div>
          <div class="headline font-weight-bold text-truncate" style="line-height: 100%" v-text="bot.info.name"/>
          <div class="text--secondary body-2" v-t="`botStatuses.${bot.status}`"/>
        </div>
      </div>

      <div class="d-flex justify-center align-center my-1 space-between" v-if="bot">
        <v-progress-circular indeterminate v-if="blockCtl" color="primary" size="24" width="3"/>
        <v-btn class="mx-2" icon v-if="bot.status === 'enabled'" @click="() => stateCtl('reload')">
          <v-icon color="orange">mdi-refresh</v-icon>
        </v-btn>
        <v-btn class="mx-2" icon v-if="bot.status === 'enabled'" @click="() => stateCtl('disable')">
          <v-icon color="red">mdi-power</v-icon>
        </v-btn>
        <v-btn class="mx-2" icon v-else-if="allowStart" @click="() => stateCtl('enable')">
          <v-icon color="green">mdi-play</v-icon>
        </v-btn>
      </div>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.name" :to="rootPath + item.path" color="primary" :ripple="false">
          <v-list-item-icon>
            <v-badge dot bottom offset-x="5" offset-y="5" :value="!!dots[item.id]" :color="dots[item.id]">
              <v-icon v-text="item.icon"/>
            </v-badge>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.name)"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import items from './menuItems'

export default {
  data: () => ({ items, dots: {} }),

  computed: {
    blockCtl () { return this.bot && this.bot.status.endsWith('ing') },
    allowStart () { return ['failed', 'disabled'].includes(this.bot.status) },
    bot () {
      return this.$store.state.dashboard.selectedBot
    },
    rootPath () {
      const { id } = this.$route.params
      return `/dashboard/${id}`
    }
  },

  watch: {
    bot () {
      if (this.bot.hasErrors) this.dots.errors = 'orange'
    }
  },

  methods: {
    stateCtl (command) {
      const { id } = this.$route.params
      this.api.execMethod('bots.ctl', { id, command })
    }
  }
}
</script>
