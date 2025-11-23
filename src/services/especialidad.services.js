import network from "@/services/network.services.js";

const getEspecialidades = async () => {
  const response = await network.get("/especialidades");
  return response;
};
const postEspecialidades = async (body) => {
  const response = await network.post("/especialidades/insert", body);
  return response;
};

const getEspecialidadById = async (body) => {
  const response = await network.post("/helper/getby", body);
  return response;
};

const putEspecialidades = async (body) => {
  const response = await network.put("/especialidades/update", body);
  return response;
};

const deleteEspecialidades = async (id) => {
  const response = await network.delete(`/especialidades/delete/${id}`);
  return response;
};
export default {
  postEspecialidades,
  getEspecialidades,
  getEspecialidadById,
  putEspecialidades,
  deleteEspecialidades,
};
