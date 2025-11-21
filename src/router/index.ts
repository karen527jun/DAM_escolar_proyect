import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    component: () => import("../views/dashBoard.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/auth/loginView.vue"),
  },
  {
    path: "/usuarios",
    component: () => import("../views/usuarios/index.vue"),
  },
  {
    path: "/crear-usuarios",
    component: () => import("../views/usuarios/crearUsuario.vue"),
  },
  {
    path: "/grados",
    component: () => import("../views/grados/index.vue"),
  },
  {
    path: "/crear-grado",
    component: () => import("../views/grados/crearGrado.vue"),
  },
  {
    path: "/editar-grado/:id",
    name: "editarGrado",
    component: () => import("../views/grados/editarGrado.vue"),
  },

  {
    path: "/secciones",
    component: () => import("../views/secciones/index.vue"),
  },
  {
    path: "/crear-seccion",
    component: () => import("../views/secciones/CrearSecciones.vue"),
  },
  {
    path: "/profesores",
    component: () => import("../views/profesores/index.vue"),
  },
  {
    path: "/crear-profesor",
    component: () => import("../views/profesores/crearProfesor.vue"),
  },
  {
    path: "/editar-profesor/:id",
    name: "editarProfesor",
    component: () => import("../views/profesores/editarProfesor.vue"),
  },
  {
    path: "/Asistencia",
    component: () => import("../views/asistencia/index.vue"),
  },
  {
    path: "/crear-asistencia/:id",
    component: () => import("../views/asistencia/crearAsistencia.vue"),
  },
  {
    path: "/editar-asistencia/:id",
    name: "editarAsistencia",
    component: () => import("../views/asistencia/editarAsistencia.vue"),
  },
  {
    path: "/estudiantes",
    component: () => import("../views/estudiantes/index.vue"),
  },
  {
    path: "/crear-estudiante",
    component: () => import("../views/estudiantes/crearEstudiante.vue"),
  },
  {
    path: "/crear-matricula/:nie",
    component: () => import("../views/estudiantes/crearMatricula.vue"),
  },
  {
    path: "/especialidades",
    component: () => import("../views/especialidad/index.vue"),
  },
  {
    path: "/crear-especialidad",
    component: () => import("../views/especialidad/crearEspecialidad.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  const publicRoutes = ["/login"];

  if (publicRoutes.includes(to.path)) {
    if (token && to.path === "/login") {
      next("/dashboard");
    } else {
      next();
    }
    return;
  }

  if (!token) {
    return next("/login");
  }

  next();
});

export default router;
