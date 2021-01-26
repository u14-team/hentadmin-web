<template>
  <v-content style="max-height: 100vh">
    <Notifications/>
    <v-app-bar color="blue-grey" dark dense>
      <v-toolbar-title>Похоже Вы заблудились...</v-toolbar-title>
      <v-spacer/>
      <ToolbarMenu/>
    </v-app-bar>

    <v-container class="content">
      <h1 class="font-weight-bold my-1 text-center" style="font-size: 24vh">404</h1>
      <h2 class="font-weight-bold my-1 text-center">Здесь нет страницы, которая Вам нужна</h2>
      <div class="text-center">
        <v-btn color="primary" justify="center" to="/overview"><v-icon color="grey">mdi-chevron-left</v-icon> К ботам</v-btn>
      </div>
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
  components: { Notifications, ToolbarMenu }
}
</script>
