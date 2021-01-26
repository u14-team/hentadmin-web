<template>
<div>
  <AppBar>Обзор</AppBar>
  <div v-if="loading" class="text-center">
    <v-progress-circular indeterminate color="primary"/>
  </div>
  <div v-else v-for="part in parts" :key="part">
    <Carousel v-if="typeof part === 'object'" :charts="part"/>
    <Chart style="height: 512px" v-else :slug="part"/>
    <br>
  </div>
</div>
</template>

<script>
import Carousel from '@/components/Dashboard/Overview/Carousel.vue'
import Chart from '@/components/Dashboard/Overview/Chart.vue'
import AppBar from '@/components/Dashboard/AppBar.vue'

export default {
  components: { Chart, Carousel, AppBar },

  data: () => ({
    parts: [],
    loading: true
  }),

  async mounted () {
    const { id } = this.$store.state.dashboard.selectedBot
    const { response } = await this.api.execMethod('stats.getParts', { id })
    this.parts = response
    this.loading = false
  }
}
</script>
