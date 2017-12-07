import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Nomes from '@/components/Nomes'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/n',
            name: 'nomes',
            component: Nomes
        }
    ]
})
