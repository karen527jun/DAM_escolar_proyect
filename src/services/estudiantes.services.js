import network from "@/services/network.services.js";

const getEstudiantes = async () => {
  const response = await network.get("/estudiantes");
  return response;
};

const postEstudiantes = async (body) => {
  const response = await network.post("/estudiantes/insert", body);
  return response;
};
const postMatricula = async (body) => {
  const response = await network.post("/matricula/insert", body);
  return response;
};
const getMatricula = async (body) => {
  const response = await network.post("/helper/getby", body);
  return response;
};

const putEstudiantes = async (body) => {
  const response = await network.put(`/estudiantes/update`, body);
  return response;
};

const putMatricula = async (body) => {
  const response = await network.put(`/matricula/update`, body);
  return response;
};
export default {
  getEstudiantes,
  postEstudiantes,
  postMatricula,
  getMatricula,
  putEstudiantes,
  putMatricula,
};
