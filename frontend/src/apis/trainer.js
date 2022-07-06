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

// get workouts
export const trainerViewWorkouts = async (authToken) => {
  return await axios.get(baseURL + "/trainer/workouts/details", {
    headers: { Authorization: "Bearer " + authToken },
  });
};

// assign workout for trainee
export const trainerAssiginWorkout = async (authToken, workouts, id) => {
  return await axios.post(baseURL + `/trainer/workout/assign/${id}`, workouts, {
    headers: { Authorization: "Bearer " + authToken },
  });
};

// get assigned Workout details
export const trainerGetAssignedWorkout = async (authToken, id) => {
  return await axios.get(baseURL + `/trainer/assigned/workouts/${id}`, {
    headers: { Authorization: "Bearer " + authToken },
  });
};

// Remove Workout assigned for trainee
export const trainerRemoveWorkout = async (authToken, id, workout) => {
  return await axios.delete(baseURL + `/trainer/remove/workout/${id}`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
    data: {
      workout,
    },
  });
};
