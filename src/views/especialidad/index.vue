<template>
  <ion-page>
    <LoaderComponent v-if="loader"></LoaderComponent>
    <ion-header :translucent="true" class="h-fit">
      <ion-toolbar class="h-[80px] flex items-center">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Sistema de gestión escolar</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <div>
          <h1 class="text-center !text-4xl !font-bold !mb-10 text-gray-500">
            Especialidades
          </h1>
          <div class="flex flex-col items-center justify-center gap-10">
            <ion-button
              class="h-[60px]"
              @click="$router.push('/crear-especialidad')"
              >Crear nueva especialidad</ion-button
            >
            <ion-item>
              <ion-input
                v-model="busqueda"
                placeholder="Buscar especialidad..."
              ></ion-input>
            </ion-item>
            <CardDataComponent
              :headers="headers"
              :data="especialidadesFiltradas"
            >
              <template v-slot:acciones="{ item }">
                <div class="flex gap-2">
                  <ion-button
                    color="primary"
                    fill="outline"
                    @click="
                      $router.push(
                        '/editar-especialidad/' + item.id_especialidad
                      )
                    "
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
                      /></svg
                  ></ion-button>
                  <ion-button
                    @click="openDeleteModal(item)"
                    expand="block"
                    color="danger"
                    fill="outline"
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
                      /></svg
                  ></ion-button>
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
            ¿Estas seguro de eliminar la especialidad?<br />
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
  toastController,
  IonModal,
  onIonViewWillEnter,
} from "@ionic/vue";
import { OverlayEventDetail } from "@ionic/core/components";
import CardDataComponent from "@/components/CardDataComponent.vue";
import especialidadesServices from "@/services/especialidad.services.js";
import { computed, Ref, ref } from "vue";
import Especialidad from "@/interfaces/especialidades";
import LoaderComponent from "@/components/LoaderComponent.vue";
const busqueda = ref("");
const headers = [
  {
    field: "nombre_especialidad",
    header: "Especialidad",
  },
  {
    field: "acciones",
    header: "Acciones",
  },
];
const data: Ref<Especialidad[]> = ref([]);
const loader = ref(false);
const getEspecialidad = async () => {
  try {
    loader.value = true;
    const res = await especialidadesServices.getEspecialidades();
    data.value = res.data;
  } catch (error) {
    console.log(error);
    let toast = await toastController.create({
      message: "Error al obtener la data",
      duration: 2000,
      color: "danger",
    });
    return toast.present();
  } finally {
    loader.value = false;
  }
};

const especialidadesFiltradas = computed(() => {
  if (!busqueda.value) return data.value;
  return data.value.filter((especialidad) =>
    especialidad.nombre_especialidad
      .toLowerCase()
      .includes(busqueda.value.toLowerCase())
  );
});

//Modal
const modal = ref();
const itemSeleccionado = ref(null);

const openDeleteModal = async (item) => {
  itemSeleccionado.value = item;
  await modal.value.$el.present(); // Abrir modal
};
const cancel = () => modal.value.$el.dismiss(null, "cancel");

const confirm = async () => {
  const res = await especialidadesServices.deleteEspecialidades(
    itemSeleccionado?.value?.id_especialidad
  );
  if (res) {
    let toast = await toastController.create({
      message: "Se ha eliminado exitosamente",
      duration: 2000,
      color: "success",
    });
    getEspecialidad();
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
  getEspecialidad();
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
