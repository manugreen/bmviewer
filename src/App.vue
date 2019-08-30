<template>
  <div id="bmviewer">
    <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        crossorigin="anonymous">
    <div class="menu">
        
        <button @click="changePage('viewer')" :class="[open_page == 'viewer' ? 'active' : '']">Viewer <i class="fas fa-bookmark"></i></button>
        <button @click="changePage('tagger')" :class="[open_page == 'tagger' ? 'active' : '']">Tagger <i class="fas fa-tag"></i></button>
        <button @click="changePage('filelist')" :class="[open_page == 'filelist' ? 'active' : '']">Files <i class="fas fa-folder-open"></i></button>

    </div>
    <div v-if="open_page == 'viewer'">
        <div>
            <textarea v-model="bookmark_text" rows="10"></textarea>
            <p><small>Length {{ bookmark_text.length }}</small></p>
            <input type="file" ref="extFile" @change="loadFile"/> 
            <button @click="loadGroups">Load</button>
            <button @click="pippo">Pippo</button>
        </div>

        <HelloWorld msg="asdasd asdasdasd " :groups="groups"/>
    </div>
    <div v-if="open_page == 'tagger'">
        <Tagger/>
    </div>
    <div v-if="open_page == 'filelist'">
        <FileList/>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
import FileList from '@/components/FileList'
import Tagger from '@/components/Tagger'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Tagger,
    FileList,
  },
  data: () => {
    return {
        open_page: 'viewer',
        'bookmark_text': '',
        'groups': {},
        asd: 'asdpippoasd',
    }
  },
    methods: {
        changePage: function(page) {
            this.open_page = page
        },
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
                        show: false,
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

        pippo: function() {
            // axios - fare cosi per parametri x-www-form-encoded
            // altrimenti invia dati come JSON e in php è necessario $_POST = json_decode(file_get_contents('php://input'), true);
            let params = new URLSearchParams()
            params.append('storeme', 'FIXME')
            params.append('save', 'pippo.txt')
            params.append('overwrite', '1')
            params.append('data', this.bookmark_text)

            this.axios.post('http://happystore.altervista.org/storeme/index.php', params)
                .then(function(response) {
                    console.log('Risposta', response)
                })
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

  .menu {
    button.active {
        color: white;
        background-color: darkgreen;
    }
  }
}
</style>
