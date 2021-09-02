<template>
  <div class="hello">
    <h2>{{ insult ? insult.insult + ' - ' + insult.play : greeting }}</h2>
    <button @click="randomInsult">Give me a sick burn!</button>
  </div>
</template>

<script>
export default {
  name: 'Insults',
  props: {
    msg: String
  },
  data() {
    return {
      greeting: 'Insult me!',
      insult: '',
      insults: [{ insult: "Never hung poison on a fouler toad", play: "Rickard III" },
        { insult: "He thinks too much: such men are dangerous.", play: "Julius Ceasar" }]
    }
  },
  methods: {
    randomInsult() {
      const index = Math.floor(Math.random() * 2);
      this.insult = this.insults[index];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
