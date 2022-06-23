import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar.component";
import SignIn from "./components/login/login.component";
import Home from "./components/home/home.component";
// import Login from "./components/login/login.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
