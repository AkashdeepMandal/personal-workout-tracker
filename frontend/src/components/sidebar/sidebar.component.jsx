import "./sidebar.scss";
import {
  LineStyle,
  PermIdentity,
  AddCircleOutline,
  EditOffOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
               Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/newUser" className="link">
              <li className="sidebarListItem">
                <AddCircleOutline className="sidebarIcon" />
                Create
              </li>
            </Link>
            <Link to="/editusers" className="link">
              <li className="sidebarListItem">
                <EditOffOutlined className="sidebarIcon" />
                Edit
              </li>
            </Link>
            <Link to="/deleteusers" className="link">
              <li className="sidebarListItem">
                <DeleteOutlineOutlined className="sidebarIcon" />
                Delete 
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
