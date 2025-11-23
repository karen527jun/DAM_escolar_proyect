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
          Ver asistencia
        </h1>
        <div class="grid grid-cols-1 gap-6 px-4">
          <div class="text-center text-blue-700 text-[30px]">
            {{ asistencia.grado.nombre_grado }}
            {{ asistencia.seccion.nombre_seccion }}
          </div>
          <div>
            <ion-item>
              <ion-input
                v-model="v$.fecha.$model"
                placeholder="00/00/0000"
                type="date"
                label="Fecha"
              ></ion-input>
            </ion-item>
            <!-- <ion-item>
              <ion-select
                v-model="v$.grado.$model"
                placeholder="Seleccione un grado"
                type="text"
                label="Grado"
                disabled
              >
                <ion-select-option
                  v-for="value in grados"
                  :key="value.id_grado"
                  :value="value.id_grado"
                  >{{ value.nombre_grado }}</ion-select-option
                >
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-select
                v-model="v$.seccion.$model"
                placeholder="Seleccione una sección"
                type="text"
                label="Sección"
                disabled
              >
                <ion-select-option
                  v-for="value in seccionesFiltradas"
                  :key="value.id_seccion"
                  :value="value.id_seccion"
                  >{{ value.nombre_seccion }}</ion-select-option
                >
              </ion-select>
            </ion-item> -->
            <!-- <span
              v-if="v$.seccion.$error"
              v-for="value in v$.seccion.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span> -->
          </div>
          <div class="flex justify-center">
            <ion-button
              :disabled="!v$.fecha.$model"
              fill="outline"
              @click="generarHojaAsistencia"
            >
              Ver hoja de asistencia</ion-button
            >
          </div>
          <div>
            <ion-radio-group
              v-for="(value, index) in alumnos"
              @ionChange="handleChange(value, $event.detail.value)"
              class=""
              :value="value.estado"
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
                <div class="flex flex-col justify-center items-center">
                  <small v-if="index == 0">Presente</small>
                  <ion-radio
                    :value="'Presente'"
                    class="border-l border-gray-300 h-full py-5 px-6 w-fit flex justify-center items-center"
                  />
                </div>
                <div class="flex flex-col justify-center items-center">
                  <small v-if="index == 0">Ausente</small>
                  <ion-radio
                    :value="'Ausente'"
                    class="border-x border-gray-300 h-full py-5 px-6 w-fit"
                  />
                </div>
                <div class="flex flex-col justify-center items-center">
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
              @click="guardarAsistencia()"
              :disabled="!v$.fecha.$model"
              >Editar</ion-button
            >
            <ion-button
              fill="outline"
              color="dark"
              class="h-[60px] font-bold"
              @click="$router.push('/asistencia')"
              >Volver</ion-button
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
} from "@ionic/vue";
import { ref, computed, onMounted, watch } from "vue";
import profesorServices from "@/services/profesor.services";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import especialidadServices from "@/services/especialidad.services.js";
import gradosServices from "@/services/grado.services.js";
import seccionServices from "@/services/seccion.services.js";
import asistenciaServices from "@/services/asistencia.services.js";
import { useRouter } from "vue-router";
const data = ref([]);
const alumnos = ref([]);
const idAsistencia = ref("");
const isToastOpen = ref(false);
const toastMessage = ref("");
const router = useRouter();
const asistencia = ref({
  grado: "",
  seccion: "",
  fecha: "",
});
const rules = {
  grado: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
  seccion: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
  fecha: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
};
const v$ = useVuelidate(rules, asistencia);

const objetoAsistenciaFinal = computed(() => {
  return alumnos.value.map((alumno) => ({
    id: alumno.id_asistencia,
    estado: alumno.estado,
  }));
});

const generarHojaAsistencia = async () => {
  try {
    const hoja = await asistenciaServices.getHojas({
      grado: asistencia.value.grado.id_grado,
      seccion: asistencia.value.seccion.id_seccion,
      fecha: asistencia.value.fecha,
    });
    alumnos.value = hoja.data;
  } catch (error) {
    console.log(error);
  }
};
const guardarAsistencia = async () => {
  const datosAEnviar = objetoAsistenciaFinal.value;

  try {
    await asistenciaServices.cargarAsistencias(datosAEnviar);
    toastMessage.value = "Asistencia guardada con éxito.";
    isToastOpen.value = true;
    router.push("/asistencia");
  } catch (error) {
    toastMessage.value = "Error al guardar la asistencia.";
    isToastOpen.value = true;
    console.error("Error en la petición:", error);
  }
};
const handleChange = (alumno, nuevoEstado) => {
  alumno.estado = nuevoEstado;
};

// OBTENER GRADOS ----------------------------------------------------------------------
const grados = ref([]);
const getGrados = async () => {
  try {
    const res = await gradosServices.getGrados();
    grados.value = res.data;
    asistencia.value.grado = grados.value.filter(
      (grado) => grado.id_grado == router.currentRoute.value.params.id
    )[0];
    console.log(asistencia.value);
  } catch (error) {
    console.log(error);
  }
};

// OBTENER SECCIONES ----------------------------------------------------------------------
const secciones = ref([]);
const getSecciones = async () => {
  try {
    const res = await seccionServices.getSecciones();
    secciones.value = res.data;
    asistencia.value.seccion = secciones.value.filter(
      (seccion) =>
        seccion.nombre_seccion == router.currentRoute.value.params.seccion
    )[0];
  } catch (error) {
    console.log(error);
  }
};
const seccionesFiltradas = ref([]);

watch(
  () => asistencia.value.grado,
  (grado) => {
    const resultadoFiltro = secciones.value.filter(
      (seccion) => seccion.id_grado === grado
    );
    seccionesFiltradas.value = resultadoFiltro;

    console.log(asistencia.value);
  }
);
onMounted(() => {
  // getEstudiantesGrado();
  getGrados();
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
