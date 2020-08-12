import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app'
import formulario from '@/components/Formulario.vue';  
import home from '@/components/Success.vue';  
import login from '@/components/Login.vue';  
import notfound from '@/components/NotFound.vue'; 

Vue.use(VueRouter);    

const router= new VueRouter({
    routes: [
        {
            path: '/registro', 
            component: formulario
        },
        {
            path:'/',
            component:home,
            meta: {
            requiresAuth: true,
            },
        },
        {
            path:'/login',
            component: login
        },
        {
            path:'*',
            component:notfound
        }
    ]
})
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  if (to.meta.requiresAuth && currentUser==null) next('/login') 
  else next()
})
export default router;