<template>
  <ion-page>
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
            Grados disponibles
          </h1>
          <div
            class="bg-yellow-100 border-2 border-yellow-500 m-5 p-2 text-yellow-800 rounded-xl"
          >
            <strong> Asignación de Grado Obligatoria:</strong> No se puede
            guardar ni completar el perfil de este alumno sin asignarle
            un<strong> Grado</strong> .
          </div>
          <ion-radio-group>
            <div
              v-for="grado in 5"
              class="border border-gray-200 rounded-3xl p-10 shadow-lg m-5"
            >
              <ion-item>
                <ion-radio>Grado {{ grado }}</ion-radio>
              </ion-item>
            </div>
          </ion-radio-group>
          <div class="w-full flex items-center justify-center pb-5">
            <ion-button>Guardar información</ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import CardDataComponent from "@/components/CardDataComponent.vue";
import estudiantesService from "@/services/estudiantes.services.js";
import { onMounted, ref } from "vue";
// import estudiantes from "@/interfaces/.ts";
import router from "@/router";

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
const data = ref([]);

const getData = async () => {
  try {
    const res = await estudiantesService.getEstudiantes();
    data.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

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

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
