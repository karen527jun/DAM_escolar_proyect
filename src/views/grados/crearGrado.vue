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
          Crear nuevo grado
        </h1>
        <div class="grid grid-cols-1 gap-6 px-4">
          <div>
            <ion-item>
              <ion-input
                v-model="v$.grado.$model"
                placeholder="Nombre del grado"
                type="text"
                label="Nombre"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.grado.$error"
              v-for="value in v$.grado.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>

          <div>
            <ion-item>
              <ion-select
                v-model="v$.id_especialidad.$model"
                placeholder="Especialidad"
                type="text"
                label="Especialidad"
              >
                <ion-select-option
                  v-for="value in especialidades"
                  :key="value.id_especialidad"
                  :value="value.id_especialidad"
                  >{{ value.nombre_especialidad }}</ion-select-option
                >
              </ion-select>
            </ion-item>
            <span
              v-if="v$.id_especialidad.$error"
              v-for="value in v$.id_especialidad.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>

          <div>
            <ion-item>
              <ion-input
                v-model="v$.anio_lectivo.$model"
                placeholder="YYYY"
                type="text"
                label="Año lectivo"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.anio_lectivo.$error"
              v-for="value in v$.anio_lectivo.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>

          <div>
            <ion-item>
              <ion-select
                v-model="v$.profesor_id.$model"
                placeholder="Nombre"
                type="text"
                label="Profesor asignado"
              >
                <ion-select-option
                  v-for="value in profesores"
                  :key="value.id_profesor"
                  :value="value.id"
                  >{{ value.nombre_completo }}</ion-select-option
                >
              </ion-select>
            </ion-item>
            <span
              v-if="v$.profesor_id.$error"
              v-for="value in v$.profesor_id.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>

          <div class="my-10 flex flex-col gap-5 justify-center mx-5">
            <ion-button
              color="primary"
              class="h-[60px] font-bold"
              @click="crearGrado()"
              >Crear</ion-button
            >
            <ion-button
              fill="outline"
              color="dark"
              class="h-[60px] font-bold"
              @click="$router.push('/grados')"
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
  toastController,
  useIonRouter,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import gradoServices from "@/services/grado.services"; // Debes crear este servicio
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers } from "@vuelidate/validators";
import profesorServices from "@/services/profesor.services";
import especialidadServices from "@/services/especialidad.services";

const router = useIonRouter();

const grado = ref({
  grado: "",
  profesor_id: "",
  id_especialidad: "",
  anio_lectivo: "",
});

const rules = {
  grado: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
  profesor_id: {
    required: helpers.withMessage("El profesor es requerido", required),
  },
  id_especialidad: {
    required: helpers.withMessage("La especialidad es requerida", required),
  },
  anio_lectivo: {
    required: helpers.withMessage("El año es requerido", required),
  },
};

const v$ = useVuelidate(rules, grado);

const crearGrado = async () => {
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
    const res = await gradoServices.postGrado(grado.value);
    console.log(res);
    if (res.status === 200) {
      const toast = await toastController.create({
        message: "Grado creado con éxito",
        duration: 2000,
        color: "success",
      });
      toast.present();
      grado.value = {
        grado: "",
        profesor_id: "",
        id_especialidad: "",
        anio_lectivo: "",
      };
      router.push("/grados");
    } else {
      const toast = await toastController.create({
        message: "Error al crear el grado",
        duration: 2000,
        color: "danger",
      });
      toast.present();
    }
  } catch (error) {
    console.log(error);
  }
};

const profesores = ref([]);
const getProfesores = async () => {
  try {
    const res = await profesorServices.getProfesores();
    profesores.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

const especialidades = ref([]);
const getEspecialidades = async () => {
  try {
    const res = await especialidadServices.getEspecialidades();
    especialidades.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getProfesores();
  getEspecialidades();
});
</script>

<style scoped>
#container {
  text-align: center;
}
</style>
