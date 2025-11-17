import network from "@/services/network.services.js";

const getSecciones = async () => {
  const response = await network.get("/secciones");
  return response;
};

const postSecciones = async (body) => {
  const response = await network.post("/secciones/insert", body);
  return response;
};
export default {
  getSecciones,
  postSecciones,
};
