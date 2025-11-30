import network from "@/services/network.services.js";

const generarHoja = async (body) => {
  try {
    const response = await network.post("/asistencia/start", body);
    return response;
  } catch (error) {
    return error;
  }
};

const getHojas = async (body) => {
  const params = new URLSearchParams(body);
  const response = await network.get("/asistencia/get", { params });
  return response;
};

const cargarAsistencias = async (body) => {
  const response = await network.put("/asistencia/load", body);
  return response;
};

const getAsistenciaPorFecha = async (body) => {
  const response = await network.post("/helper/fechas", body);
  return response;
};

export default {
  generarHoja,
  getHojas,
  cargarAsistencias,
  getAsistenciaPorFecha,
};
