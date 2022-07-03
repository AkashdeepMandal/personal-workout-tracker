import React, { useState } from "react";
import { NavLink as RouterLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import {
  sideBarOpen,
  sideBarClose,
} from "../../store/slices/mobileToggleSlice";
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavButton } from "../../components/styles/buttons";
import { buildImage } from "../../utils/buildImage";
import { logout } from "../../apis/allUser";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const TopBar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  // for toggling side bar
  const { isMobileOpen } = useSelector((state) => state.mobileToggle);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar position="sticky" sx={{ height: { xs: "50px", sm: "60px" } }}>
        <StyledToolbar>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {isLoggedIn && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => {
                  isMobileOpen
                    ? dispatch(sideBarClose())
                    : dispatch(sideBarOpen());
                }}
                sx={{ mr: 1, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              component={RouterLink}
              to={"/"}
              variant="h6"
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                color: "white",
                textDecoration: "none",
                fontSize: { xs: "16px", sm: "20px" },
              }}
            >
              Workout Tracker
            </Typography>
          </Stack>

          {isLoggedIn ? (
            <Avatar
              sx={{
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                cursor: "pointer",
                bgcolor: "White",
                color: "#212121",
              }}
              alt={`${user.firstName} ${user.lastName}`}
              src={buildImage(user?.avatar)}
              onClick={handleClick}
            />
          ) : (
            <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
              <NavButton
                component={RouterLink}
                to={"/sign-in"}
                variant="text"
                size={isSmallScreen ? "small" : "large"}
              >
                Sign in
              </NavButton>
              <NavButton
                component={RouterLink}
                to={"/sign-up"}
                variant="outlined"
                size={isSmallScreen ? "small" : "medium"}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Sign up
              </NavButton>
            </Stack>
          )}
        </StyledToolbar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem component={RouterLink} to={"/user/dashboard"}>
            Dashboard
          </MenuItem>
          <MenuItem component={RouterLink} to={"/user/profile"}>
            Profile
          </MenuItem>
          <MenuItem
            onClick={async () => {
              await logout(user.authToken)
                .then((res) => {
                  dispatch(logoutUser());
                  navigate("/");
                })
                .catch((error) => {
                  dispatch(logoutUser());
                  navigate("/");
                });
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
      <Outlet />
    </>
  );
};

export default TopBar;
