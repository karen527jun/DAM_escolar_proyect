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
          Crear nueva sección
        </h1>
        <div class="grid grid-cols-1 gap-6 px-4">
          <div>
            <ion-item>
              <ion-input
                v-model="v$.nombre_seccion.$model"
                placeholder="Sección"
                type="text"
                label="Sección"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-select
                v-model="v$.grado_id.$model"
                placeholder="Grado"
                type="text"
                label="Grado"
              >
                <ion-select-option
                  v-for="value in grados"
                  :key="value.id_grado"
                  :value="value.id_grado"
                  >{{ value.nombre_grado }}</ion-select-option
                >
              </ion-select>
            </ion-item>
            <span
              v-if="v$.grado_id.$error"
              v-for="value in v$.grado_id.$errors"
              :key="value.grado"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div class="my-10 flex flex-col gap-5 justify-center mx-5">
            <ion-button
              color="primary"
              class="h-[60px] font-bold"
              @click="editarSeccion()"
              >Editar</ion-button
            >
            <ion-button
              fill="outline"
              color="dark"
              class="h-[60px] font-bold"
              @click="$router.push('/Secciones')"
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
  IonSelect,
  IonSelectOption,
  onIonViewWillEnter,
} from "@ionic/vue";
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import SeccionServices from "@/services/seccion.services.js";
import gradoServices from "@/services/grado.services.js";
import { useRouter } from "vue-router";
const router = useIonRouter();
const route = useRouter();
const seccion = ref({
  nombre_seccion: "",
  grado_id: "",
});
const rules = {
  nombre_seccion: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
  grado_id: {
    required: helpers.withMessage("El grado es requerido", required),
  },
};
const v$ = useVuelidate(rules, seccion);

const editarSeccion = async () => {
  try {
    if (v$.value.$invalid) {
      return;
    }
    const res = await SeccionServices.putSecciones({
      id_seccion: route.currentRoute.value.params.id,
      nombre_seccion: seccion.value.nombre_seccion,
      grado_id: seccion.value.grado_id,
    });
    console.log(res);

    router.back();
  } catch (error) {
    console.log(error);
  }
};

const getSecciones = async () => {
  try {
    const res = await SeccionServices.getSeccionById({
      table: "secciones",
      column: "id_seccion",
      valor: route.currentRoute.value.params.id,
    });
    seccion.value = res.data[0][0];
  } catch (error) {
    console.log(error);
  }
};
const grados = ref([]);
const getGrados = async () => {
  try {
    const res = await gradoServices.getGrados();
    const idsGradosVistos = new Set();
    grados.value = res.data.filter((grado) => {
      const idGradoActual = grado.id_grado;
      if (idsGradosVistos.has(idGradoActual)) {
        return false;
      }
      idsGradosVistos.add(idGradoActual);
      return true;
    });
  } catch (error) {
    console.log(error);
  }
};

onIonViewWillEnter(() => {
  getSecciones();
  getGrados();
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
