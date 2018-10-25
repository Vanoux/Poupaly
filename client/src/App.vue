<template>
  <div id="app">
    <ListeLien/>
  </div>
</template>

<script>
import ListeLien from './components/ListeLien.vue'
export default {
  name: 'app',
  components: {
    ListeLien
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
