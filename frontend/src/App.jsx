import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import SignIn from "./pages/signIn/signIn";
import SignUp from "./pages/signUp/signUp";
import Main from "./sections/mainContainer/Main";
import TopBar from "./sections/topBar/TopBar";
import CreateUser from "./pages/admin/create-user/CreateUser";
import CreateWorkout from "./pages/admin/create-workout/CreateWorkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TopBar />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="user/" element={<Main />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="create-workout" element={<CreateWorkout />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
