<template>
  <div>
    <div class="row">
      <form v-on:submit.prevent="Login">
        <div class="col s12 m8 l4 offset-m2 offset-l4">
          <div class="card">
            <div class="card-action teal lighten-1 white-text">
              <h5 id="titulo">Login</h5>
            </div>
            <div class="card-content">
              <div class="input-field">
                <label>Email</label>
                <input type="email" v-model="usuario" class="validate" required>
              </div>
              <div class="input-field">
                <label>Contraseña</label>
                <input type="password" v-model="pass1" class="validate" required>
              </div>
              <span>{{error}}</span>
              <div class="form-field">
                <button type="submit"  class="btn-large waves-effect waves-dark" style="width:100%;">Ingresar</button>
              </div><br>
             <p>No tienes cuenta aún registrate<router-link :to="{path:'/registro'}"> acá</router-link></p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Formulario",
  data(){
    return{
      usuario: "",
      pass1:"",
    }
  },
  computed:{
    error(){
      return this.$store.state.error
    }
  },
  methods: {
    Login(){
      const datos = {email: this.usuario, password: this.pass1};
      this.$store.dispatch('login', datos)
    }      
  }
}
</script>

