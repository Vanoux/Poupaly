<template>
  <div id="app">
    <h3>{{title}}</h3>
    <div class="row">
      <div class="col-sm-6">
        <h4>Ajouter un lien</h4>
        <div class="form">
          <div class="form-group">
            <div class="form-group">
              <label>Titre</label>
              <input class="form-control" type="text" v-model="link.titleLink" required>
            </div>
            <div class="form-group">
              <label>URL</label>
              <input class="form-control" type="text" v-model="link.url" required>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea class="form-control" v-model="link.description"></textarea>
            </div>
            <div class="form-group">
              <label>Catégorie</label>
              <select v-model="link.idCat" name="category" size="1" required>
                <option v-for="category in categories" :key="category.idCat" :value="category.idCat">
                  {{ category.nameCat }}
                </option>
              </select>
            </div>
          </div>
          <button class="btn btn-primary" @click="addLink">Ajouter Lien</button>
        </div>
      </div>
      <div class="col-sm-6">
        <h4>Ajouter une catégorie</h4>
        <div class="form">
          <div class="form-group">
            <div class="form-group">
              <label>Nom :</label>
              <input class="form-control" type="text" v-model="category.nameCat" required>
            </div>
          </div>
          <button class="btn btn-primary" @click="addCat">Ajouter Catégorie</button>
        </div>
      </div>
    </div>
    <div class="col-sm-12">
      <!-- boucle principale: Categories -->
      <div class="col-sm-3 note" v-for="(category, index) in categories" :key="index">
        <!-- card category -->
        <div class="card">
          <button class="close" @click="removeCategory(category.idCat)">&times;</button>
          <h3 class="card-header text-center">{{category.nameCat}}</h3>
          <!-- card link -->
          <!-- Boucle secondaire: link -->
          <div class="card" v-for="(link, index) in links" :key="index" v-if="(link.idCat == category.idCat)">
            <button class="close" @click="removeLink(link.idLink)">&times;</button>
            <div class="card-block">
              <h4 class="card-title"><a :href=link.url target="_blank">{{link.titleLink}}</a></h4>
              <p class="card-text">{{link.description}}</p>
            </div>
          </div>
          <!-- Fin boucle secondaire: link -->
        </div>
      </div>
      <!-- fin boucle principale: Categories -->
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'ListeLien',
    data: function () {
      return {

        title: "PapalyMaster",
        category: {
          nameCat: "",
        },
        link: {
          titleLink: "",
          url: "",
          description: "",
          idCat: 1
        },
        links: [],
        categories: []
      }
    },
    mounted: function () {
      axios
        .get('http://127.0.0.1:8081/bookmarks')
        .then(response => (this.links = response.data))
      axios
        .get('http://127.0.0.1:8081/cat')
        .then(response => (this.categories = response.data, this.link.idCat=response.data[0].idCat))
    },
    methods: {
      display() {
        axios.get('http://127.0.0.1:8081/bookmarks').then(response => (this.links = response.data))
        axios.get('http://127.0.0.1:8081/cat').then(response => (this.categories = response.data, this.link.idCat=response.data[0].idCat))
      },
      addLink() {
        let {
          titleLink,
          url,
          description,
          idCat
        } = this.link;
        axios.post('http://127.0.0.1:8081/add', {
            titleLink,
            url,
            description,
            idCat
          })
          .then(() => (
            this.display()
          ))


        //on efface les champs après ajout
        this.link = {
          titleLink: "",
          url: "",
          description: "",
          idCat: 1
        };
      },
      removeLink(index) {
        axios.post('http://127.0.0.1:8081/remove/' + index)
          .then(() => (
            this.display()
          ))
      },
      addCat() {
        let nameCat = this.category.nameCat
        axios.post('http://127.0.0.1:8081/addcat', {
            nameCat
          })
          .then(() => (
            this.display()
          ))
        //on efface les champs après ajout
        this.category = {
          nameCat: ""
        };
      },
      removeCategory(index) {
        axios.post('http://127.0.0.1:8081/removecat/' + index)
          .then(() => (
            this.display()
          ))
      }
    }
  }
</script>