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
            Secciones
          </h1>
          <div class="flex flex-col items-center justify-center gap-10">
            <ion-button class="h-[60px]" @click="$router.push('/crear-seccion')"
              >Crear nueva Sección</ion-button
            >
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
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/vue";
import CardDataComponent from "@/components/CardDataComponent.vue";
import Seccion from "@/interfaces/secciones";
import { onMounted, Ref, ref } from "vue";
import seccionServices from "@/services/seccion.services";

const headers = [
  {
    field: "nombre_seccion",
    header: "Sección",
  },
  {
    field: "acciones",
    header: "Acciones",
  },
];
const data: Ref<Seccion[]> = ref([]);

const getSecciones = async () => {
  try {
    const res = await seccionServices.getSecciones();
    console.log(res.data);
    data.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getSecciones();
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
