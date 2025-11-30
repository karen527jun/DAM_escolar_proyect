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
                v-model="v$.fecha.$model"
                placeholder="00/00/0000"
                type="date"
                label="Fecha"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.fecha.$error"
              v-for="value in v$.fecha.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
            <ion-item>
              <ion-select
                v-model="v$.grado.$model"
                placeholder="Seleccione un grado"
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
              v-if="v$.grado.$error"
              v-for="value in v$.grado.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
            <ion-item>
              <ion-select
                v-model="v$.seccion.$model"
                placeholder="Seleccione una sección"
                type="text"
                label="Sección"
                :disabled="!v$.grado.$model"
              >
                <ion-select-option
                  v-for="value in seccionesFiltradas"
                  :key="value.id_seccion"
                  :value="value.id_seccion"
                  >{{ value.nombre_seccion }}</ion-select-option
                >
              </ion-select>
            </ion-item>
            <span
              v-if="v$.seccion.$error"
              v-for="value in v$.seccion.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div class="flex justify-center">
            <ion-button fill="outline" @click="generarHojaAsistencia">
              Generar nueva hoja de asistencia</ion-button
            >
          </div>
          <div>
            <ion-radio-group
              value="Ausente"
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
              :disabled="alumnos.length == 0"
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
  IonSelect,
  IonSelectOption,
  onIonViewWillEnter,
  toastController,
} from "@ionic/vue";
import { ref, computed, watch } from "vue";
import profesorServices from "@/services/profesor.services";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import especialidadServices from "@/services/especialidad.services.js";
import gradosServices from "@/services/grado.services.js";
import seccionServices from "@/services/seccion.services.js";
import asistenciaServices from "@/services/asistencia.services.js";
import router from "@/router";
const data = ref([]);
const alumnos = ref([]);
const idAsistencia = ref("");
const isToastOpen = ref(false);
const toastMessage = ref("");
const asistencia = ref({
  grado: "",
  seccion: "",
  fecha: "",
});
const rules = {
  grado: {
    required: helpers.withMessage("El grado es requerido", required),
  },
  seccion: {
    required: helpers.withMessage("La seccion es requerido", required),
  },
  fecha: {
    required: helpers.withMessage("La fecha es requerida", required),
  },
};
const v$ = useVuelidate(rules, asistencia);

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
  return alumnos.value.map((alumno) => ({
    id: alumno.id_asistencia,
    estado: alumno.estado,
  }));
});

const generarHojaAsistencia = async () => {
  try {
    alumnos.value = [];
    const validation = await v$.value.$validate();
    if (!validation) {
      return;
    }
    const res = await asistenciaServices.generarHoja(asistencia.value);
    if (res.status == 500) {
      console.log(res);
      let toast = await toastController.create({
        message: "Ya existe una hoja de asistencia para la fecha ingresada",
        duration: 2000,
        color: "danger",
      });
      toast.present();
      return;
    }
    if (res.status == 200) {
      const hoja = await asistenciaServices.getHojas({
        grado: asistencia.value.grado,
        seccion: asistencia.value.seccion,
        fecha: asistencia.value.fecha,
      });
      alumnos.value = hoja.data;
      if (alumnos.value.length == 0) {
        let toast = await toastController.create({
          message: "No se encontraron alumnos",
          duration: 2000,
          color: "warning",
        });
        toast.present();
      }
    }
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
    asistencia.value = {
      grado: "",
      seccion: "",
      fecha: "",
    };
    alumnos.value = [];
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
    const idProfesor = localStorage.getItem("id_profesor");
    const idsGradosVistos = new Set();
    grados.value = res.data.filter((grado) => {
      const idGradoActual = grado.id_grado;
      if (localStorage.getItem("username") == "super_admin") {
        if (idsGradosVistos.has(idGradoActual)) {
          return false;
        }
        idsGradosVistos.add(idGradoActual);
        return true;
      } else {
        if (grado.id_profesor != idProfesor) {
          return false;
        }
        if (idsGradosVistos.has(idGradoActual)) {
          return false;
        }
        idsGradosVistos.add(idGradoActual);
        return true;
      }
    });
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
onIonViewWillEnter(() => {
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
