import network from "./network.services.js";

const login = async (body) => {
  const response = await network.post("/auth/login", body);
  return response;
};

export default {
  login,
};
