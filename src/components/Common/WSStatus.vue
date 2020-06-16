<template>
  <v-snackbar v-model="api.ws.disconnected" right top :timeout="0" class="status">
    <v-progress-circular indeterminate color="primary" :size="24" :width="3" class="mr-3"/>
    Соединение...
  </v-snackbar>
</template>

<style>
div.status > div, div.status > div > div {
  min-width: 0px
}
</style>
