<template>
  <v-window-item :key="2" class="container">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="48"
    />
  </v-window-item>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center
}
</style>

<script>
export default {
  props: ['value'],

  watch: {
    async value (val) {
      if (val !== 2) return
      try {
        const { error, response: { status, login } } = await this.api.execMethod('auth.check')

        if (error || status !== 'valid') return this.$emit('input', 0)
        this.$store.commit({ type: 'updateLogin', login })

        this.api.openWS()
        setTimeout(() => this.$router.push('/overview'), 500)
      } catch (e) {
        this.$emit('input', 0)
      }
    }
  }
}
</script>
