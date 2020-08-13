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
    <h3>Bienvenido {{user.name}}</h3>
    <div class="row">
      <form  @submit.prevent="Registrar" action="">
        <div class="col m4"></div>
        <div class="input-field col m5">
          <textarea v-model="comentario" id="textarea2" class="materialize-textarea" data-length="200"></textarea>
          <label for="textarea2">Escribe un comentario</label>
          <input type="submit" class="waves-effect waves-light btn-small" value="Comentar"><br><br>
          <h5>Comentarios</h5>
          <ul v-for="post in posts" :key="post.id" class="collection">
            <li class="collection-item avatar">
              <!-- <input type="hidden" v-model="like" :value="(post.likes)" > -->
              <img src="../assets/logo.png" alt="" class="circle">
              <span class="title">{{post.usuario_nombre}}</span>
              <p>{{post.comentario}}</p>
              <p class="secondary-content">{{post.likes}}<a v-on:click="Like(post.id)" class="secondary-content"><i class="material-icons">thumb_up</i></a></p>
            </li>
          </ul>
        </div>
       </form>
      </div>
  </div>
</template>
<script>
import { db } from '@/firebase';

export default {
  name:'Success',
  data(){
    return{
      posts:[],
      comentario:'',
    }
  },
  firestore(){
    return {
      posts: db.collection('posts')
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
        likes:0
        })
        this.comentario=""
      },
    Like(id){
      //extraigo la fila con el id para despues modificarla
       const post = this.posts.find(post => post.id == id);
      // actualizo en la base de datos
      this.$firestore.posts.doc(id).update({
        likes: post.likes+1
      })
    }
  }
}
</script>
<style>
#posts{
  text-align:left;
}
</style>