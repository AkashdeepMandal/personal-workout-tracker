// import { Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/dashboard/Dashboard";
// import Home from "./pages/home/home";
// import Profile from "./pages/profile/profile";
// import SignIn from "./pages/signIn/signIn";
// import SignUp from "./pages/signUp/signUp";
// import Main from "./sections/mainContainer/Main";
// import TopBar from "./sections/topBar/TopBar";
// import CreateUser from "./pages/admin/create-user/CreateUser";
// import CreateWorkout from "./pages/admin/create-workout/CreateWorkout";
// import ViewUsers from "./pages/admin/view-users/ViewUsers";
// import EditUsers from "./pages/admin/edit-users/EditUsers";
// import DeleteUsers from "./pages/admin/delete-users/DeleteUsers";
// import ViewWorkouts from "./pages/admin/view-workouts/ViewWorkout";
// import EditWorkouts from "./pages/admin/edit-workouts/EditWorkouts";
// import DeleteWorkouts from "./pages/admin/delete-workouts/DeleteWorkouts";
// import EditUser from "./pages/admin/edit-user-details/EditUser";
// import EditWorkout from "./pages/admin/edit-workout-details/EditWorkout";
// import ViewUserDetails from "./pages/admin/view-user-details/ViewUserDetails";
// import ViewWorkoutDetails from "./pages/admin/view-workout-details/ViewWorkoutDetails";
// import ViewTrainees from "./pages/trainer/view-trainees/ViewTrainees";
// import ViewTraineeDetails from "./pages/trainer/view-trainee-details/ViewTraineeDetails";
// import AssignWorkout from "./pages/trainer/assign-workout/AssignWorkout";
// import RemoveWorkout from "./pages/trainer/remove-workout/RemoveWorkout";

import CustomRoutes from "./routers/CustomRoutes";

function App() {
  // return (
  //   <Routes>
  //     <Route path="/" element={<TopBar />}>
  //       <Route index element={<Home />} />
  //       <Route path="sign-in" element={<SignIn />} />
  //       <Route path="sign-up" element={<SignUp />} />
  //       <Route path="user/" element={<Main />}>
  //         <Route path="dashboard" element={<Dashboard />} />
  //         <Route path="profile" element={<Profile />} />
  //       </Route>
  //       {/* Admin routes */}
  //       <Route path="admin/" element={<Main />}>
  //         <Route path="create-user" element={<CreateUser />} />
  //         <Route path="view-users" element={<ViewUsers />} />
  //         <Route path="view-user-details/:id" element={<ViewUserDetails />} />
  //         <Route path="edit-users" element={<EditUsers />} />
  //         <Route path="edit-user-details/:id" element={<EditUser />} />
  //         <Route path="delete-users" element={<DeleteUsers />} />

  //         <Route path="create-workout" element={<CreateWorkout />} />
  //         <Route path="view-workouts" element={<ViewWorkouts />} />
  //         <Route
  //           path="view-workout-details/:id"
  //           element={<ViewWorkoutDetails />}
  //         />
  //         <Route path="edit-workouts" element={<EditWorkouts />} />
  //         <Route path="edit-workout-details/:id" element={<EditWorkout />} />
  //         <Route path="delete-workouts" element={<DeleteWorkouts />} />
  //       </Route>

  //       {/* Trainer routes */}
  //       <Route path="trainer" element={<Main />}>
  //         <Route path="view-trainee">
  //           <Route index element={<ViewTrainees />} />
  //           <Route path=":id" element={<ViewTraineeDetails />} />
  //         </Route>

  //         <Route path="assign-workout" element={<AssignWorkout />}>
  //           {/* <Route path="/trainee/:id" element={<ViewTraineeDetails />} /> */}
  //         </Route>
  //         <Route path="remove-workout" element={<RemoveWorkout />}>
  //           {/* <Route path="/trainee/:id" element={<ViewTraineeDetails />} /> */}
  //         </Route>
  //       </Route>
  //     </Route>
  //   </Routes>
  // );

  return <CustomRoutes />;
}

export default App;
