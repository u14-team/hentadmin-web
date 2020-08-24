<template>
  <v-content style="max-height: 100vh">
    <Notifications/>
    <v-app-bar color="blue-grey" dark dense>
      <v-toolbar-title>HentAdmin</v-toolbar-title>
      <v-spacer/>
      <ToolbarMenu/>
    </v-app-bar>

    <v-container class="content">
      <h4 class="display-1 font-weight-bold my-3">Подвал разработчика</h4>
      <form>
        <v-autocomplete
          v-model="method"
          :items="allMethods"
          label="Метод"
          required
        ></v-autocomplete>
        <v-textarea
          label="JSON data"
          auto-grow
          v-model="data"
        ></v-textarea>
        <v-btn class="mr-4" @click="callMethod" :loading="loadingSend">Отправить</v-btn>
        <pre>{{ result }}</pre>
      </form>
      <h6>Стейты</h6>
      <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Slug</th>
            <th class="text-left">Информация</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in api.state" :key="key">
            <td>{{ key }}</td>
            <td>{{ JSON.stringify(value) }}</td>
          </tr>
        </tbody>
      </template>
      </v-simple-table>
    </v-container>
  </v-content>
</template>

<style scoped>
.content {
  max-height: 100%;
  overflow-y: auto;
  padding-bottom: 64px
}
</style>

<script>
import Notifications from '@/components/Common/Notifications.vue'
import ToolbarMenu from '@/components/Common/ToolbarMenu.vue'

export default {
  components: { Notifications, ToolbarMenu },

  data: () => ({
    method: '',
    allMethods: [],
    loadingSend: false,
    result: ''
  }),

  async mounted () {
    this.allMethods = await this.api.execMethod('methods').then(v => v.response)
  },

  methods: {
    async callMethod () {
      this.loadingSend = true
      const safeParse = () => {
        try {
          return JSON.parse(this.data)
        } catch (ex) {
          return null
        }
      }

      const parsedData = safeParse(this.data)
      if (this.data && !parsedData) {
        alert('Контент не имеет валидный JSON формат')
        this.loadingSend = false
        return
      }

      this.result = await this.api.execMethod(this.method, parsedData)
        .then(v => JSON.stringify(v, null, 2))
      this.loadingSend = false
    }
  }
}
</script>
