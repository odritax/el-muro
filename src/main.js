
import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth'
import './firebase.js'
// import VueFirestore from 'vue-firestore';
import App from './App.vue';
import router from './router';  // añadimos esta línea
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

Vue.config.productionTip = false

Vue.use(Vuex)
// Vue.use(VueFirestore, {key: 'id'});
const store = new Vuex.Store({
  state: {
      user: null,
      error: null
  },
  mutations: {
    set_user(state, new_user) {
    state.user = new_user;
    },
    set_error(state,new_error) {
        if (new_error=="Password should be at least 6 characters"){
            state.error = "La contraseña debe tener más de 6 carácteres";
        }else if(new_error=="The email address is already in use by another account."){
            state.error="Intente con otro email el ingresado ya existe";
        }else if(new_error=="The password is invalid or the user does not have a password."){
            state.error="La contraseña es incorrecta";
        }else if(new_error=="There is no user record corresponding to this identifier. The user may have been deleted."){
            state.error="El usuario no existe"
        }else{
            state.error=new_error;
        }
    }
  },
  actions: {
     registro(context,datos){
        firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password)          
        //cuando el registro es exitoso
         .then(function(respuesta){
             console.log(respuesta)
             context.commit('set_error', null);
             context.commit('set_user', datos.email);
             router.push('/success');
         })
         .catch(function(error){
             console.log(error)
             context.commit('set_error', error.message);
             context.commit('set_user', null);
         })
     },
     login(context,datos){
        firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
        .then(function(response){
          console.log(response)
          console.log(datos.email)
          context.commit('set_error', null);
          context.commit('set_user', datos.email);
          router.push('/success');
        })
        .catch(function(error){
          context.commit('set_error', error.message);
          context.commit('set_user', null);
        })
      },
  }
})
new Vue({
    store,
    render: h => h(App),
    router,                  
}).$mount('#app')