<template>
  <ion-page>
    <LoaderComponent v-if="loader"></LoaderComponent>
    <ion-header :translucent="true" class="h-fit">
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
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <div>
          <h1 class="text-center !text-4xl !font-bold !mb-10 text-gray-500">
            Especialidades
          </h1>
          <div class="flex flex-col items-center justify-center gap-10">
            <ion-button
              class="h-[60px]"
              @click="$router.push('/crear-especialidad')"
              >Crear nueva especialidad</ion-button
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
import especialidadesServices from "@/services/especialidad.services.js";
import { onMounted, Ref, ref } from "vue";
import Especialidad from "@/interfaces/especialidades";
import LoaderComponent from "@/components/LoaderComponent.vue";
const headers = [
  {
    field: "id_especialidad",
    header: "ID",
  },
  {
    field: "nombre_especialidad",
    header: "Especialidad",
  },
];
const data: Ref<Especialidad[]> = ref([]);
const loader = ref(false);
const getEspecialidad = async () => {
  try {
    loader.value = true;
    const res = await especialidadesServices.getEspecialidades();
    data.value = res.data;
  } catch (error) {
    console.log(error);
  } finally {
    loader.value = false;
  }
};

onMounted(() => {
  getEspecialidad();
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
