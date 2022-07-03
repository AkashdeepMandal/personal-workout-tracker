import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import SignIn from "./pages/signIn/signIn";
import SignUp from "./pages/signUp/signUp";
import Main from "./sections/mainContainer/Main";
import SideBar from "./sections/sideBar/SideBar";
import TopBar from "./sections/topBar/TopBar";

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
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
