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
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Estudiantes</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="p-10 flex flex-col items-center justify-center min-h-[80vh]">
        <div>
          <h1 class="text-center !font-bold !mb-10 text-2xl">Estudiantes</h1>

          <div class="flex flex-col items-center justify-center gap-6 w-full">
            <ion-button color="primary">Agregar nuevo estudiante</ion-button>
            <ion-item class="w-full max-w-lg">
              <ion-input placeholder="Buscar estudiante..."></ion-input>
            </ion-item>
            <CardDataComponent :headers="headers" :data="data">
              <template #acciones="{ row }">
                <div class="flex gap-2">
                  <ion-button color="primary" @click="editar(row)">
                    Editar
                  </ion-button>
                  <ion-button color="danger" @click="eliminar(row)">
                    Eliminar
                  </ion-button>
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
import CardDataComponent from "@/components/CardDataComponent.vue";

const headers = [
  { field: "id", header: "ID" },
  { field: "nombres", header: "Nombres" },
  { field: "apellidos", header: "Apellidos" },
  { field: "grado", header: "Grado" },
  { field: "seccion", header: "Sección" },
  { field: "acciones", header: "Acciones" },
];

const data = [
  {
    id: 1,
    nombres: "María Fernanda",
    apellidos: "López Gómez",
    grado: "9°",
    seccion: "A",
  },
  {
    id: 2,
    nombres: "Carlos Alberto",
    apellidos: "Hernández Ruiz",
    grado: "8°",
    seccion: "B",
  },
  {
    id: 3,
    nombres: "Lucía Alejandra",
    apellidos: "Martínez Rivera",
    grado: "7°",
    seccion: "C",
  },
];

const editar = (row: any) => {
  console.log("Editar estudiante:", row);
};

const eliminar = (row: any) => {
  console.log("Eliminar estudiante:", row);
};
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
