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
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div
        id=""
        class="p-10 flex flex-col items-center justify-center min-h-[80vh]"
      >
        <div>
          <h1 class="text-center !font-bold !mb-10">Usuarios</h1>
          <div class="flex flex-col items-center justify-center gap-10">
            <ion-button>Crear nuevo usuario</ion-button>
            <ion-item>
              <ion-input></ion-input>
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
    field: "nombres",
    header: "Nombres",
  },
  {
    field: "apellidos",
    header: "Apellidos",
  },
  {
    field: "correo",
    header: "Correo",
  },
  {
    field: "rol",
    header: "Rol",
  },
  {
    field: "acciones",
    header: "Acciones",
  },
];
const data = [
  {
    id: 1,
    nombres: "Karen Adriana ",
    apellidos: "Martínez Rivera",
    correo: "ucorreosuuuuuuperlargsssssssssssssssssssso@gmail.com",
    rol: "Rol",
    acciones: "Acciones",
  },
  {
    id: 1,
    nombres: "Nombres",
    apellidos: "Apellidos",
    correo: "Correo",
    rol: "Rol",
    acciones: "Acciones",
  },
  {
    id: 1,
    nombres: "Nombres",
    apellidos: "Apellidos",
    correo: "Correo",
    rol: "Rol",
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
