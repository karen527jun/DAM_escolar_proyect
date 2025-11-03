<template>
  <ion-page>
    <ion-header :translucent="true">
      <!-- <ion-toolbar color="primary" class="h-[80px] flex items-center px-10">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Sistema de gestión escolar</ion-title>
      </ion-toolbar> -->
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Login</ion-title>
        </ion-toolbar>
      </ion-header>

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
              <ion-item>
                <ion-input
                  placeholder="Correo"
                  type="email"
                  label="Correo electrónico"
                  labelPlacement="floating"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-input
                  placeholder="Contraseña"
                  type="password"
                  label="Contraseña"
                  labelPlacement="floating"
                ></ion-input>
              </ion-item>
              <small class="text-end underline text-blue-500"
                ><a href="">Olvide mi contraseña</a></small
              >
              <ion-button color="primary" shape="round"
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
