import axios from "axios";

const baseURL = "http://localhost:5000/api";

export const login = async (user) => {
  return await axios.post(baseURL + "/user/login", user);
};

export const logout = async (auth) => {
  return await axios.post(
    baseURL + "/user/logout",
    {},
    {
      headers: {
        Authorization: "Bearer " + auth,
      },
    }
  );
};
