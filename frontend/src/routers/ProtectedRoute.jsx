import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { Component } = props;
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate("/sign-in");
  }

  return <Component />;
};

export default ProtectedRoute;
