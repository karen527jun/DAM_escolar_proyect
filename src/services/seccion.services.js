import network from "@/services/network.services.js";

const getSecciones = async () => {
  const response = await network.get("/secciones");
  return response;
};

const postSecciones = async (body) => {
  const response = await network.post("/secciones/insert", body);
  return response;
};

const getSeccionById = async (body) => {
  const response = await network.post(`/helper/getby`, body);
  return response;
};

const putSecciones = async (body) => {
  const response = await network.put(`/secciones/update`, body);
  return response;
};

const deleteSecciones = async (id) => {
  const response = await network.delete(`/secciones/delete/${id}`);
  return response;
};
export default {
  getSecciones,
  postSecciones,
  getSeccionById,
  putSecciones,
  deleteSecciones,
};
