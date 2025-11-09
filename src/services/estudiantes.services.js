import network from "@/services/network.services.js";

const getEstudiantes = async () => {
  const response = await network.get("/estudiantes");
  return response;
};

const postEstudiantes = async (body) => {
  const response = await network.post("/estudiantes/insert", body);
  return response;
};

const getGrados = async () => {
  const response = await network.get("/grados");
  return response;
};

export default {
  getEstudiantes,
  postEstudiantes,
};
