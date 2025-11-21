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
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div
        id=""
        class="p-10 flex flex-col items-center justify-center min-h-[80vh]"
      >
        <div>
          <h1 class="text-center !font-bold !mb-10">Usuarios</h1>
          <div class="flex flex-col items-center justify-center gap-10">
            <ion-item>
              <ion-input
                placeholder="Buscar usuarios..."
                v-model="busqueda"
              ></ion-input>
            </ion-item>
            <CardDataComponent :headers="headers" :data="usuariosFiltrados">
              <template #acciones>
                <div class="flex gap-2">
                  <ion-button color="danger" fill="outline">
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
              <template #estado="{ item }">
                <div>
                  <div
                    class="py-2 px-6 rounded-full border"
                    :class="'bg-green-100 border-green-600 text-green-600 font-bold'"
                  >
                    Activo
                  </div>
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
import CardDataComponent from "@/components/CardDataComponent.vue";
import usuarioServices from "@/services/usuarios.services.js";
import { computed, ref } from "vue";
import LoaderComponent from "@/components/LoaderComponent.vue";

const loader = ref(false);
const headers = [
  {
    field: "username",
    header: "Nombres",
  },
  {
    field: "estado",
    header: "Estado",
    template: true,
    template_name: "estado",
  },
  {
    field: "acciones",
    header: "Acciones",
  },
];
const data = ref([
  {
    id: 1,
    nombres: "Karen Adriana ",
    apellidos: "Martínez Rivera",
    correo: "ucorreosuuuuuuperlargsssssssssssssssssssso@gmail.com",
    rol: "Rol",
  },
  {
    id: 1,
    nombres: "Nombres",
    apellidos: "Apellidos",
    correo: "Correo",
    rol: "Rol",
  },
  {
    id: 1,
    nombres: "Nombres",
    apellidos: "Apellidos",
    correo: "Correo",
    rol: "Rol",
  },
]);
const getUsuarios = async () => {
  try {
    loader.value = true;
    const res = await usuarioServices.getUsuarios();
    data.value = res.data;
  } catch (error) {
    console.log(error);
  } finally {
    loader.value = false;
  }
};

const busqueda = ref("");
const usuariosFiltrados = computed(() => {
  if (!busqueda.value) return data.value;

  return data.value.filter((usuario) => {
    return usuario.username
      .toLowerCase()
      .includes(busqueda.value.toLowerCase());
  });
});

getUsuarios();
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
