<template>
  <swiper style="height: 160px" :options="swiperOption">
    <swiper-slide v-for="slug in charts" :key="slug"><Chart :slug="slug"/></swiper-slide>
  </swiper>
</template>

<script>
import Chart from '@/components/Dashboard/Overview/Chart.vue'

export default {
  components: { Chart },
  props: ['charts'],

  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>
