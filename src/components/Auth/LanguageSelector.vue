<template>
  <v-dialog v-model="dialog" :max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn icon :color="color" v-on="on"><v-icon>mdi-web</v-icon></v-btn>
    </template>

    <v-card class="px-2">
      <v-card-title class="px-1">
        <v-btn icon class="mr-2" @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
        <span v-t="'auth.languageSelector.title'"/>
      </v-card-title>
      <v-card-text class="px-3"><LanguageSelect/></v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import LanguageSelect from '@/components/Common/LanguageSelect'

export default {
  props: ['color'],
  data: () => ({ dialog: false }),

  components: { LanguageSelect }
}
</script>
