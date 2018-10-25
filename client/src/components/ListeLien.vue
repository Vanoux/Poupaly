<template>
<div id="app">
  <h3>{{title}}</h3>
  <div class="form">
    <div class="form-group">
      <div class="form-group">
        <label>Titre</label>
        <input class="form-control" type="text" v-model="link.titleLink">
      </div>
      <div class="form-group">
        <label>URL</label>
        <input class="form-control" type="text" v-model="link.url">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" v-model="link.description"></textarea>
      </div>
      <div class="form-group">
        <select v-model="link.selected" name="category" size="1">
          <option selected disabled>Choose</option>
          <option v-for="category in categories" :key="category.idCat">
            {{ category.nameCat }}
          </option>
        </select>
      </div>
    </div>
    <button class="btn btn-primary" @click="addLink">Submit</button>
  </div>
  <span>Selected: {{ link.selected }}</span>
  <div class="col-sm-12">
    <div class="col-sm-4 note" v-for="(link, index) in links" :key="index">
      <div class="card">
          <button class="close" @click="removeLink(link.idLink)">&times;</button>
        <div class="card-block">
          <h4 class="card-title"><a :href=link.url target="_blank">{{link.titleLink}}</a></h4>
          <p class="card-text">{{link.description}}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ListeLien',
  data: function(){ 
    return {
        
        title: "PapalyMaster",
        link: {
        titleLink: "",
        url: "",
        description: "",
        selected: ""
        },
        links: [],
        categories: [
          {
            idCat: 1,
            nameCat: "Moteur de Recherche"
          },
          {
            idCat: 2,
            nameCat: "Javascript"
          }
          ]
    }
  },
  mounted : function(){
    axios
      .get('http://127.0.0.1:8081/bookmarks')
      .then(response => (this.links = response.data))
  },
  methods: {
    display() {
      axios.get('http://127.0.0.1:8081/bookmarks').then(response => (this.links = response.data))
    },
    addLink() {
      let { titleLink, url, description } = this.link;
      axios.post('http://127.0.0.1:8081/add', {titleLink, url, description})
      .then(() => (
        this.display()
      ))
      
      
      //on efface les champs après ajout
      this.link ={
        titleLink: "",
        url: "",
        description: ""
      };
      
    },
    removeLink(index) {
      axios.post('http://127.0.0.1:8081/remove/'+index)
      .then(() => (
        this.display()
      ))
    }
  }
}

</script>