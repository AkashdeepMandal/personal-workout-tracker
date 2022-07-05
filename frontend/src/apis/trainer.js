import axios from "axios";

const baseURL = "http://localhost:5000/api";

// view trainees
export const trainerViewTrainees = async (authToken) => {
  return await axios.get(baseURL + "/trainer/users/details", {
    headers: { Authorization: "Bearer " + authToken },
  });
};

// view trainee's details
export const trainerViewTraineeDetails = async (authToken, id) => {
  return await axios.get(baseURL + `/trainer/users/details/${id}`, {
    headers: { Authorization: "Bearer " + authToken },
  });
};
