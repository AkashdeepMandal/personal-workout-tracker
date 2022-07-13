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
import AssessmentIcon from "@mui/icons-material/Assessment";

function TraineeSideBarNavOptions() {
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
            Workout
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/trainee/start-workouts"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <FitnessCenterIcon />
            </ListItemIcon>
            <ListItemText
              primary="Start Workout"
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
            to="/trainee/report"
            sx={{ py: 0, minHeight: 32 }}
          >
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText
              primary="Report"
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

export default TraineeSideBarNavOptions;
