<template>
  <div>
   <ul class="collection">
      <li class="collection-item avatar">
        <img :src="!post.usuario.img ? 'https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg' : post.usuario.img"  alt="" class="circle">
        <span class="title">{{post.usuario.nombre}}</span>
        <read-more more-str="leer más..." :text="post.comentario" link="#" less-str="leer menos.." :max-chars="115"></read-more>
        <p>
          <span class="fecha">{{post.fecha}}</span>
          <a v-on:click="Like(post.id)" >
            <i class="material-icons" v-bind:class="{like: post.likes.id_usuario == this.$store.state.user.id,dislike: post.likes.id_usuario != this.$store.state.user.id}" >favorite</i>
          </a>
          <span class="likes">{{post.contador}}</span>
        </p>
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
  computed:{
    user(){
      return this.$store.state.user
    }
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
                nombre_usuario:this.$store.state.user.name,
                id_usuario:this.$store.state.user.id,
              })
        })}else{
          // en caso contrario le debo agregar el like
          db.collection("posts").doc(post.id).update({
            contador: post.contador+1,
            likes: [...this.post.likes, {
                      nombre_usuario:this.$store.state.user.name,
                      id_usuario: this.$store.state.user.id}]
          })
        }
    }
  }
}
</script>
<style>
.fecha{
  font-size: 8pt;
  margin-right: 55%;
}
.likes{
  font-size: 9pt;
  vertical-align:top;
  margin-left: 1.7%;
}
.collection .collection-item{
  background-color: #E8E9EE!important;
  border-radius:2px;
}
a i.like{
  color: #38AFA0 ; 
} 
a i.dislike{
  color: #70767D; 
}
</style>