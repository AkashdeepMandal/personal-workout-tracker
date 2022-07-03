import React from "react";
import { SideBarNav } from "../styles/navList";
import { Link as NavLink } from "react-router-dom";

import {
  Divider,
  ListItemIcon,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import GroupIcon from "@mui/icons-material/Group";
import PreviewIcon from "@mui/icons-material/Preview";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminSideBarNavOptions() {
  return (
    <>
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
            Users
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/create-user"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText
              primary="Create User"
              primaryTypographyProps={{ fontSize: 12, fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/view-user"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText
              primary="View Users"
              primaryTypographyProps={{ fontSize: 12, fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/view-user"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <EditSharpIcon />
            </ListItemIcon>
            <ListItemText
              primary="Edit Users"
              primaryTypographyProps={{ fontSize: 12, fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/view-user"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <PersonRemoveIcon />
            </ListItemIcon>
            <ListItemText
              primary="Delete Users"
              primaryTypographyProps={{ fontSize: 12, fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
      </SideBarNav>
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
            Workouts
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/create-workout"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText
              primary="Create Workout"
              primaryTypographyProps={{ fontSize: 12, fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/view-workout"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <PreviewIcon />
            </ListItemIcon>
            <ListItemText
              primary="View Workouts"
              primaryTypographyProps={{ fontSize: 12, fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/view-workout"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <EditSharpIcon />
            </ListItemIcon>
            <ListItemText
              primary="Edit Workouts"
              primaryTypographyProps={{ fontSize: 12, fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/view-workout"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText
              primary="Delete Workout"
              primaryTypographyProps={{ fontSize: 12, fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
      </SideBarNav>
    </>
  );
}

export default AdminSideBarNavOptions;
