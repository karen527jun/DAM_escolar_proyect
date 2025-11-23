import network from "@/services/network.services.js";

const postProfesores = async (body) => {
  const response = await network.post("/profes/insert", body);
  return response;
};

const getProfesores = async () => {
  const response = await network.get("/profes");
  return response;
};

const getProfesorById = async (body) => {
  const response = await network.post("/helper/getby", body);
  return response;
};

const putProfesores = async (body) => {
  const response = await network.put("/profes/update", body);
  return response;
};

const putUser = async (body) => {
  const response = await network.put("/users/update", body);
  return response;
};

const deleteProfesores = async (id) => {
  const response = await network.delete(`/profes/delete/${id}`);
  return response;
};
export default {
  postProfesores,
  getProfesores,
  getProfesorById,
  putProfesores,
  putUser,
  deleteProfesores,
};
