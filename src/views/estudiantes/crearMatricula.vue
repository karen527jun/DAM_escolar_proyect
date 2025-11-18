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
            Secciones disponibles
          </h1>
          <div
            class="bg-yellow-100 border-2 border-yellow-500 m-5 p-2 text-yellow-800 rounded-xl"
          >
            <strong> Asignación de Sección Obligatoria:</strong> No se puede
            guardar ni completar el perfil de este alumno sin asignarle
            una<strong> sección</strong> .
          </div>
          <div class="border m-5 rounded-xl shadow-md border-gray-400 p-5">
            <ionRadioGroup
              v-if="data.length > 0"
              @ion-change="handleChange($event)"
            >
              <IonItem
                v-for="item in data"
                :key="item.id_seccion"
                class="flex justify-between px-10 py-2 w-full border-b border-gray-400"
              >
                <IonLabel
                  >{{ item.nombre_grado }} {{ item.nombre_seccion }}</IonLabel
                >
                <IonRadio
                  class="border rounded-full border-gray-300"
                  :value="item.id_seccion"
                />
              </IonItem>
            </ionRadioGroup>
          </div>
          <div
            @click="crearMatricula()"
            class="w-full flex items-center justify-center pb-5"
          >
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
  IonButton,
  IonRadio,
  IonRadioGroup,
} from "@ionic/vue";
import seccionesServices from "@/services/seccion.services.js";
import { onMounted, ref } from "vue";
// import estudiantes from "@/interfaces/.ts";
import router from "@/router";
import estudiantesServices from "@/services/estudiantes.services";
const matricula = ref({
  seccion: "",
  nie: router.currentRoute.value.params.nie,
});
const data = ref([]);

const getData = async () => {
  try {
    const res = await seccionesServices.getSecciones();
    data.value = res.data;
  } catch (error) {
    console.log(error);
  }
};
const handleChange = (event) => {
  matricula.value.seccion = event.detail.value;
};
const crearMatricula = async () => {
  try {
    const res = await estudiantesServices.postMatricula(matricula.value);
    console.log(res);

    router.push("/estudiantes");
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
