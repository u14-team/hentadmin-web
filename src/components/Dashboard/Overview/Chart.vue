<template>
  <v-card style="overflow: hidden">
    <div v-if="loading" class="text-center">
      <v-progress-circular indeterminate color="primary"/>
    </div>
    <v-card-text class="text-center" style="width: auto" v-else-if="type === 'error'">
      <v-row><v-col>Произошла ошибка</v-col></v-row>
    </v-card-text>
    <LineChart :styles="{ height: '512px' }" v-else-if="type !== 'number'" :data="data"></LineChart>
    <v-card-text class="text-center" style="width: auto" v-else>
      <v-row><v-col class="display-3">{{data.series[0].data}}</v-col></v-row>
      <v-row><v-col >{{data.series[0].name}}</v-col></v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import LineChart from './Charts/Line.vue'

export default {
  components: { LineChart },
  props: ['slug'],
  data () {
    return {
      loading: true,
      type: null
    }
  },
  async mounted () {
    const { id } = this.$store.state.dashboard.selectedBot
    const { response, error } = await this.api.execMethod('stats.get', { id, slug: this.slug })
    if (error) {
      this.type = 'error'
      this.loading = false
    }
    this.type = response.chartType
    this.data = response
    this.loading = false
  }
}
</script>
