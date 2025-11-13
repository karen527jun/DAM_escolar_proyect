import axios from "axios";


const BASE_URL = "https://expressbackescuela-production.up.railway.app/api";

const config = {
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: ``,
    },
}

const instance = axios.create(config);

export default instance;
