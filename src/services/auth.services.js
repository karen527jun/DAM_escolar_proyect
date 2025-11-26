import network from "./network.services.js";

const login = async (body) => {
  const response = await network.post("/auth/login", body);
  return response;
};

const getReportes = async (body) => {
  
  const response = await network.post("/helper/report", body);
  return response;
};

const comprobarToken = async (body) => {
  const response = await network.post("/auth/decode", body);
  return response;
};

export default {
  login,
  getReportes,
  comprobarToken
};
