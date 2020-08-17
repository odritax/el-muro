<template>
  <div id="posts"> 
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <nav>
    <div class="nav-wrapper #4db6ac teal lighten-2">
      <a href="#" class="brand-logo">Hola {{user.name}}</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <!-- <li><router-link :to="{path:'/login'}">Login</router-link></li> -->
        <li><a @click="Salir"><i class="tiny material-icons">power_settings_new</i></a></li>
      </ul>
    </div>
  </nav>
  <div class="row">
    <div class="col m5"></div>
    <div class="col m4">
        <img src="../assets/corazon.svg" id="corazon" alt="">
    </div>
  </div>
  <div id="comentario" class="row">
    <form  @submit.prevent="Registrar" action="">
      <div class="col m4"></div>
      <div class="input-field col m4">
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
import Post from '@/components/Post.vue'

const getDate = () => {
  const trailing = (d) => ('0' + d).slice(-2);
  const now = new Date();
  return `${trailing(now.getDate())}-${trailing(now.getMonth() + 1)}-${now.getFullYear()} ${trailing(now.getHours())}:${trailing(now.getMinutes())}:${trailing(now.getSeconds())}`;
}
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
      posts: db.collection('posts').orderBy("fecha", "desc")
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
          img:this.$store.state.user.urlPhoto
        }, 
      comentario:this.comentario,
      contador:0,
      fecha:getDate(), 
      // firebase.firestore.FieldValue.serverTimestamp(),
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
.brand-logo{
  margin-left: 30px;
}
#comentario{
  margin-top:60px;
}
#nav-mobile{
  margin-right: 10px;
}
#corazon{
  width: 80px;
  position: relative;
  top:50px;
}
</style>