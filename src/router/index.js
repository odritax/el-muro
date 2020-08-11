import Vue from 'vue';
import VueRouter from 'vue-router';
import formulario from '@/components/Formulario.vue';  
import success from '@/components/Success.vue';  
import login from '@/components/Login.vue';  
import notfound from '@/components/NotFound.vue'; 

Vue.use(VueRouter);    

export default new VueRouter({
    routes: [
        {
            path: '/registro', 
            component: formulario
        },
        {
          path:'/success',
          component:success
        },
        {
            path:'/',
            component: login
        },
        {
            path:'*',
            component:notfound
        }
    ]
})