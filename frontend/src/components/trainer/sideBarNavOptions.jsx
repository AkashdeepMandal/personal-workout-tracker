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
import AddBoxIcon from "@mui/icons-material/AddBox";
import GroupIcon from "@mui/icons-material/Group";
import DeleteIcon from "@mui/icons-material/Delete";

function TrainerSideBarNavOptions() {
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
            Actions
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/view-users"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText
              primary="View Trainee"
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
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText
              primary="Assign Plan"
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
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText
              primary="Remove Plan"
              primaryTypographyProps={{ fontSize: 12, fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
      </SideBarNav>
    </>
  );
}

export default TrainerSideBarNavOptions;
