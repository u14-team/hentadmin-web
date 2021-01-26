<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="plugins"
      :items-per-page="25"
      group-by="category"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Имя', align: 'start', value: 'name' },
        { text: 'Версия', value: 'version' },
        { text: 'Инициализация', value: 'init' },
        { text: 'Запуск', value: 'start' }
      ],
      plugins: [
        {
          name: 'common/bot',
          version: '1.1.0',
          init: 6.0,
          start: 24,
          category: 'common'
        }
      ]
    }
  }
}
</script>

<script>
export default {
}
</script>
