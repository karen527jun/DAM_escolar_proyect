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
                v-model="v$.grado.$model"
                placeholder="Nombre del grado"
                type="text"
                label="Nombre"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.grado.$error"
              v-for="value in v$.grado.$errors"
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
                  :value="value.id_especialidad"
                  :key="value"
                >
                  {{ value.nombre_especialidad }}
                </ion-select-option>
              </ion-select>
            </ion-item>
            <span
              v-if="v$.id_especialidad.$error"
              v-for="value in v$.id_especialidad.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>

          <div>
            <ion-item>
              <ion-input
                v-model="v$.anio_lectivo.$model"
                placeholder="Año lectivo"
                type="number"
                label="Año lectivo"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.anio_lectivo.$error"
              v-for="value in v$.anio_lectivo.$errors"
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
              @click="actualizarGrado()"
              >Actualizar</ion-button
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
  IonSelect,
  IonSelectOption,
  useIonRouter,
  onIonViewWillEnter,
} from "@ionic/vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import gradoServices from "@/services/grado.services";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers } from "@vuelidate/validators";
import especialidadesServices from "@/services/especialidad.services";
import profesorServices from "@/services/profesor.services";

const router = useIonRouter();
const route = useRoute();

const grado = ref({
  grado: "",
  id_especialidad: "",
  anio_lectivo: 0,
  profesor_id: "",
});

const rules = {
  grado: { required: helpers.withMessage("El nombre es requerido", required) },
  id_especialidad: {
    required: helpers.withMessage("La sección es requerida", required),
  },
  anio_lectivo: {
    required: helpers.withMessage("Los cupos son requeridos", required),
    minValue: helpers.withMessage("Debe haber al menos 1 cupo", minValue(1)),
  },
  profesor_id: {
    required: helpers.withMessage("El profesor es requerido", required),
  },
};

const v$ = useVuelidate(rules, grado);

const obtenerGrado = async () => {
  try {
    const id = route.params.id;
    const res = await gradoServices.getGradoById({
      table: "grados",
      column: "id_grado",
      valor: id,
    });
    grado.value.grado = res.data[0][0].grado;
    grado.value.id_especialidad = res.data[0][0].id_especialidad;
    grado.value.anio_lectivo = res.data[0][0].anio_lectivo;
    grado.value.profesor_id = res.data[0][0].profesor_id;
  } catch (error) {
    console.log(error);
  }
};
const especialidades = ref([]);
const getEspecialidades = async () => {
  try {
    const res = await especialidadesServices.getEspecialidades();
    especialidades.value = res.data;
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
    const res = await gradoServices.updateGrado({
      id_grado: id,
      grado: grado.value.grado,
      id_especialidad: grado.value.id_especialidad,
      anio_lectivo: grado.value.anio_lectivo,
      profesor_id: grado.value.profesor_id,
    });
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

onIonViewWillEnter(() => {
  obtenerGrado();
  getEspecialidades();
  getProfesores();
});
</script>

<style scoped>
#container {
  text-align: center;
}
</style>
