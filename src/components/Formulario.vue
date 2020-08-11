<template>
  <div id="formulario">
    <router-link :to="{path:'/'}" id="boton" class="waves-effect waves-light btn-small right">Login</router-link>
    <div class="row">
      <form v-on:submit.prevent="Registrar">
        <div class="col s12 m8 l4 offset-m2 offset-l4">
          <div class="card">
            <div class="card-action teal lighten-1 white-text">
              <h5 id="titulo">Registro</h5>
            </div>
            <div class="card-content">
              <div class="input-field">
                <label>Email</label>
                <input type="email" v-model="usuario" class="validate" required>
              </div>
              <div class="input-field">
                <label>Contraseña</label>
                <input type="text" v-model="pass1" class="validate" required>
              </div>
              <div class="input-field">
                <label>Confirma tu contraseña</label>
                <input type="text" id="validar" v-model="pass2" class="validate" required>
              </div>
              <span id="mensaje">{{error}}</span>
              <div class="form-field">
              <button type="submit"  class="btn-large waves-effect waves-dark" style="width:100%;">Registrar</button>
              </div><br>
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
    pass2:""
    }
  },
  computed:{
    error(){
      return this.$store.state.error
    }
  },
  methods: {
    Registrar(){
    // document.getElementById('validar').setCustomValidity('');
    if(this.pass1!=this.pass2){
      alert('las contraseñas no coinciden')
      // document.getElementById('validar').setCustomValidity('Las contraseñas no coinciden');
      return;
    }
    const datos={email:this.usuario,password:this.pass1}
    this.$store.dispatch("registro",datos);
  //   this.$store.commit("setUserId",this.usuario);
    }
  }
}
</script>
<style>
#boton{
  position: relative;
  top: -50px;
  margin-right:10%;
}
</style>


