<template>
  <v-card height="512px">
    <v-progress-circular v-if="loading" indeterminate color="primary" size="20" width="2" class="mr-2"/>
    <v-card-text class="text-center" style="width: auto" v-else-if="type === 'error'">
      <v-row><v-col>Произошла ошибка</v-col></v-row>
    </v-card-text>
    <apexchart v-else-if="type !== 'number'" width="100%" height="100%" :type="type" :options="options" :series="series"></apexchart>
    <v-card-text class="text-center" style="width: auto" v-else>
      <v-row><v-col class="display-3">{{series[0].data}}</v-col></v-row>
      <v-row><v-col >{{series[0].name}}</v-col></v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['slug'],
  data () {
    return {
      loading: true,
      type: null,
      options: {
        xaxis: {
          categories: null
        },
        stroke: {
          curve: 'smooth'
        }
      },
      series: null
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
    this.options.xaxis.categories = response.legend
    this.series = response.series
    this.loading = false
  }
}
</script>
