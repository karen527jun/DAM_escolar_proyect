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
          Editar estudiante
        </h1>

        <div
          v-if="!tieneMatricula"
          class="bg-yellow-100 border-2 border-yellow-500 m-5 p-2 text-yellow-800 rounded-xl"
        >
          <strong> Asignación de Sección Obligatoria:</strong> Inscribe al
          estudiante en una sección.
        </div>
        <div class="grid grid-cols-1 gap-6 px-4">
          <div>
            <ion-item>
              <ion-toggle
                v-model="v$.estado.$model"
                :enable-on-off-labels="true"
                >Activo</ion-toggle
              >
            </ion-item>
            <ion-item>
              <ion-input
                v-model="v$.NIE.$model"
                placeholder="NIE"
                type="text"
                label="NIE"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.NIE.$error"
              v-for="value in v$.NIE.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div>
            <ion-item>
              <ion-input
                v-model="v$.nombre_completo.$model"
                placeholder="Nombre completo"
                type="text"
                label="Nombre completo"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.nombre_completo.$error"
              v-for="value in v$.nombre_completo.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div>
            <ion-item>
              <ion-input
                v-model="v$.fecha_de_nacimiento.$model"
                placeholder="00/00/0000"
                type="date"
                label="fecha de nacimiento"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.fecha_de_nacimiento.$error"
              v-for="value in v$.fecha_de_nacimiento.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div>
            <ion-item>
              <ion-input
                v-model="v$.lugar_de_nacimiento.$model"
                placeholder="San Salvador.."
                type="text"
                label="Lugar de nacimiento"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.lugar_de_nacimiento.$error"
              v-for="value in v$.lugar_de_nacimiento.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>

          <div>
            <ion-item>
              <ion-input
                v-model="v$.direccion.$model"
                placeholder="Dirección"
                type="text"
                label="Dirección"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.direccion.$error"
              v-for="value in v$.direccion.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <span class="ml-4 font-bold">Género</span>
          <div>
            <ion-radio-group
              :value="estudiante.genero_del_alumno"
              @ion-change="handleChange($event)"
            >
              <ion-item>
                <ion-radio value="F">Femenino</ion-radio>
              </ion-item>
              <ion-item>
                <ion-radio value="M" class="wrapped">Másculino</ion-radio>
              </ion-item>
            </ion-radio-group>
            <span
              v-if="v$.genero_del_alumno.$error"
              v-for="value in v$.genero_del_alumno.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <span class="ml-4 font-bold"
            >Información de la persona responsable</span
          >
          <div>
            <ion-item>
              <ion-input
                v-model="v$.nombre_responsable.$model"
                placeholder="Nombre completo"
                type="text"
                label="Responsable"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.nombre_responsable.$error"
              v-for="value in v$.nombre_responsable.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div>
            <ion-item>
              <ion-input
                v-model="v$.correo.$model"
                placeholder="Correo"
                type="text"
                label="Correo"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.correo.$error"
              v-for="value in v$.correo.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div>
            <ion-item>
              <ion-input
                v-model="v$.telefono_de_emergencia.$model"
                placeholder="########"
                type="text"
                label="Teléfono de emergencia"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.telefono_de_emergencia.$error"
              v-for="value in v$.telefono_de_emergencia.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div>
            <ion-item>
              <ion-input
                v-model="v$.dui.$model"
                placeholder="0000000-0"
                type="text"
                label="DUI"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.dui.$error"
              v-for="value in v$.dui.$errors"
              :key="value.$uid"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>

          <span class="ml-4 font-bold">Información matricula</span>
          <ion-item>
            <ion-select v-model="seccionSeleccionada" placeholder="Seccion">
              <ion-select-option
                v-for="value in secciones"
                :key="value.id_seccion"
                :value="value.id_seccion"
                >{{ value.nombre_grado }}
                {{ value.nombre_seccion }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <div class="my-10 flex flex-col gap-5 justify-center mx-5">
            <ion-button
              color="primary"
              class="h-[60px] font-bold"
              @click="editarEstudiante()"
              >Editar</ion-button
            >
            <ion-button
              fill="outline"
              color="dark"
              class="h-[60px] font-bold"
              @click="$router.push('/estudiantes')"
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
  toastController,
  useIonRouter,
  IonSelect,
  IonSelectOption,
  IonToggle,
  onIonViewWillEnter,
} from "@ionic/vue";
import { ref } from "vue";
import estudiantesService from "@/services/estudiantes.services";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import seccionServices from "@/services/seccion.services";

const router = useRouter();

const estudiante = ref({
  NIE: "",
  nombre_completo: "",
  correo: "",
  telefono_de_emergencia: "",
  fecha_de_nacimiento: "",
  lugar_de_nacimiento: "",
  direccion: "",
  genero_del_alumno: "",
  nombre_responsable: "",
  dui: "",
  estado: false,
});
const rules = {
  NIE: {
    required: helpers.withMessage("El NIE es requerido", required),
  },
  nombre_completo: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
  correo: {
    required: helpers.withMessage("El correo es requerido", required),
    email: helpers.withMessage("El correo no es valido", email),
  },
  fecha_de_nacimiento: {
    required: helpers.withMessage("La fecha es requerida", required),
  },
  lugar_de_nacimiento: {
    required: helpers.withMessage("El lugar es requerido", required),
  },
  telefono_de_emergencia: {
    required: helpers.withMessage("El telefono es requerido", required),
  },
  direccion: {
    required: helpers.withMessage("La direccion es requerida", required),
  },
  genero_del_alumno: {
    required: helpers.withMessage(
      "El genero del alumno es requerido",
      required
    ),
  },
  nombre_responsable: {
    required: helpers.withMessage(
      "El nombre del responsable es requerido",
      required
    ),
  },
  dui: {
    required: helpers.withMessage("El DUI es requerido", required),
  },
  estado: {
    required: helpers.withMessage("El estado es requerido", required),
  },
};

const v$ = useVuelidate(rules, estudiante);
const seccionSeleccionada = ref();
const handleChange = (event: any) => {
  estudiante.value.genero_del_alumno = event.detail.value;
};
const tieneMatricula = ref(false);
const getEstudiante = async () => {
  try {
    const res = await estudiantesService.getEstudiantes();
    let estudianteData = res.data.filter(
      (estudiante) => estudiante.NIE == router.currentRoute.value.params.id
    )[0];
    estudiante.value = estudianteData;
    estudiante.value.fecha_de_nacimiento =
      estudianteData.fecha_de_nacimiento.split("T")[0];
  } catch (e) {
    console.log(e);
  }
};

const matricula = ref({});
const getMatricula = async () => {
  try {
    const res = await estudiantesService.getMatricula({
      table: "matricula",
      column: "NIE",
      valor: router.currentRoute.value.params.id,
    });
    if (res.data[0].length > 0) {
      tieneMatricula.value = true;
      seccionSeleccionada.value = res.data[0][0].id_seccion;
    }
  } catch (error) {
    console.log(error);
  }
};
const editarEstudiante = async () => {
  try {
    if (v$.value.$invalid) {
      v$.value.$touch();
      let toast = await toastController.create({
        message: "Todos los campos son requeridos",
        duration: 2000,
        color: "danger",
      });
      return toast.present();
    }

    const res = await estudiantesService.putEstudiantes(estudiante.value);
    let resMatricula = {};
    if (!tieneMatricula.value) {
      resMatricula = await estudiantesService.postMatricula({
        nie: estudiante.value.NIE,
        seccion: seccionSeleccionada.value,
      });
    } else {
      resMatricula = await estudiantesService.putMatricula({
        nie: estudiante.value.NIE,
        seccion: seccionSeleccionada.value,
      });
    }
    if (res.status == 200) {
      let toast = await toastController.create({
        message: "Estudiante editado con exito",
        duration: 2000,
        color: "success",
      });
      toast.present();
      estudiante.value = {
        NIE: "",
        nombre_completo: "",
        correo: "",
        telefono_de_emergencia: "",
        fecha_de_nacimiento: "",
        lugar_de_nacimiento: "",
        direccion: "",
        genero_del_alumno: "",
        nombre_responsable: "",
        dui: "",
        estado: 1,
      };

      //   router.push("/crear-matricula/" + res.data.data.nie);
      router.push("/estudiantes");
    } else {
      let toast = await toastController.create({
        message: "Error al editar el estudiante",
        duration: 2000,
        color: "danger",
      });
      return toast.present();
    }
  } catch (error) {
    console.log(error);
  }
};

const secciones = ref([]);

const getSecciones = async () => {
  try {
    const res = await seccionServices.getSecciones();
    secciones.value = res.data;
  } catch (error) {
    console.log(error);
  }
};
onIonViewWillEnter(() => {
  getEstudiante();
  getMatricula();
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
