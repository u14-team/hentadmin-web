<template>
  <v-select
    :label="$t('toolbar.language')"
    :value="$i18n.locale"
    :items="locales"
    @input="changeLanguage"
    hide-details
  />
</template>

<script>
export default {
  computed: {
    locales () {
      return this.languages.map(key => {
        return { text: this.$t('languageSelfName', key), value: key }
      })
    }
  }
}
</script>
