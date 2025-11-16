<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu
        v-if="loggedIn"
        class="md:max-w-[300px]"
        content-id="main-content"
        type="overlay"
      >
        <ion-content>
          <div class="menu-header"></div>
          <div class="p-4">
            <ion-note>hi@ionicframework.com</ion-note>
            <ion-menu-toggle
              :auto-hide="false"
              v-for="(p, i) in appPages"
              :key="i"
            >
              <ion-item
                @click="navegarRuta(i)"
                router-direction="root"
                :router-link="p.url"
                lines="none"
                :detail="false"
                :class="{ selected: selectedIndex === i }"
              >
                <ion-icon
                  aria-hidden="true"
                  slot="start"
                  :icon="p.icon"
                ></ion-icon>
                <ion-label class="ml-4">{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </div>
        </ion-content>
      </ion-menu>

      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  useIonRouter,
} from "@ionic/vue";
import { ref } from "vue";
import {
  peopleOutline,
  schoolOutline,
  layersOutline,
  personOutline,
  clipboardOutline,
  personCircleOutline,
  briefcaseOutline,
} from "ionicons/icons";

const router = useIonRouter();
const selectedIndex = ref(0);

const appPages = [
  {
    title: "Usuarios",
    url: "/usuarios",
    icon: peopleOutline,
  },
  {
    title: "Grados",
    url: "/grados",
    icon: schoolOutline,
  },
  {
    title: "Secciones",
    url: "/secciones",
    icon: layersOutline,
  },
  {
    title: "Profesores",
    url: "/profesores",
    icon: personOutline,
  },
  {
    title: "Asistencia",
    url: "/asistencia",
    icon: clipboardOutline,
  },
  {
    title: "Estudiantes",
    url: "/estudiantes",
    icon: personCircleOutline,
  },
  {
    title: "Especialidades",
    url: "/especialidades",
    icon: briefcaseOutline,
  },
];

const loggedIn = ref(true);

const navegarRuta = (i) => {
  selectedIndex.value = i;
  router.push({ path: appPages[i].url });
};
</script>

<style>
.menu-header {
background-image: url("/menu_img.jpg");
  background-size: cover;
  background-position: center;
  height: 150px;
  width: 100%;
  border-bottom: 1px solid #ddd;
}

ion-menu.md ion-note {
  margin-top: 10px;
  margin-bottom: 25px;
  display: block;
  padding-left: 10px;
  color: #555;
}

ion-item {
  --padding-start: 12px;
  --padding-end: 12px;
  --min-height: 48px;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;
}

ion-item.selected {
  background-color: #f2f2f2;
}

ion-item ion-icon {
  font-size: 22px;
  color: #333;
}

ion-item ion-label {
  font-weight: 500;
  color: #333;
}
.menu-header {
  background-image: url("/menu_img.jpg");
  background-size: cover;
  background-position: center;
  height: 180px;
  width: 100%;
  border-bottom: 1px solid #ddd;
}



</style>
