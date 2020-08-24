<template>
  <div style="height: 100%">
  <Editor :content="$attrs.content" @onChange="editorChange" :lang="language" gutter=false ></Editor>
  <v-btn v-if="edited" small color="primary" @click="save">Сохранить</v-btn>
  </div>
</template>

<script>
import Editor from 'vue2x-ace-editor'
import detect from 'language-detect'

export default {
  components: { Editor },
  data: () => ({ edited: false }),
  created () {
    window.addEventListener('beforeunload', this.onBeforeUnload)
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.onBeforeUnload)
  },

  mounted () {
    this.$children[0].editor.commands.addCommand({
      name: 'save',
      bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
      exec: () => this.save()
    })
  },

  methods: {
    async save () {
      this.$store.commit({ type: 'notify', text: 'Сохранение...' })
      const { id } = this.$store.state.dashboard.selectedBot
      await this.api.execMethod('fs.save', { id, path: this.$route.params.path, content: this.$children[0].editor.getValue() })
      this.$store.commit({ type: 'notify', text: 'Файл сохранён.' })
      document.title = `${this.$route.params.path}`
      this.edited = false
    },

    onBeforeUnload (e) {
      if (this.edited && !this.confirmLeave()) {
        e.preventDefault()
        e.returnValue = ''
      }
    },

    confirmLeave () {
      return window.confirm('Вы действительно хотите выйти? У Вас имеются несохранённые данные!')
    },

    editorChange () {
      document.title = `${this.$route.params.path} *`
      this.edited = true
    }
  },
  computed: {
    language () {
      const resolved = (detect.contents(this.$route.params.path, this.content) || 'text').toLowerCase()
      if (resolved !== 'text') {
        require('brace/mode/' + resolved)
      }

      return resolved
    }
  }
}
</script>
