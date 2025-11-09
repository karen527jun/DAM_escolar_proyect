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
          Crear nuevo estudiante
        </h1>
        <div class="grid grid-cols-1 gap-6 px-4">
          <div>
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
            <ion-radio-group @ion-change="handleChange($event)">
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
          <div class="my-10 flex flex-col gap-5 justify-center mx-5">
            <ion-button
              color="primary"
              class="h-[60px] font-bold"
              @click="crearEstudiante()"
              >Crear</ion-button
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
} from "@ionic/vue";
import { ref } from "vue";
import estudiantesService from "@/services/estudiantes.services";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";

const router = useIonRouter();

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
  estado: 0,
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
};

const v$ = useVuelidate(rules, estudiante);

const handleChange = (event: any) => {
  estudiante.value.genero_del_alumno = event.detail.value;
};

const crearEstudiante = async () => {
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

    const res = await estudiantesService.postEstudiantes(estudiante.value);
    if (res.status == 200) {
      let toast = await toastController.create({
        message: "Estudiante creado con exito",
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
        estado: 0,
      };
      router.push("/crear-matricula/" + res.data.NIE);
    } else {
      let toast = await toastController.create({
        message: "Error al crear el profesor",
        duration: 2000,
        color: "danger",
      });
      return toast.present();
    }
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
