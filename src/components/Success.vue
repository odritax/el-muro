<template>
  <div id="posts"> 
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <nav>
    <div class="nav-wrapper #4db6ac teal lighten-2">
      <a href="#" class="brand-logo">Logo</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <a @click="Salir">Salir</a>
        <!-- <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li> -->
      </ul>
    </div>
  </nav>
    <h3>Hola {{user.name}}</h3>
    <div class="row">
      <form  @submit.prevent="Registrar" action="">
        <div class="col m4"></div>
        <div class="input-field col m5">
          <textarea v-model="comentario" id="textarea2" class="materialize-textarea" data-length="200"></textarea>
          <label for="textarea2">Escribe un comentario</label>
          <input type="submit" class="waves-effect waves-light btn-small" value="Comentar"><br><br>
          <h5>Comentarios</h5>
          <Post v-for="post in posts" :key="post.id" :post_id="post.id" :post="post"/>
        </div>
       </form>
      </div>
  </div>
</template>
<script>
import { db } from '@/firebase';
import firebase from 'firebase/app';
import Post from '@/components/Post.vue'
export default {
  name:'Success',
  data(){
    return{
      posts:[],
      comentario:'',
    }
  },
  components:{
    Post
  },
  firestore(){
    return {
      posts: db.collection('posts').orderBy("fecha", "asc")
      }
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  methods:{
    Salir(){
      this.$store.dispatch('Salir');
    },
      Registrar(){
        db.collection('posts').add({
          usuario: {
            nombre: this.$store.state.user.name, 
            id:this.$store.state.user.id,
          }, 
        comentario:this.comentario,
        contador:0,
        fecha:firebase.firestore.FieldValue.serverTimestamp(), 
        likes:[]
        })
        this.comentario=""
      },
  }
}
</script>
<style>
#posts{
  text-align:left;
}
.collection-item{
  text-align: justify;
}
</style>