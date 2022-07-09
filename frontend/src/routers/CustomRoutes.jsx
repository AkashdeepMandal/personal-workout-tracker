import React from "react";
import { Route, Routes } from "react-router-dom";
import TopBar from "../sections/topBar/TopBar";
import Home from "../pages/home/home";
import SignIn from "../pages/signIn/signIn";
import SignUp from "../pages/signUp/signUp";
import Main from "../sections/mainContainer/Main";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/profile";
import CreateUser from "../pages/admin/create-user/CreateUser";
import ViewUsers from "../pages/admin/view-users/ViewUsers";
import EditUsers from "../pages/admin/edit-users/EditUsers";
import ViewUserDetails from "../pages/admin/view-user-details/ViewUserDetails";
import DeleteUsers from "../pages/admin/delete-users/DeleteUsers";
import CreateWorkout from "../pages/admin/create-workout/CreateWorkout";
import ViewWorkouts from "../pages/admin/view-workouts/ViewWorkout";
import ViewWorkoutDetails from "../pages/admin/view-workout-details/ViewWorkoutDetails";
import EditWorkouts from "../pages/admin/edit-workouts/EditWorkouts";
import EditWorkout from "../pages/admin/edit-workout-details/EditWorkout";
import DeleteWorkouts from "../pages/admin/delete-workouts/DeleteWorkouts";
import ViewTrainees from "../pages/trainer/view-trainees/ViewTrainees";
import ViewTraineeDetails from "../pages/trainer/view-trainee-details/ViewTraineeDetails";
import RemoveWorkout from "../pages/trainer/remove-workout/RemoveWorkout";
import EditUser from "../pages/admin/edit-user-details/EditUser";
import AssignWorkout from "../pages/trainer/assign-workout/AssignWorkout";
import PageNotFound from "../pages/error/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import AssignWorkoutTrainee from "../pages/trainer/assign-workout-trainee/AssignWorkoutTrainee";
import RemoveWorkoutTrainee from "../pages/trainer/remove-workout-trainee/RemoveWorkoutTrainee";
import Unauthorized from "../pages/error/Unauthorized";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TopBar />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />

        <Route element={<Main />}>
          <Route
            path="dashboard"
            element={<ProtectedRoute Component={Dashboard} />}
          />
          <Route
            path="profile"
            element={<ProtectedRoute Component={Profile} />}
          />
        </Route>

        {/* Admin routes */}
        <Route path="admin/" element={<ProtectedRoute Component={Main} />}>
          {/* create user */}
          <Route
            path="create-user"
            element={<ProtectedRoute Component={CreateUser} />}
          />
          {/* view user */}
          <Route path="view-user">
            <Route index element={<ProtectedRoute Component={ViewUsers} />} />
            <Route
              path=":id"
              element={<ProtectedRoute Component={ViewUserDetails} />}
            />
          </Route>
          {/* edit user */}
          <Route path="edit-user">
            <Route index element={<ProtectedRoute Component={EditUsers} />} />
            <Route
              path=":id"
              element={<ProtectedRoute Component={EditUser} />}
            />
          </Route>
          {/* delete user */}
          <Route
            path="delete-users"
            element={<ProtectedRoute Component={DeleteUsers} />}
          />

          {/* workout routes */}
          <Route
            path="create-workout"
            element={<ProtectedRoute Component={CreateWorkout} />}
          />
          <Route path="view-workout">
            <Route
              index
              element={<ProtectedRoute Component={ViewWorkouts} />}
            />
            <Route
              path=":id"
              element={<ProtectedRoute Component={ViewWorkoutDetails} />}
            />
          </Route>

          <Route path="edit-workout">
            <Route
              index
              element={<ProtectedRoute Component={EditWorkouts} />}
            />
            <Route
              path=":id"
              element={<ProtectedRoute Component={EditWorkout} />}
            />
          </Route>
          <Route path="delete-workouts" element={<DeleteWorkouts />} />
        </Route>

        {/* Trainer routes */}
        <Route path="trainer" element={<ProtectedRoute Component={Main} />}>
          <Route path="view-trainee">
            <Route
              index
              element={<ProtectedRoute Component={ViewTrainees} />}
            />
            <Route
              path=":id"
              element={<ProtectedRoute Component={ViewTraineeDetails} />}
            />
          </Route>

          <Route path="assign-workout">
            <Route
              index
              element={<ProtectedRoute Component={AssignWorkout} />}
            />
            <Route
              path=":name/:id"
              element={<ProtectedRoute Component={AssignWorkoutTrainee} />}
            />
          </Route>
          <Route path="remove-workout">
            <Route
              index
              element={<ProtectedRoute Component={RemoveWorkout} />}
            />
            <Route
              path=":name/:id"
              element={<ProtectedRoute Component={RemoveWorkoutTrainee} />}
            />
          </Route>
        </Route>
        {/* error */}
        <Route path="*" element={<PageNotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
};

export default CustomRoutes;
