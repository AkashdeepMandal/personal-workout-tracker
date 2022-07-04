import axios from "axios";

const baseURL = "http://localhost:5000/api";

// user actions
// create new user
export const adminCreatUser = async (authToken, user) => {
  return await axios.post(baseURL + "/admin/user/create", user, {
    headers: { Authorization: "Bearer " + authToken },
  });
};

// workout action
// create new workout
export const adminCreatWorkout = async (authToken, workout) => {
  return await axios.post(baseURL + "/admin/workout/create", workout, {
    headers: { Authorization: "Bearer " + authToken },
  });
};

// edit workout logo
export const adminUploadWorkoutLogo = async (authToken, logo, id) => {
  return await axios.post(baseURL + `/admin/workout/logo/upload/${id}`, logo, {
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "multipart/form-data",
      crossDomain: true,
    },
  });
};
