<template>
<v-toolbar dense flat>
  <slot/>
  <v-spacer></v-spacer>
  <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
  <v-btn icon><v-icon>mdi-bell</v-icon></v-btn>
  <ToolbarMenu/>
</v-toolbar>
</template>

<script>
import ToolbarMenu from '@/components/Common/ToolbarMenu.vue'

export default {
  components: { ToolbarMenu }
}
</script>
