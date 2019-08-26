<template>
  <div id="bmviewer">
    <div>
        <textarea v-model="bookmark_text" rows="10"></textarea>
        <p><small>Length {{ bookmark_text.length }}</small></p>
        <input type="file" ref="extFile" @change="loadFile"/> 
        <button @click="loadGroups">Load</button>
    </div>
    <HelloWorld msg="asdasd asdasdasd " :groups="groups"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data: () => {
    return {
        'bookmark_text': '',
        'groups': {},
    }
  },
    methods: {
        loadGroups: function() {
            this.groups = {}
            let lines = this.bookmark_text.split(/[\n\r]+/)
            let title, url, group

            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim().indexOf('title = ') == 0) {
                    title = lines[i].trim().substr(8)
                }
                else if (lines[i].trim().indexOf('url = ') == 0) {
                    url = lines[i].trim().substr(6)
                }
                else if (lines[i].trim().indexOf('group = ') == 0) {
                    group = lines[i].trim().substr(8)
                }

                if (title && group && url) {
                    if (!this.groups[group]) {
                        this.groups[group] = {
                            label: group,
                            links: [],
                        }
                    }
                    this.groups[group].links.push({
                        label: title,
                        url: url,
                    })
                    group = false
                    title = false
                    url = false
                }
            }
        },

        loadFile: function() {
            const file = this.$refs.extFile.files[0]
            let reader = new FileReader()
            reader.readAsText(file, 'UTF-8')
            reader.onload = ev => {
                this.bookmark_text = ev.target.result
            }
        },
    },
}
</script>

<style lang="scss">
#bmviewer {
  font-family: 'Purisa', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

    textarea {
        width: 100%;
    }

  a {
    color: red;
  }
}
</style>
