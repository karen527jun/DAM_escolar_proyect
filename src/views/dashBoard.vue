<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="h-[80px] flex items-center px-10">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Sistema de gestión escolar</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div
        id="container"
        class="p-10 flex flex-col items-center justify-center min-h-[80vh]"
      >
        <div class="grid xl:grid-cols-4 gap-10">
          <CardDashboardComponent
            class="!bg-blue-100 !text-blue-500 xl:col-span-3"
          >
            <span class="font-bold text-4xl">
              Bienvenido al sistema de gestión escolar</span
            >
            <span class="text-start"
              >Puedes seleccionar las opciones en el menú lateral para
              navegar</span
            >
          </CardDashboardComponent>
          <CardDashboardComponent>
            <div class="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="150px"
                viewBox="0 -960 960 960"
                width="150px"
                fill="blue"
              >
                <path
                  d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
                />
              </svg>
            </div>
            <div class="border border-t-blue-500 w-full"></div>
            <div class="grid grid-cols-2">
              <strong>Usuario:</strong>
              <span>{{ usuario?.username }}</span>
              <strong>Rol:</strong>
              <span>{{ usuario?.rol }}</span>
            </div>
          </CardDashboardComponent>
          <CardDashboardComponent>
            <span class="font-bold text-[40px]">ESTADÍSTICAS</span>
            <ion-select
              v-model="seccionGrafica"
              placeholder="Seleccione una sección"
            >
              <ion-select-option v-for="value in grados" :value="value"
                >{{ value.nombre_grado }} {{ value.seccion }}</ion-select-option
              >
            </ion-select>
            <Pie v-if="data" :options="optionsPie" :data="data"></Pie>
          </CardDashboardComponent>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import CardDashboardComponent from "@/components/CardDashboardComponent.vue";
import authServices from "@/services/auth.services";
import gradoServices from "@/services/grado.services";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { Pie } from "vue-chartjs";
import {
  IonInput,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  onIonViewWillEnter,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { Ref, ref, watch } from "vue";
const optionsPie = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
});

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);
const usuario = ref({
  username: localStorage.getItem("nombre_completo"),
  rol:
    localStorage.getItem("username") == "super_admin"
      ? "Administrador"
      : "Profesor",
});
const info: Ref = ref([]);
const data = ref();
const dataPie = async () => {
  try {
    info.value = [];
    data.value = null;
    const res = await authServices.getReportes({
      id: seccionGrafica.value.id_grado,
      seccion: seccionGrafica.value.id_seccion,
    });

    info.value.push(res.data[0].ausentes);
    info.value.push(res.data[0].presentes);
    info.value.push(res.data[0].justificados);

    data.value = {
      labels: ["Ausente", "Presentes", "Justificados"],
      datasets: [
        {
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          data: info.value,
        },
      ],
    };
    console.log(data.value);
  } catch (error) {
    console.log(error);
  }
};

const seccionGrafica = ref();
const grados = ref();
const getSecciones = async () => {
  try {
    const res = await gradoServices.getGrados();
    if (usuario.value.rol == "Profesor") {
      grados.value = res.data.filter(
        (seccion) =>
          seccion.id_profesor == localStorage.getItem("id_profesor") &&
          seccion.seccion != null
      );
    } else {
      grados.value = res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => seccionGrafica.value,
  () => {
    dataPie();
  }
);
onIonViewWillEnter(() => {
  getSecciones();
});
</script>

<style scoped>
#container {
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
