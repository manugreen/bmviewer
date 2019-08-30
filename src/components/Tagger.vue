<template>
    <div>
        <p v-if="$root.data_file.length == 0">No file loaded</p>
        <div v-else>
            <textarea>{{ $root.data_content }}</textarea>
            <button @click="copiaSelezione">Test</button>
            <p ref="pippo"></p>
        </div>
    </div>
</template>


<script>

export default {
    name: 'Tagger',

    methods: {
        copiaSelezione() {
            console.log(this.$refs.pippo, window.getSelection().toString())
            this.$refs.pippo.innerHTML = "eeeeee" + window.getSelection().toString()
        },
    },
}

</script>
