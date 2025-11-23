import network from "@/services/network.services.js";

const postGrado = async (body) => {
  const response = await network.post("/grados/insert", body);
  return response;
};

const getGrados = async () => {
  const response = await network.get("/grados");
  return response;
};

const getEstudiantesPorGrado = async () => {
  const response = await network.get(`/grados/estudiantes`);
  return response;
};

const getGradoById = async (body) => {
  const response = await network.post(`/helper/getby`, body);
  return response;
};

const updateGrado = async (body) => {
  const response = await network.put(`/grados/update`, body);
  return response;
};

const deleteGrado = async (id) => {
  const response = await network.delete(`/grados/delete/${id}`);
  return response;
};

export default {
  postGrado,
  getGrados,
  getGradoById,
  updateGrado,
  deleteGrado,
  getEstudiantesPorGrado,
  deleteGrado,
};
