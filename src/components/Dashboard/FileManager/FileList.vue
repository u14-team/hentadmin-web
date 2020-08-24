<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="perPage"
    sort-by="name"
    dense
  >
    <template v-slot:[`item.name`]="{ item }">
      <router-link
        :to="`${$route.path}/${item.rawName}`"
      >{{ item.name }}</router-link>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data () {
    return {
      perPage: 25,
      headers: [
        { text: 'Имя', align: 'start', sortable: true, value: 'name' },
        { text: 'Размер', sortable: true, value: 'size' },
        { text: 'Дата', sortable: true, value: 'time' },
        { text: 'Действия', sortable: false, value: 'actions' }
      ]
    }
  },

  computed: {
    items () {
      return this.$attrs.files.map(v => ({
        ...v,
        rawName: v.name,
        name: `${v.type === 'file' ? '📄' : '📁'} ${v.name}`
      }))
    }
  }
}
</script>
