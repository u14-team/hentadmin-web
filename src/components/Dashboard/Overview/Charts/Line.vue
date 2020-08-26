<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['options', 'data'],
  mounted () {
    this.renderChart({
      labels: this.data.legend,
      datasets: this.data.series.map(v => ({
        label: v.name,
        data: v.data
      }))
    })
  },
  watch: {
    chartdata () {
      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>
