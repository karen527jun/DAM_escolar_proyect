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
        <h1 class="text-center !font-bold !my-10 text-gray-500">
          Crear nueva especialidad
        </h1>
        <div class="grid grid-cols-1 gap-6 px-4">
          <div>
            <ion-item>
              <ion-input
                v-model="v$.nombre_especialidad.$model"
                placeholder="Especialidad"
                type="text"
                label="Especialidad"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.nombre_especialidad.$error"
              v-for="value in v$.nombre_especialidad.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div class="my-10 flex flex-col gap-5 justify-center mx-5">
            <ion-button
              color="primary"
              class="h-[60px] font-bold"
              @click="editarEspecialidad()"
              >Editar</ion-button
            >
            <ion-button
              fill="outline"
              color="dark"
              class="h-[60px] font-bold"
              @click="$router.push('/especialidades')"
              >Cancelar</ion-button
            >
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
  IonRadio,
  IonRadioGroup,
  IonLabel,
  useIonRouter,
  toastController,
  onIonViewWillEnter,
} from "@ionic/vue";
import { ref } from "vue";
import profesorServices from "@/services/profesor.services";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import especialidadServices from "@/services/especialidad.services.js";
import { useRouter } from "vue-router";
const router = useIonRouter();
const route = useRouter();
const especialidad = ref({
  nombre_especialidad: "",
});
const rules = {
  nombre_especialidad: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
};
const v$ = useVuelidate(rules, especialidad);

const getEspecialidad = async () => {
  try {
    const res = await especialidadServices.getEspecialidadById({
      valor: route.currentRoute.value.params.id,
      table: "especialidad",
      column: "id_especialidad",
    });
    especialidad.value = res.data[0][0];
  } catch (error) {
    console.log(error);
  }
};
const editarEspecialidad = async () => {
  try {
    if (v$.value.$invalid) {
      return;
    }
    const res = await especialidadServices.putEspecialidades({
      id_especialidad: route.currentRoute.value.params.id,
      nombre_especialidad: especialidad.value.nombre_especialidad,
    });
    let toast = await toastController.create({
      message: "Especialidad editada con exito",
      duration: 2000,
      color: "success",
    });
    toast.present();
    router.back();
  } catch (error) {
    console.log(error);
  }
};

onIonViewWillEnter(() => {
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
