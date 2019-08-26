<template>
  <div id="bmviewer">
    <div>
        <textarea v-model="bookmark_text" rows="10"></textarea>
        <p><small>Length {{ bookmark_text.length }}</small></p>
    </div>
    <HelloWorld msg="asdasd asdasdasd "/>
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
    }
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
