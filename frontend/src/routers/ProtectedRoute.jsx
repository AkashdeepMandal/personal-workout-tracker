import { CircularProgress, Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { Component } = props;
  const { isLoading, isLoggedIn } = useSelector((state) => state.user);
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {}, [isLoading]);

  return isLoggedIn ? (
    <Component />
  ) : isLoading === false ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export default ProtectedRoute;
