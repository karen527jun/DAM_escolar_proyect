<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary" class="h-[80px] flex items-center px-10">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Sistema de gestión escolar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Grados</ion-title>
        </ion-toolbar>
      </ion-header>

      <div
        class="p-10 flex flex-col items-center justify-center min-h-[80vh]"
      >
        <div>
          <h1 class="text-center !font-bold !mb-10">Grados</h1>
          <div class="flex flex-col items-center justify-center gap-10">
            <ion-button color="primary">Crear nuevo grado</ion-button>

            <ion-item>
              <ion-input placeholder="Buscar grado..."></ion-input>
            </ion-item>

            <CardDataComponent :headers="headers" :data="data">
              <template #acciones>
                <div class="flex gap-2">
                  <ion-button color="primary">Editar</ion-button>
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
  {
    field: "id",
    header: "ID",
  },
  {
    field: "nombre",
    header: "Nombre del grado",
  },
  {
    field: "seccion",
    header: "Sección",
  },
  {
    field: "cupos",
    header: "Cupos",
  },
  {
    field: "acciones",
    header: "Acciones",
  },
];

const data = [
  {
    id: 1,
    nombre: "Primer Grado",
    seccion: "A",
    cupos: 25,
    acciones: "Acciones",
  },
  {
    id: 2,
    nombre: "Segundo Grado",
    seccion: "B",
    cupos: 28,
    acciones: "Acciones",
  },
  {
    id: 3,
    nombre: "Tercer Grado",
    seccion: "C",
    cupos: 30,
    acciones: "Acciones",
  },
];
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
