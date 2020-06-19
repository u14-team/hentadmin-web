<template>
  <v-container>
    <div v-for="part in parts" :key="part">
      <Carousel v-if="typeof part === 'object'" :charts="part"/>
      <Chart style="min-height: 512px" v-else :slug="part"/>
      <br>
    </div>
  </v-container>
</template>
<script>
import Carousel from '@/components/Dashboard/Overview/Carousel.vue'
import Chart from '@/components/Dashboard/Overview/Chart.vue'

export default {
  components: { Chart, Carousel },

  data: () => ({
    parts: []
  }),

  async mounted () {
    const { id } = this.$store.state.dashboard.selectedBot
    const { response } = await this.api.execMethod('stats.getParts', { id })
    this.parts = response
  }
}
</script>
