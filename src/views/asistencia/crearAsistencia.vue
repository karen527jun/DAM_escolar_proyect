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
          Crear nueva asistencia
        </h1>
        <div class="grid grid-cols-1 gap-6 px-4">
          <div>
            <span
              v-if="v$.nombre_especialidad.$error"
              v-for="value in v$.nombre_especialidad.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div>
            <ion-item>
              <ion-input
                v-model="v$.nombre_especialidad.$model"
                placeholder="00/00/0000"
                type="text"
                label="Fecha"
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
              @click="crearEspecialidad()"
              >Crear</ion-button
            >
            <ion-button
              fill="outline"
              color="dark"
              class="h-[60px] font-bold"
              @click="$router.push('/asistencia')"
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
} from "@ionic/vue";
import { ref } from "vue";
import profesorServices from "@/services/profesor.services";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import especialidadServices from "@/services/especialidad.services.js";
const router = useIonRouter();
const alumnos = [
  {
    Nombre: "Pedro",
    Apellido: "Perez",
    NIE: "12345678A",
  },
  {
    Nombre: "Pedro",
    Apellido: "Perez",
    NIE: "12345678A",
  },
  {
    Nombre: "Pedro",
    Apellido: "Perez",
    NIE: "12345678A",
  },
  {
    Nombre: "Pedro",
    Apellido: "Perez",
    NIE: "12345678A",
  },
];

const especialidad = ref({
  nombre_especialidad: "",
});
const rules = {
  nombre_especialidad: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
};
const v$ = useVuelidate(rules, especialidad);

const crearEspecialidad = async () => {
  try {
    if (v$.value.$invalid) {
      return;
    }
    const res = await especialidadServices.postEspecialidades(
      especialidad.value
    );
    router.back();
  } catch (error) {
    console.log(error);
  }
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
