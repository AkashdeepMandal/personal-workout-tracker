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
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PreviewIcon from "@mui/icons-material/Preview";
import AssessmentIcon from "@mui/icons-material/Assessment";

function TraineeSideBarNavOptions() {
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
            Workout
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/view-plans"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <FitnessCenterIcon />
            </ListItemIcon>
            <ListItemText
              primary="Start Workout"
              primaryTypographyProps={{ fontSize: 12, fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/user/view-Plans"
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
            to="/user/report"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText
              primary="Report"
              primaryTypographyProps={{ fontSize: 12, fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
      </SideBarNav>
    </>
  );
}

export default TraineeSideBarNavOptions;
