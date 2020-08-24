<template>
  <v-container style="height: 100%;">
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    <FileList v-if="type === 'directory'" :files="files"></FileList>
    <File v-else-if="type === 'file'" :content="content" :edited="edited"></File>
    <div v-else class="text-center">
      <v-progress-circular indeterminate color="primary" ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import FileList from '@/components/Dashboard/FileManager/FileList.vue'
import File from '@/components/Dashboard/FileManager/File.vue'

export default {
  components: { FileList, File },
  data: () => ({
    type: '',
    files: [],
    content: '',
    edited: false
  }),

  mounted () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.type = null
      const { id } = this.$store.state.dashboard.selectedBot
      const { response } = await this.api.execMethod('fs.get', { id, path: this.$route.params.path || '' })
      this.type = response.type
      if (this.type === 'directory') {
        this.files = response.items
      }

      if (this.type === 'file') {
        this.content = response.content
      }

      document.title = this.$route.params.path || 'Файловый менеджер'
    }
  },

  watch: {
    $route (to, from) {
      this.refresh()
    }
  },

  computed: {
    breadcrumbs () {
      const items = `${this.$route.params.path || ''}`.split('/')
      return [
        { text: '.', to: `/dashboard/${this.$route.params.id}/fs`, exact: true },
        ...items.map((v, i) => ({
          text: i === items.length - 1 && this.edited ? `${v} *` : v,
          to: `/dashboard/${this.$route.params.id}/fs/${[...items.slice(0, i), v].join('/')}`,
          exact: true
        }))
      ]
    }
  }
}
</script>
