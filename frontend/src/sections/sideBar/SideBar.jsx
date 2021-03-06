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
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

// custom imports
import { SideBarNav } from "../../components/styles/navList";
import AdminSideBarNavOptions from "../../components/sidebar-option/AdminSideBarNavOptions";
import TrainerSideBarNavOptions from "../../components/sidebar-option/TrainerSideBarNavOptions";
import TraineeSideBarNavOptions from "../../components/sidebar-option/TraineeSideBarNavOptions";

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
        width: { sm: "60px", md: drawerWidth },
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
          sx={{
            fontWeight: 600,
            fontSize: { xs: "18px", sm: "20px" },
            display: { xs: "none", md: "block" },
          }}
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
            display: { xs: "none", md: "block" },
          }}
        >
          {isLoggedIn ? `${user.firstName} ${user.lastName}` : "User"}
        </Typography>
      </Stack>
      <Divider variant="middle" sx={{ display: { xs: "none", md: "block" } }} />
      <SideBarNav
        sx={{ margin: { xs: "14px 6px 12px 6px", md: "16px 14px 14px 14px" } }}
      >
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/dashboard"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                fontSize: 12,
                fontWeight: "medium",
                display: { xs: "none", md: "block" },
              }}
            />
          </ListItemButton>
        </ListItem>
      </SideBarNav>
      <Divider variant="middle" />
      {isLoggedIn && user.role === "admin" && <AdminSideBarNavOptions />}
      {isLoggedIn && user.role === "trainer" && <TrainerSideBarNavOptions />}
      {isLoggedIn && user.role === "trainee" && <TraineeSideBarNavOptions />}

      <Divider variant="middle" />
      <SideBarNav
        sx={{ margin: { xs: "14px 6px 12px 6px", md: "16px 14px 14px 14px" } }}
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "12px", md: "14px" },
              letterSpacing: "1px",
              marginBottom: "6px",
              display: { xs: "none", md: "block" },
            }}
          >
            Account
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/profile"
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
                display: { xs: "none", md: "block" },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Button}
            onClick={() => {
              dispatch(logoutUser(user.authToken));
              navigate("/", { replace: true });
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
                display: { xs: "none", md: "block" },
              }}
            />
          </ListItemButton>
        </ListItem>
      </SideBarNav>
    </Box>
  );
}

export default SideBar;
