import { Route, Routes } from "react-router-dom";
import Navbar from "./routes/navbar/navbar.component";
import SignIn from "./routes/login/login.component";
import Home from "./routes/home/home.component";

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
