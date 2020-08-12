<template>
  <div>
    <a @click="Salir">Salir</a>
    <h3>Bienvenido {{user.name}}</h3>
  </div>
</template>
<script>
export default {
  name:'Success',
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  methods:{
    Salir(){
      this.$store.dispatch('Salir');
    }
  }
}
</script>