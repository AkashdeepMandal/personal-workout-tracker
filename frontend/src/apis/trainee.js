import axios from "axios";

const baseURL = "http://localhost:5000/api";

// view assigned workout list
export const traineeGetAssignedWorkout = async (authToken) => {
  return await axios.get(baseURL + `/trainee/assigned/workouts`, {
    headers: { Authorization: "Bearer " + authToken },
  });
};

// view workout details
export const traineeViewWorkoutDetails = async (authToken, id) => {
  return await axios.get(baseURL + `/trainee/workouts/details/${id}`, {
    headers: { Authorization: "Bearer " + authToken },
  });
};

// save completed workout
export const traineeSaveWorkouts = async (authToken, workouts) => {
  return await axios.post(baseURL + "/trainee/workout/save", workouts, {
    headers: { Authorization: "Bearer " + authToken },
  });
};

// get last 6 workout progress
export const traineeProgressHistory = async (authToken) => {
  return await axios.get(baseURL + "/trainee/workout/history", {
    headers: { Authorization: "Bearer " + authToken },
  });
};
