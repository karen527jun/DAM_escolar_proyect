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
            Asistencia
          </h1>
          <div class="flex flex-col items-center justify-center gap-10">
            <!-- <ion-button
              class="h-[60px]"
              @click="$router.push('/crear-asistencia')"
              >Crear nueva asistencia</ion-button -->
            <!-- > -->
            <CardDataComponent :headers="headers" :data="grados">
              <template v-slot:acciones="{ item }">
                <div class="flex gap-2">
                  <ion-button
                    color="primary"
                    @click="$router.push(`/crear-asistencia/${item.id_grado}`)"
                    >Agregar Asistencia</ion-button
                  >
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
import gradoServices from "@/services/grado.services";
import Grado from "@/interfaces/Grados";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  toastController,
} from "@ionic/vue";
import { onMounted, Ref, ref } from "vue";
import LoaderComponent from "@/components/LoaderComponent.vue";

const headers = [
  {
    field: "seccion",
    header: "Seccion",
  },
  {
    field: "nombre_grado",
    header: "Grado",
  },
  {
    field: "especialidad",
    header: "Especialidad",
  },
  {
    field: "year",
    header: "Año",
  },
  {
    field: "acciones",
    header: "Acciones",
  },
];

const data = ref([
  {
    id: 1,
    seccion: "A",
    estado: "Presente",
    grado: "Primero",
  },
  {
    id: 2,
    seccion: "A",
    estado: "Presente",
    grado: "Segundo",
  },
  {
    id: 3,
    seccion: "A",
    estado: "Presente",
    grado: "Tercero",
  },
]);

const loader = ref(false);
const grados: Ref<Grado[]> = ref([]);
const getSecciones = async () => {
  try {
    loader.value = true;
    const res = await gradoServices.getGrados();
    grados.value = res.data.filter((grado) => grado.seccion !== null);
  } catch (error) {
    console.log(error);
    let toast = await toastController.create({
      message: "Error al obtener la data",
      duration: 2000,
      color: "danger",
    });
    return toast.present();
  } finally {
    loader.value = false;
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
