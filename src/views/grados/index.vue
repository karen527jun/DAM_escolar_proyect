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
      <div class="p-10 flex flex-col items-center justify-center min-h-[80vh]">
        <div>
          <h1 class="text-center !font-bold !mb-10">Grados</h1>

          <div class="flex flex-col items-center justify-center gap-10">
            <ion-button @click="$router.push('/crear-grado')">
              Crear nuevo grado
            </ion-button>

            <ion-item>
              <ion-input
                v-model="busqueda"
                placeholder="Buscar grado..."
                @ionInput="filtrarGrados"
              ></ion-input>
            </ion-item>
            <CardDataComponent :headers="headers" :data="gradosFiltrados">
              <template #acciones="{ item }">
                <div class="flex gap-2">
                  <ion-button color="primary" @click="editarGrado(item)">
                    Editar
                  </ion-button>
                  <ion-button color="danger" @click="eliminarGrado(item.id)">
                    Eliminar
                  </ion-button>
                </div>
              </template>
            </CardDataComponent>
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
} from "@ionic/vue";
import Grados from "@/interfaces/Grados";
import { ref, onMounted, computed, Ref } from "vue";
import CardDataComponent from "@/components/CardDataComponent.vue";
import gradosService from "@/services/grado.services.js";

const grados: Ref<Grados[]> = ref([]);
const busqueda = ref("");

const headers = [
  { field: "nombre_grado", header: "Nombre del grado" },
  { field: "especialidad", header: "Especialidad" },
  { field: "seccion", header: "Sección" },
  { field: "profesor", header: "Profesor" },
  { field: "year", header: "Año lectivo" },
  { field: "acciones", header: "Acciones" },
];

const cargarGrados = async () => {
  try {
    const res = await gradosService.getGrados();
    grados.value = res.data || [];
  } catch (error) {
    console.error("Error al cargar grados:", error);
  }
};

const gradosFiltrados = computed(() => {
  if (!busqueda.value) return grados.value;
  return grados.value.filter((g) =>
    g.nombre_grado.toLowerCase().includes(busqueda.value.toLowerCase())
  );
});

const filtrarGrados = () => {};

const crearGrado = () => {
  alert("Aquí se abriría el formulario para crear un nuevo grado");
};

const editarGrado = (grado) => {
  console.log("Editar grado:", grado);
};

const eliminarGrado = async (id) => {
  const confirmar = confirm("¿Seguro que deseas eliminar este grado?");
  if (!confirmar) return;

  try {
    await gradosService.deleteGrado(id);
    grados.value = grados.value.filter((g) => g.id !== id);
  } catch (error) {
    console.error("Error al eliminar grado:", error);
  }
};

onMounted(() => {
  cargarGrados();
});
</script>
