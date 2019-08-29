<template>
    <div>
        <div>
            <p> {{ $root.password.length > 0 ? 'Password set' : 'Password not set' }} </p>
            <input type="password" ref="set_password"> <button @click="setPassword">Set password</button>
        </div>
        <div>
            <ul>
                <li v-for="(file, i) in files" :key="i"> {{ file }} <i class="fas fa-download" @click="downloadFile(file)"></i></li>
            </ul>
        </div>
    </div>
</template>


<script>

export default {
    name: 'FileList',
    data: () => {
        return  {
            files: [],
        }
    },
    computed: {
        pippo: function() {
            return this.$root.$data.password
        },
    },
    methods: {
        setPassword() {
            this.$root.password = this.$refs.set_password.value
            this.loadFiles()
        }, 

        loadFiles() {
            if (this.$root.$data.password.length > 0) {
                // axios - fare cosi per parametri x-www-form-encoded
                // altrimenti invia dati come JSON e in php è necessario $_POST = json_decode(file_get_contents('php://input'), true);
                let _self = this
                let params = new URLSearchParams()
                params.append('storeme', this.$root.$data.password)
                params.append('list', '1')

                this.axios.post(this.$root.happy_store_url, params)
                    .then(function(response) {
                        if (response.data.status == 200) {
                            _self.files = response.data.files
                        }
                    })
            }
        },

        downloadFile(file) {
            if (this.$root.$data.password.length > 0) {
                // axios - fare cosi per parametri x-www-form-encoded
                // altrimenti invia dati come JSON e in php è necessario $_POST = json_decode(file_get_contents('php://input'), true);
                let _self = this
                let params = new URLSearchParams()
                params.append('storeme', this.$root.$data.password)
                params.append('get', file)

                this.axios.post(this.$root.happy_store_url, params)
                    .then(function(response) {
                        if (response.data.status == 200) {
                            _self.$root.data_file = response.data.file
                            _self.$root.data_content = response.data.data
                        }
                    })
            }
        },
    },

    mounted() {
        this.loadFiles()
    },
}

</script>

