<template>
<v-navigation-drawer :src="bg" class="lime" permanent>
  <div class="sidebar-plane" :style="`background: rgba(${$vuetify.theme.dark ? '0, 0, 0' : '255, 255, 255'}, 0.5)`"></div>
  <v-list dense nav>
    <v-list-item v-if="bot" two-line link target="_blank" :href="`https://vk.com/club${bot.info.groupId}`">
      <v-list-item-avatar v-if="!bot.info.unknown"><img :src="bot.info.photos[1]"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="bot.info.name"/>
        <v-list-item-subtitle v-t="`botStatuses.${bot.status}`"/>
      </v-list-item-content>
      <v-list-item-action>
        <v-progress-circular v-if="blockCtl" indeterminate size="24" color="grey"/>
        <v-menu v-else open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on"><v-icon color="grey lighten-1">mdi-dots-vertical</v-icon></v-btn>
          </template>
          <v-card>
            <v-btn icon v-if="bot.status === 'enabled'" @click="() => stateCtl('reload')">
              <v-icon color="orange">mdi-refresh</v-icon>
            </v-btn>
            <v-btn icon v-if="bot.status === 'enabled'" @click="() => stateCtl('disable')">
              <v-icon color="red">mdi-power</v-icon>
            </v-btn>
            <v-btn icon v-else-if="allowStart" @click="() => stateCtl('enable')">
              <v-icon color="green">mdi-play</v-icon>
            </v-btn>
          </v-card>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
    <v-skeleton-loader v-else ref="skeleton" type="list-item-avatar-three-line" class="mx-auto"/>
    <v-divider></v-divider>
    <v-list-item v-for="item in items" :key="item.name" :to="rootPath + item.path" link>
      <v-list-item-icon>
        <v-badge dot bottom offset-x="5" offset-y="5" :value="!!dots[item.id]" :color="dots[item.id]">
          <v-icon v-text="item.icon"/>
        </v-badge>
      </v-list-item-icon>
      <v-list-item-content><v-list-item-title v-text="$t(item.name)"/></v-list-item-content>
    </v-list-item>
  </v-list>
  <template v-slot:append>
    <div class="pa-2"><v-btn icon to="/overview"><v-icon color="grey">mdi-chevron-left</v-icon></v-btn></div>
  </template>
</v-navigation-drawer>
</template>

<style scoped>
  .sidebar-plane {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

<script>
import items from './menuItems'

export default {
  data: () => ({
    items,
    dots: {},
    bg: 'https://w.wallhaven.cc/full/j8/wallhaven-j8vo5p.jpg'
  }),

  computed: {
    blockCtl () { return this.bot && this.bot.status.endsWith('ing') },
    allowStart () { return ['failed', 'disabled'].includes(this.bot.status) },
    bot () {
      return this.$store.state.dashboard.selectedBot
    },
    rootPath () {
      const { id } = this.$route.params
      return `/bot/${id}`
    },
    drawer () {
      return true
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
