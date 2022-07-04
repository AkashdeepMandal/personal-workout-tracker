import React from "react";
import {Settings} from '@mui/icons-material';
import "./topbar.scss"

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topleft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconsContainer">
            <Settings/>
          </div>
        </div>
      </div>
    </div>
  );
}


