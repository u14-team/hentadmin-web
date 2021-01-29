<template>
<v-app>
<transition appear name="slide-fade" mode="out-in">
  <router-view/>
</transition>
</v-app>
</template>

<style>
body, html, #app {
  overflow-y: hidden !important;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}

.fade-enter, .fade-leave-to {
    opacity: 0
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<script>
export default {
  name: 'HentAdmin',
  data () {
    return {
      transitionName: 'fade-in'
    }
  },

  created () {
    const { dark, token } = this.$store.state.persist
    this.$vuetify.theme.dark = dark
    if (token) this.api.openWS()
  },
  watch: {
    $route (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right'
    }
  }
}
</script>
