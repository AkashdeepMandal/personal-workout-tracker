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

export const traineeSaveWorkouts = async (authToken, workouts) => {
  console.log(workouts);
  return await axios.post(baseURL + "/trainee/workout/save", workouts, {
    headers: { Authorization: "Bearer " + authToken },
  });
};
