<template>
  <div>
  <ul class="collection">
          <li class="collection-item avatar">
            <img src="../assets/logo.png" alt="" class="circle">
            <span class="title">{{post.usuario.nombre}}</span>
            <read-more more-str="leer más..." :text="post.comentario" link="#" less-str="leer menos.." :max-chars="115"></read-more>
            <p>{{post.contador}}</p>
            <p><a v-on:click="Like(post.id)" ><i class="material-icons">thumb_up</i> Me gusta</a></p>
          </li>
        </ul>
  </div>
</template>
<script>
import { db } from '@/firebase';
import firebase from 'firebase/app';
export default {
  name: "Post",
  props:{
    post_id:String,
    post:Object
  },
  methods:{
    Like(){
      const post = this.post
      const like_usuario = post.likes.find(li => li.id_usuario == this.$store.state.user.id)
      if (like_usuario) {
         // si el like ya existe, se lo tengo q sacar
        // const nuevos_likes = post.likes.filter(li => li.id_usuario = this.$store.state.user.id)
        db.collection("posts").doc(post.id).update({
          contador: post.contador-1,
          likes:firebase.firestore.FieldValue.arrayRemove({
                like:"true",
                nombre_usuario:this.$store.state.user.name,
                id_usuario:this.$store.state.user.id
              })
        })}else{
          // en caso contrario le debo agregar el like
          db.collection("posts").doc(post.id).update({
            contador: post.contador+1,
            likes: [...this.post.likes, {
                      like:"true",
                      nombre_usuario:this.$store.state.user.name,
                      id_usuario: this.$store.state.user.id}]
          })
        }
    }
  }
}
</script>