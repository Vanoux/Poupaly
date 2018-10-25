<template>
<div id="app">
  <h3>{{title}}</h3>
  <div class="form">
    <div class="form-group">
      <div class="form-group">
        <label>Titre</label>
        <input class="form-control" type="text" v-model="note.titleLink">
      </div>
      <div class="form-group">
        <label>URL</label>
        <input class="form-control" type="text" v-model="note.url">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" v-model="note.description"></textarea>
      </div>
    </div>
    <button class="btn btn-primary" @click="addNote">Submit</button>
  </div>
  <div class="col-sm-12">
    <div class="col-sm-4 note" v-for="(note, index) in notes" :key="index">
      <div class="card">
          <button class="close" @click="removeNote(index)">&times;</button>
        <div class="card-block">
          <h4 class="card-title"><a :href=note.url target="_blank">{{note.titleLink}}</a></h4>
          <p class="card-text">{{note.description}}</p>
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
        note: {
        titleLink: "",
        url: "",
        description: ""
        },
        notes: [
          {
            titleLink: "Wikipedia",
            url: "www.wikipedia.org",
            description: "wikipedia"
          }
        ]
    }
  },
  mounted : function(){
    axios
      .get('http://127.0.0.1:8081/bookmarks')
      .then(response => (this.notes = response.data))
  },
  methods: {
    display() {
      axios.get('http://127.0.0.1:8081/bookmarks').then(response => (this.notes = response.data))
    },
    addNote() {
      let { titleLink, url, description } = this.note;
      axios.post('http://127.0.0.1:8081/add', {titleLink, url, description})
      .then(resp => (
        this.display()
      ))
      
      
      //on efface les champs après ajout
      this.note ={
        titleLink: "",
        url: "",
        description: ""
      };
      
    },
    removeNote(index) {
      this.notes.splice(index, 1);
    }
  }
}

</script>