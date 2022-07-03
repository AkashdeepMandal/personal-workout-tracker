import axios from "axios";

const baseURL = "http://localhost:5000/api";

export const login = async (user) => {
  return await axios.post(baseURL + "/user/login", user);
};

export const register = async (user) => {
  return await axios.post(baseURL + "/user/create", user);
};

export const logout = async (authToken) => {
  return await axios.post(
    baseURL + "/user/logout",
    {},
    {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );
};

export const uploadProfilePic = async (formData, authToken) => {
  return await axios.post(baseURL + "/user/avatar/upload", formData, {
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "multipart/form-data",
      crossDomain: true,
    },
  });
};

export const getUserDetails = async (authToken) => {
  return await axios.get(baseURL + "/user/details", {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });
};

export const updateUserDetails = async (authToken, user) => {
  console.log(user);
  return await axios.patch(baseURL + "/user/edit", user, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });
};
