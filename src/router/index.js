import { createRouter, createWebHashHistory } from 'vue-router'
import Container from '../views/Container'

const routes = [
  {
    path: '/',
    name: 'Container',
    component: Container,
    redirect: '/main',
    children: [
      {
        path: 'main',
        component: () => import('../views/Container/Main'),
      },
      {
        path: 'movies',
        component: () => import('../views/Container/Movies'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
  },
  //
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/NotFound'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
