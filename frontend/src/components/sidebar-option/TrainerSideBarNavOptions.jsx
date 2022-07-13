import React from "react";
import { SideBarNav } from "../styles/navList";
import { Link as NavLink } from "react-router-dom";

import {
  ListItemIcon,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import GroupIcon from "@mui/icons-material/Group";
import DeleteIcon from "@mui/icons-material/Delete";

function TrainerSideBarNavOptions() {
  return (
    <>
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
            Actions
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/trainer/view-trainee"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText
              primary="View Trainee"
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
            component={NavLink}
            to="/trainer/assign-workout"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText
              primary="Assign Workout"
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
            component={NavLink}
            to="/trainer/remove-workout"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText
              primary="Remove Workout"
              primaryTypographyProps={{
                fontSize: 12,
                fontWeight: "medium",
                display: { xs: "none", md: "block" },
              }}
            />
          </ListItemButton>
        </ListItem>
      </SideBarNav>
    </>
  );
}

export default TrainerSideBarNavOptions;
