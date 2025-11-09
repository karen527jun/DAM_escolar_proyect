<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="h-[80px] flex items-center">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Sistema de gestión escolar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div>
        <h1 class="text-center !font-bold !mb-10 text-gray-500">
          Editar grado
        </h1>
        <div class="grid grid-cols-1 gap-6 px-4">
          <div>
            <ion-item>
              <ion-input
                v-model="v$.nombre.$model"
                placeholder="Nombre del grado"
                type="text"
                label="Nombre"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.nombre.$error"
              v-for="value in v$.nombre.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>

          <div>
            <ion-item>
              <ion-input
                v-model="v$.seccion.$model"
                placeholder="Sección"
                type="text"
                label="Sección"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.seccion.$error"
              v-for="value in v$.seccion.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>

          <div>
            <ion-item>
              <ion-input
                v-model="v$.cupos.$model"
                placeholder="Cupos"
                type="number"
                label="Cupos"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.cupos.$error"
              v-for="value in v$.cupos.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>

          <div class="my-10 flex flex-col gap-5 justify-center mx-5">
            <ion-button
              color="primary"
              class="h-[60px] font-bold"
              @click="actualizarGrado()"
            >Actualizar</ion-button>
            <ion-button
              fill="outline"
              color="dark"
              class="h-[60px] font-bold"
              @click="$router.push('/grados')"
            >Cancelar</ion-button>
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
  toastController,
  useIonRouter,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import gradoServices from "@/services/grado.services";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers } from "@vuelidate/validators";

const router = useIonRouter();
const route = useRoute();

const grado = ref({
  nombre: "",
  seccion: "",
  cupos: 0,
});

const rules = {
  nombre: { required: helpers.withMessage("El nombre es requerido", required) },
  seccion: { required: helpers.withMessage("La sección es requerida", required) },
  cupos: { 
    required: helpers.withMessage("Los cupos son requeridos", required),
    minValue: helpers.withMessage("Debe haber al menos 1 cupo", minValue(1))
  },
};

const v$ = useVuelidate(rules, grado);

const obtenerGrado = async () => {
  try {
    const id = route.params.id;
    const res = await gradoServices.getGrado(id);
    if (res.status === 200) {
      grado.value = res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const actualizarGrado = async () => {
  try {
    if (v$.value.$invalid) {
      v$.value.$touch();
      const toast = await toastController.create({
        message: "Todos los campos son requeridos",
        duration: 2000,
        color: "danger",
      });
      return toast.present();
    }

    const id = route.params.id;
    const res = await gradoServices.putGrado(id, grado.value);
    if (res.status === 200) {
      const toast = await toastController.create({
        message: "Grado actualizado con éxito",
        duration: 2000,
        color: "success",
      });
      toast.present();
      router.push("/grados");
    } else {
      const toast = await toastController.create({
        message: "Error al actualizar el grado",
        duration: 2000,
        color: "danger",
      });
      toast.present();
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  obtenerGrado();
});
</script>

<style scoped>
#container { text-align: center; }
</style>
