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
          Crear nuevo profesor
        </h1>
        <div class="grid grid-cols-1 gap-6 px-4">
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
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div>
            <ion-item>
              <ion-input
                v-model="v$.telefono.$model"
                placeholder="########"
                type="text"
                label="Teléfono"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.telefono.$error"
              v-for="value in v$.telefono.$errors"
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
              v-if="v$.genero.$error"
              v-for="value in v$.genero.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>

          <div>
            <ion-item>
              <ion-input
                v-model="v$.username.$model"
                placeholder="Username"
                type="text"
                label="Username"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.username.$error"
              v-for="value in v$.username.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div>
            <ion-item>
              <ion-input
                v-model="v$.password.$model"
                placeholder="Contraseña"
                type="password"
                label="Contraseña"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.password.$error"
              v-for="value in v$.password.$errors"
              class="text-[12px] text-red-500 ml-5"
            >
              {{ value.$message }}
            </span>
          </div>
          <div>
            <ion-item>
              <ion-input
                v-model="secondPassword"
                placeholder="Repetir contraseña"
                type="password"
                label="Contraseña"
              ></ion-input>
            </ion-item>
            <span
              v-if="v$.password.$model !== secondPassword"
              class="text-[12px] text-red-500 ml-5"
            >
              La contraseña debe coincidir
            </span>
          </div>
          <div class="my-10 flex flex-col gap-5 justify-center mx-5">
            <ion-button
              color="primary"
              class="h-[60px] font-bold"
              @click="crearProfesor()"
              >Crear</ion-button
            >
            <ion-button
              fill="outline"
              color="dark"
              class="h-[60px] font-bold"
              @click="$router.push('/profesores')"
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
import profesorServices from "@/services/profesor.services";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";

const router = useIonRouter();

const profesor = ref({
  nombre_completo: "",
  correo: "",
  telefono: "",
  direccion: "",
  genero: "",
  username: "",
  password: "",
});
const secondPassword = ref();
const rules = {
  nombre_completo: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
  correo: {
    required: helpers.withMessage("El correo es requerido", required),
    email: helpers.withMessage("El correo no es valido", email),
  },
  telefono: {
    required: helpers.withMessage("El telefono es requerido", required),
  },
  direccion: {
    required: helpers.withMessage("La direccion es requerida", required),
  },
  genero: {
    required: helpers.withMessage("El genero es requerido", required),
  },
  username: {
    required: helpers.withMessage("El username es requerido", required),
  },
  password: {
    required: helpers.withMessage("La contraseña es requerida", required),
  },
};

const v$ = useVuelidate(rules, profesor);

const handleChange = (event: any) => {
  profesor.value.genero = event.detail.value;
};

const crearProfesor = async () => {
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
    if (profesor.value.password != secondPassword.value) {
      let toast = await toastController.create({
        message: "Las contraseñas no coinciden",
        duration: 2000,
        color: "danger",
      });
      return toast.present();
    }
    const res = await profesorServices.postProfesores(profesor.value);
    if (res.status == 200) {
      let toast = await toastController.create({
        message: "Profesor creado con exito",
        duration: 2000,
        color: "success",
      });
      toast.present();
      profesor.value = {
        nombre_completo: "",
        correo: "",
        telefono: "",
        direccion: "",
        genero: "",
        username: "",
        password: "",
      };
      secondPassword.value = "";
      router.push("/profesores");
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
