import vue from 'vue'
import VueRouter from 'vue-router'

vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'MainView',
        component: () => import('../views/MainView.vue'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/Home/HomeView.vue'),
                
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/User/UserView.vue')
            },
        ]
    },
    
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router