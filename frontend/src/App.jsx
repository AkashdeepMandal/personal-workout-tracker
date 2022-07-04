import { Route, Routes } from "react-router-dom";
import Navbar from "./routes/navbar/navbar.component";
import SignIn from "./routes/login/login.component";
import Home from "./routes/home/home.component";
import Admin from "./routes/admin/admin.component";
import UserList from "./components/userList/userList.component";
import NewUser from "./components/newUser/newUser.component";
import User from "./components/user/user.component";
import DeleteUser from "./components/delete/deleteUser.component";
import "./App.scss";


function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="admin" element={<Admin/>} />
          <Route path="users" element={<UserList />} />
          <Route path="newUser" element={<NewUser />} />
          <Route path="editusers" element={<User />} />
          <Route path="deleteusers" element={<DeleteUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
