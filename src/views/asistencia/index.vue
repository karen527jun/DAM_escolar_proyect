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
            Asistencia
          </h1>
          <div class="flex flex-col items-center justify-center gap-10">
            <!-- <ion-button
              class="h-[60px]"
              @click="$router.push('/crear-asistencia')"
              >Crear nueva asistencia</ion-button -->
            <!-- > -->
            <CardDataComponent :headers="headers" :data="data">
              <template v-slot:acciones="{ item }">
                <div class="flex gap-2">
                  <ion-button
                    color="primary"
                    @click="$router.push(`/crear-asistencia/${item.id}`)"
                    >Agregar Asistencia</ion-button
                  >
                  <ion-button color="danger">Eliminar</ion-button>
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
import CardDataComponent from "@/components/CardDataComponent.vue";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { ref } from "vue";

const headers = [
  {
    field: "id",
    header: "ID",
  },
  {
    field: "fecha",
    header: "Fecha",
  },
  {
    field: "hora",
    header: "Hora",
  },
  {
    field: "estado",
    header: "Estado",
  },
  {
    field: "grado",
    header: "Grado",
  },
  {
    field: "acciones",
    header: "Acciones",
  },
];

const data = ref([
  {
    id: 1,
    fecha: "2023-02-03",
    hora: "12:00",
    estado: "Presente",
    grado: "Primero",
  },
  {
    id: 2,
    fecha: "2023-02-03",
    hora: "12:00",
    estado: "Presente",
    grado: "Segundo",
  },
  {
    id: 3,
    fecha: "2023-02-03",
    hora: "12:00",
    estado: "Presente",
    grado: "Tercero",
  },
]);
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
