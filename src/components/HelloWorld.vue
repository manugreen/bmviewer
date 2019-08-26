<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>

    <div v-for="group in groups" :key="kg"> 
        <h4>{{ group.label }} {{ kg }}</h4>
        <ul>
            <li v-for="(item, ki) in group.links" :key="ki">
                <a :href="item.url"> {{ item.label }} </a>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    groups: Object,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  //display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
