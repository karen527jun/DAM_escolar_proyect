<template>
  <ion-page>
    <LoaderComponent v-if="loader"></LoaderComponent>
    <ion-header :translucent="true">
      <ion-toolbar class="h-[80px] flex items-center">
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
                  <ion-button
                    color="primary"
                    fill="outline"
                    @click="editarGrado(item)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#2e48fd"
                    >
                      <path
                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
                      />
                    </svg>
                  </ion-button>
                  <ion-button
                    color="danger"
                    fill="outline"
                    @click="openDeleteModal(item)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e5000b"
                    >
                      <path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                      />
                    </svg>
                  </ion-button>
                </div>
              </template>
            </CardDataComponent>
          </div>
        </div>
      </div>
      <ion-modal ref="modal" @willDismiss="onWillDismiss">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Cancelar</ion-button>
            </ion-buttons>
            <ion-title>Eliminar</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()"
                >Confirmar</ion-button
              >
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="!text-center text-[20px] w-full h-full mt-10">
            ¿Estas seguro de eliminar el grado?<br />
            <small>No podrás revertir esta acción</small>
          </div>
        </ion-content>
      </ion-modal>
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
  IonModal,
  toastController,
  onIonViewWillEnter,
} from "@ionic/vue";
import Grados from "@/interfaces/Grados";
import { ref, computed, Ref } from "vue";
import CardDataComponent from "@/components/CardDataComponent.vue";
import gradosService from "@/services/grado.services.js";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { useRouter } from "vue-router";
const grados: Ref<Grados[]> = ref([]);
const busqueda = ref("");
const loader = ref(false);
const router = useRouter();
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
    loader.value = true;
    const res = await gradosService.getGrados();
    grados.value = res.data || [];
  } catch (error) {
    console.error("Error al cargar grados:", error);
  } finally {
    loader.value = false;
  }
};

const gradosFiltrados = computed(() => {
  if (!busqueda.value) return grados.value;
  return grados.value.filter((g) =>
    g.nombre_grado.toLowerCase().includes(busqueda.value.toLowerCase())
  );
});

const filtrarGrados = () => {};

const editarGrado = (grado: Grados) => {
  router.push(`/editar-grado/${grado.id_grado}`);
};
//Modal
const modal = ref();
const itemSeleccionado = ref(null);

const openDeleteModal = async (item) => {
  itemSeleccionado.value = item;
  await modal.value.$el.present(); // Abrir modal
};
const cancel = () => modal.value.$el.dismiss(null, "cancel");

const confirm = async () => {
  const res = await gradosService.deleteGrado(
    itemSeleccionado?.value?.id_grado
  );
  if (res) {
    let toast = await toastController.create({
      message: "Se ha eliminado exitosamente",
      duration: 2000,
      color: "success",
    });
    modal.value.$el.dismiss(name, "confirm");
    return toast.present();
  }
};

const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
  if (event.detail.role === "confirm") {
    return;
  }
};
onIonViewWillEnter(() => {
  cargarGrados();
});
</script>
