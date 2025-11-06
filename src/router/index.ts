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
    component: () => import ('../views/usuarios/index.vue'),
  },
  {
    path: '/crear-usuarios',
    component: () => import ('../views/usuarios/crearUsuario.vue')
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
    path: '/crear-profesor',
    component: () => import ('../views/profesores/crearProfesor.vue')
  },
  {
    path: '/Asistencia',
    component: () => import ('../views/asistencia/index.vue')
  },
  {
    path: '/estudiantes',
    component: () => import ('../views/estudiantes/index.vue')
  },
  {
    path: '/especialidades',
    component: () => import ('../views/especialidad/index.vue')
  },
  {
    path: '/crear-especialidad',
    component: () => import ('../views/especialidad/crearEspecialidad.vue')
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
