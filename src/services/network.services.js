import axios from "axios";

// COMO EL BACKEND SE ENCUENTRA EN LA NUBE ACÁ SE LLAMA A LA API, SI NO ESTA EN LA NUBE, SUBIR EL BACCKEND MANUALMENTE Y CAMBIARLO
const BASE_URL =
  "https://expressbackescuela-production.up.railway.app/api" ||
  "http://localhost:3000/api";

const config = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: ``,
  },
};

const instance = axios.create(config);

export default instance;
