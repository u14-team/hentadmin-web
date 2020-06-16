<template>
  <v-col cols="12" sm="6" md="4" lg="4" xl="3">
    <v-card class="elevation-3 botCard">
      <v-list-item two-line>
        <v-badge bottom offset-x="30" offset-y="32" class="progressBadge" :color="badgeType">
          <template v-slot:badge v-if="badgeType">
            <v-icon style="font-size: 12px" color="white" v-if="badgeType === 'red'">mdi-alert</v-icon>
            <v-progress-circular color="white" v-else indeterminate size="14" width="2" class="ma-0"/>
          </template>
          <v-list-item-avatar class="ml-0">
            <v-avatar><v-img :src="value.info.photos && value.info.photos[0]"/></v-avatar>
          </v-list-item-avatar>
        </v-badge>
        <v-list-item-content>
          <v-list-item-title v-text="value.info.name"/>
          <v-list-item-subtitle>
            Статус: <span v-t="`botStatuses.${value.status}`"/>
            <div v-if="value.info.unknown" class="font-weight-medium caption" v-t="'overview.cards.infoUnknown'"/>
          </v-list-item-subtitle>
          <v-list-item-subtitle v-if="value.hasErrors && value.status !== 'failed'" class="orange--text d-flex align-items">
            <v-icon left small color="orange">mdi-alert</v-icon>
            <b>Есть ошибки</b>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu offset-y left>
            <template v-slot:activator="{ on }">
              <v-btn :disabled="blockCtl" color="primary" icon dark v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item v-if="value.status === 'enabled'" @click="() => stateCtl('reload')">
                <v-list-item-icon><v-icon color="orange">mdi-refresh</v-icon></v-list-item-icon>
                <v-list-item-title v-t="'overview.cards.restart'"/>
              </v-list-item>
              <v-list-item v-if="value.status === 'enabled'" @click="() => stateCtl('disable')">
                <v-list-item-icon><v-icon color="red">mdi-power</v-icon></v-list-item-icon>
                <v-list-item-title v-t="'overview.cards.disable'"/>
              </v-list-item>
              <v-list-item v-else-if="allowStart" @click="() => stateCtl('enable')">
                <v-list-item-icon><v-icon color="green">mdi-play</v-icon></v-list-item-icon>
                <v-list-item-title v-t="'overview.cards.enable'"/>
              </v-list-item>

              <v-divider/>

              <v-list-item target="_blank" :href="`https://vk.com/club${value.info.groupId}`">
                <v-list-item-icon><v-icon color="primary">mdi-vk</v-icon></v-list-item-icon>
                <v-list-item-title>Группа ВКонтакте</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>

      <v-card-actions class="mt-0 pt-0" style="margin-top: auto">
        <v-btn text color="primary" :to="`/dashboard/${value.id}`">Управление</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<style>
.progressBadge span.v-badge__badge {
  padding: 3px
}

.botCard {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
}
</style>

<script>
export default {
  props: ['value'],

  computed: {
    blockCtl () { return this.value.status.endsWith('ing') },
    allowStart () { return ['failed', 'disabled'].includes(this.value.status) },

    badgeType () {
      switch (this.value.status) {
        case 'reloading': return 'orange'
        case 'disabling': return 'red darken-1'
        case 'enabling': return 'green'
        case 'failed': return 'red'
        default: return null
      }
    }
  },

  methods: {
    stateCtl (command) {
      const { id } = this.value
      this.api.execMethod('bots.ctl', { id, command })
    }
  }
}
</script>
