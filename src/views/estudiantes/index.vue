<template>
  <ion-page>
    <LoaderComponent v-if="loader"></LoaderComponent>
    <ion-header :translucent="true">
      <ion-toolbar class="h-[80px] flex items-center px-10">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Sistema de gestión escolar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div>
        <div>
          <h1 class="text-center !text-4xl !font-bold !mb-10 text-gray-500">
            Estudiantes
          </h1>
          <div class="flex flex-col items-center justify-center gap-10">
            <ion-button
              class="h-[60px]"
              @click="$router.push('/crear-estudiante')"
              >Crear nuevo estudiante</ion-button
            >
            <ion-item>
              <ion-input
                v-model="busqueda"
                placeholder="Buscar alumno..."
                @ionInput="filtrarAlumnos"
              ></ion-input>
            </ion-item>
            <CardDataComponent :headers="headers" :data="estudiantesFiltrados">
              <template v-slot:acciones="{ item }: profesores">
                <div class="flex gap-2 mb-5">
                  <ion-button
                    @click="editarProfesor(item.id)"
                    color="primary"
                    fill="outline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#2e48fd"
                    >
                      <path
                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
                      />
                    </svg>
                  </ion-button>
                  <ion-button color="danger" fill="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e5000b"
                    >
                      <path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                      />
                    </svg>
                  </ion-button>
                </div>
              </template>
              <template v-slot:estado="{ item, template }">
                <div
                  class="py-2 px-6 rounded-full border"
                  :class="
                    item.estado
                      ? 'bg-green-100 border-green-600 text-green-600 font-bold'
                      : 'bg-red-100 border-red-600 text-red-600 font-bold'
                  "
                >
                  {{ item.estado ? "Activo" : "Inactivo" }}
                </div>
              </template>
            </CardDataComponent>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonItem,
  IonInput,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/vue";
import Estudiante from "@/interfaces/estudiantes";
import CardDataComponent from "@/components/CardDataComponent.vue";
import estudiantesService from "@/services/estudiantes.services.js";
import { computed, onMounted, Ref, ref } from "vue";
import LoaderComponent from "@/components/LoaderComponent.vue";

// import estudiantes from "@/interfaces/.ts";
import router from "@/router";

const busqueda = ref("");
const headers = [
  {
    field: "NIE",
    header: "NIE",
  },
  {
    field: "nombre_completo",
    header: "Nombre",
  },
  {
    field: "correo",
    header: "Correo",
  },
  {
    field: "nombre_responsable",
    header: "Nombre de persona responsable",
  },
  {
    field: "telefono_de_emergencia",
    header: "Telefono",
  },
  {
    field: "direccion",
    header: "Dirección",
  },
  {
    field: "lugar_de_nacimiento",
    header: "Lugar de nacimiento",
  },
  {
    field: "genero_del_alumno",
    header: "Género",
  },
  {
    field: "estado_profe",
    header: "Estado",
    template: true,
    template_name: "estado",
  },
  {
    field: "acciones",
    header: "Acciones",
  },
];
const data: Ref<Estudiante[]> = ref([]);
const loader = ref(false);
const getData = async () => {
  try {
    loader.value = true;
    const res = await estudiantesService.getEstudiantes();
    data.value = res.data;
  } catch (error) {
    console.log(error);
  } finally {
    loader.value = false;
  }
};

const estudiantesFiltrados = computed(() => {
  if (!busqueda.value) return data.value;

  return data.value.filter((estudiante) =>
    estudiante.nombre_completo
      .toLowerCase()
      .includes(busqueda.value.toLowerCase())
  );
});

onMounted(() => {
  getData();
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
