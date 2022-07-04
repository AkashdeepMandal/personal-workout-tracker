import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/userSlice";

import {
  Box,
  Stack,
  Divider,
  Button,
  ListItemIcon,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  ListSubheader,
} from "@mui/material";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

// custom imports
import { SideBarNav } from "../../components/styles/navList";
import AdminSideBarNavOption from "../../components/admin/sideBarNavOptions";
import TrainerSideBarNavOption from "../../components/trainer/sideBarNavOptions";
import TraineeSideBarNavOption from "../../components/trainee/sideBarNavOptions";

function SideBar(props) {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const { window } = props;
  const drawerWidth = 240;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const dispatch = useDispatch();

  return (
    <Box
      component="div"
      sx={{
        width: { xs: "40%", sm: drawerWidth },
        flexShrink: { sm: 0 },
        boxShadow: "0 -12px 12px #ccc",
        maxHeight: `calc(100vh - ${container}px)`,
        overflowY: "scroll",
      }}
      aria-label="mailbox folders"
    >
      <Stack
        sx={{ margin: { xs: "14px 6px 14px 6px", sm: "16px 14px 16px 14px" } }}
      >
        <Typography
          variant="h5"
          px="16px"
          sx={{ fontWeight: 600, fontSize: { xs: "18px", sm: "20px" } }}
        >
          Welcome
        </Typography>
        <Typography
          variant="body1"
          px="16px"
          sx={{
            textTransform: "capitalize",
            fontStyle: "italic",
            fontSize: { xs: "12px", sm: "16px" },
          }}
        >
          {isLoggedIn ? `${user.firstName} ${user.lastName}` : "User"}
        </Typography>
      </Stack>
      <Divider variant="middle" />
      <SideBarNav
        sx={{ margin: { xs: "14px 6px 12px 6px", sm: "16px 14px 14px 14px" } }}
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "12px", sm: "14px" },
              letterSpacing: "1px",
              marginBottom: "6px",
            }}
          >
            Dashboard
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/dashboard"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <HomeSharpIcon />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              primaryTypographyProps={{ fontSize: 12, fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
      </SideBarNav>
      <Divider variant="middle" />
      {isLoggedIn && user.role === "admin" && <AdminSideBarNavOption />}
      {isLoggedIn && user.role === "trainer" && <TrainerSideBarNavOption />}
      {isLoggedIn && user.role === "trainee" && <TraineeSideBarNavOption />}

      <Divider variant="middle" />
      <SideBarNav
        sx={{ margin: { xs: "14px 6px 12px 6px", sm: "16px 14px 14px 14px" } }}
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "12px", sm: "14px" },
              letterSpacing: "1px",
              marginBottom: "6px",
            }}
          >
            Account
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/profile"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              primaryTypographyProps={{
                fontSize: 12,
                fontWeight: "medium",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Button}
            onClick={() => {
              dispatch(logoutUser());
              navigate("/sign-in");
            }}
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                fontSize: 12,
                fontWeight: "medium",
                textTransform: "none",
              }}
            />
          </ListItemButton>
        </ListItem>
      </SideBarNav>
    </Box>
  );
}

export default SideBar;
