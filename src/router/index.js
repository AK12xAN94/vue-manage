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
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: () => import('../views/Home/HomeView.vue'),
                
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: () => import('../views/User/UserView.vue')
            // },
            // {
            //     path: '/mall',
            //     name: 'mall',
            //     component: () => import('../views/Mall/MallView.vue')
            // },
            // {
            //     path: '/page1',
            //     name: 'page1',
            //     component: () => import('../views/Other/PageOneView.vue')
            // },
            // {
            //     path: '/page2',
            //     name: 'page2',
            //     component: () => import('../views/Other/PageTwoView.vue')
            // },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/LoginView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router