<template>
  <div id="posts"> 
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
              <img src="../assets/logo.png" alt="" class="circle">
              <span class="title">{{post.usuario_nombre}}</span>
              <p>{{post.comentario}}</p>
              <a href="" class="secondary-content">{{post.likes}} likes</a>
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
      like:''
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
       usuario_id: this.$store.state.user.id,
       usuario_nombre: this.$store.state.user.name,
       comentario:this.comentario,
       likes:0
      })
      this.comentario=""
    }
  }
}
</script>
<style>
#posts{
  text-align:left;
}
</style>