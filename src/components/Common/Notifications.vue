<template>
  <div class="nofiticationsContainer">
    <WSStatus/>
    <v-snackbar v-for="({text, id}) in $store.state.notifications.list" :key="id" :value="true" @input="() => close(id)" :timeout="3000" right top>
      <div v-text="text"/>
      <v-btn color="primary lighten-2" icon @click="() => close(id)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<style>
.nofiticationsContainer > div.v-snack {
  position: relative;
  margin: 10px;
}

.nofiticationsContainer > div.v-snack:first-child {
  margin-top: 0
}

.nofiticationsContainer {
  width: 100vw;
  height: 100vh;
  padding: 10px;
  position: absolute;
  pointer-events: none;
  z-index: 99999;
}
</style>

<script>
// usage:
// this.$store.commit({ type: 'notify', text: 'content' })
import WSStatus from './WSStatus'

export default {
  components: { WSStatus },

  methods: {
    close (id) {
      this.$store.commit({ type: 'closeNotification', id })
    }
  }
}
</script>
