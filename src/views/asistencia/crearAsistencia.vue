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
          <div>
            <ion-radio-group
              v-for="(value, index) in alumnos"
              @ionChange="handleChange(value, $event.detail.value)"
              class=""
              v-if="alumnos?.length > 0"
            >
              <div class="flex justify-around"></div>
              <IonItem class="flex justify-center items-center py-2">
                <div class="">
                  <small v-if="index == 0" class="">Nombre</small>
                  <ion-label class="w-[100px]">{{
                    value.nombre_completo
                  }}</ion-label>
                </div>
                <div class="flex flex-col">
                  <small v-if="index == 0">Presente</small>
                  <ion-radio
                    :value="'Presente'"
                    class="border-l border-gray-300 h-full py-5 px-6 w-fit flex justify-center items-center"
                  />
                </div>
                <div class="flex flex-col">
                  <small v-if="index == 0">Ausente</small>
                  <ion-radio
                    :value="'Ausente'"
                    class="border-x border-gray-300 h-full py-5 px-6 w-fit"
                  />
                </div>
                <div class="flex flex-col">
                  <small v-if="index == 0">justificado</small>
                  <ion-radio
                    :value="'Justificado'"
                    class="border-r border-gray-300 h-full py-5 px-6 w-fit"
                  />
                </div>
              </IonItem>
            </ion-radio-group>
          </div>
          <div class="my-10 flex flex-col gap-5 justify-center mx-5">
            <ion-button
              color="primary"
              class="h-[60px] font-bold"
              @click="guardarAsistencia"
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
import { ref, computed } from "vue";
import profesorServices from "@/services/profesor.services";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import especialidadServices from "@/services/especialidad.services.js";
import gradosServices from "@/services/grado.services.js";
import router from "@/router";
const ionRouter = useIonRouter();
const data = ref([]);
const alumnos = ref([]);

const isToastOpen = ref(false);
const toastMessage = ref("");
const especialidad = ref({
  nombre_especialidad: "",
});
const rules = {
  nombre_especialidad: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
};
const v$ = useVuelidate(rules, especialidad);

const getEstudiantesGrado = async () => {
  try {
    const res = await gradosServices.getEstudiantesPorGrado();
    data.value = res?.data?.filter((alumno) => alumno.id_grado == 2)[0];
    alumnos.value = data?.value.estudiantes;
  } catch (error) {
    console.log(error);
  }
};
const objetoAsistenciaFinal = computed(() => {
  return {
    estudiantes: alumnos.value.map((alumno) => ({
      // Aseguramos que solo incluya el NIE y el estado
      NIE: alumno.nie,
      // Si el estado es null, usamos 'No Seleccionado' por defecto
      estado: alumno.estado || "No Seleccionado",
    })),
  };
});
const guardarAsistencia = async () => {
  const datosAEnviar = objetoAsistenciaFinal.value;

  console.log("Objeto de Asistencia listo para enviar:", datosAEnviar);

  try {
    // Ejemplo de simulación de envío a un API
    // await fetch('/api/asistencia', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(datosAEnviar)
    // });

    toastMessage.value = "✅ Asistencia guardada con éxito.";
    isToastOpen.value = true;
  } catch (error) {
    toastMessage.value = "❌ Error al guardar la asistencia.";
    isToastOpen.value = true;
    console.error("Error en la petición:", error);
  }
};
const handleChange = (alumno, nuevoEstado) => {
  alumno.estado = nuevoEstado;
};

// Para el Toast
const setToastOpen = (state) => {
  isToastOpen.value = state;
};

getEstudiantesGrado();
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
