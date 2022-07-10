import axios from "axios";

const baseURL = "http://localhost:5000/api";

// user actions
// create new user
export const adminCreatUser = async (authToken, user) => {
  return await axios.post(baseURL + "/admin/user/create", user, {
    headers: { Authorization: "Bearer " + authToken },
  });
};

// view users
export const adminViewUsers = async (
  authToken,
  search = "",
  filter = "",
  skip = 0
) => {
  search = search.toLocaleLowerCase();
  return await axios.get(
    baseURL +
      `/admin/users/details?filter=${filter}&search=${search}&skip=${skip}`,
    {
      headers: { Authorization: "Bearer " + authToken },
    }
  );
};

// view user's Details
export const adminViewUserDetails = async (authToken, id) => {
  return await axios.get(baseURL + `/admin/users/details/${id}`, {
    headers: { Authorization: "Bearer " + authToken },
  });
};

// update any user Datails
export const adminUpdateUserDetails = async (authToken, user, id) => {
  return await axios.patch(baseURL + `/admin/user/edit/${id}`, user, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });
};

//  update user avater
export const updateUserAvatar = async (authToken, formData, id) => {
  return await axios.post(
    baseURL + `/admin/user/avatar/upload/${id}`,
    formData,
    {
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "multipart/form-data",
        crossDomain: true,
      },
    }
  );
};

// delete user
export const adminDeleteUserDetails = async (authToken, id) => {
  return await axios.delete(baseURL + `/admin/user/delete/${id}`, {
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

// view workouts
export const adminViewWorkouts = async (
  authToken,
  search = "",
  filter = "",
  skip = 0
) => {
  search = search.toLocaleLowerCase();
  return await axios.get(
    baseURL +
      `/admin/workouts/details?filter=${filter}&search=${search}&skip=${skip}`,
    {
      headers: { Authorization: "Bearer " + authToken },
    }
  );
};

// view workout details
export const adminViewWorkoutDetails = async (authToken, id) => {
  return await axios.get(baseURL + `/admin/workouts/details/${id}`, {
    headers: { Authorization: "Bearer " + authToken },
  });
};

// update any user Workout
export const adminUpdateWorkoutDetails = async (authToken, user, id) => {
  return await axios.patch(baseURL + `/admin/workout/edit/${id}`, user, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });
};
// delete workout details
export const adminDeleteWorkoutDetails = async (authToken, id) => {
  return await axios.delete(baseURL + `/admin/workout/delete/${id}`, {
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
