<template>
  <div class="hello">
    <h2>{{ insult ? insult.insult + ' - ' + insult.play : greeting }}</h2>
    <button @click="getInsult">Give me a sick burn!</button>
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
      insult: ''
    }
  },
  methods: {
    async getInsult() {
      const response = await fetch('https://shakespeare-insults-generator.herokuapp.com/getInsult');
      const data = await response.json();
      console.log(data);
      this.insult = await data;
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
