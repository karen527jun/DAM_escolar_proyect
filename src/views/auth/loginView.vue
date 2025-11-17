<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div
          class="h-[100vh] flex max-sm:items-end justify-center w-[100vw] bg-blue-500"
        >
          <div
            class="w-full flex max-sm:flex-col md:justify-center items-center gap-10 shadow-3xl"
          >
            <div class="text-white text-start py-10 px-4">
              <span class="text-4xl font-bold">¡Hola!</span>
              <br />
              <span class="text-md"
                >Bienvenido al sistema de gestión escolar</span
              >
            </div>
            <div
              class="bg-white min-w-[400px] w-full lg:max-w-[300px] h-[450px] max-lg:h-[60vh] py-5 px-10 flex flex-col gap-10 justify-center lg:rounded-xl max-md:rounded-t-4xl"
            >
              <span class="text-start pl-4 text-blue-500 text-3xl font-bold"
                >Login</span
              >
              <div>
                <ion-item>
                  <ion-input
                    placeholder="Usuario"
                    type="text"
                    label="Usuario"
                    labelPlacement="floating"
                    v-model="v$.username.$model"
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
                    placeholder="Contraseña"
                    type="password"
                    label="Contraseña"
                    labelPlacement="floating"
                    v-model="v$.password.$model"
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
              <small class="text-end underline text-blue-500"
                ><a href="">Olvide mi contraseña</a></small
              >
              <ion-button @click="login()" color="primary" shape="round"
                >Iniciar sesión</ion-button
              >
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/vue";
import authServices from "@/services/auth.services";
import { ref } from "vue";
import { helpers, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useIonRouter } from "@ionic/vue";

const user = ref({
  username: "",
  password: "",
});

const rules = {
  username: {
    required: helpers.withMessage("El campo es requerido", required),
  },
  password: {
    required: helpers.withMessage("El campo es requerido", required),
  },
};
const router = useIonRouter();
const v$ = useVuelidate(rules, user);
const login = async () => {
  try {
    const res = await authServices.login(user.value);
    if (res.data.estado) {
      localStorage.setItem("token", res?.data?.token);
      // localStorage.setItem("rol", res?.data?.rol);
      router.push("/dashboard");
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
