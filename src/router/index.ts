import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: () => import ('../views/dashBoard.vue')
  },
  {
    path: '/login',
    component: () => import ('../views/auth/loginView.vue')
  },
  {
    path: '/usuarios',
    component: () => import ('../views/usuarios/index.vue')
  },
  {
    path: '/materias',
    component: () => import ('../views/materias/index.vue')
  },
  {
    path: '/grados',
    component: () => import ('../views/grados/index.vue')
  },
  {
    path: '/secciones',
    component: () => import ('../views/secciones/index.vue')
  },
  {
    path: '/profesores',
    component: () => import ('../views/profesores/index.vue')
  },
  {
    path: '/Asistencia',
    component: () => import ('../views/asistencia/index.vue')
  },
  {
    path: '/estudiantes',
    component: () => import ('../views/estudiantes/index.vue')
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
