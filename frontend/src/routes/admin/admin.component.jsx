import React from "react";
import Topbar from "../../components/topbar/topbar.component";
import Sidebar from "../../components/sidebar/sidebar.component";
import User from "../../components/user/user.component";
import NewUser from "../../components/newUser/newUser.component";

function Admin() {
  return (
    <div className="admin">
      <Topbar/>
      <Sidebar/>
      <User/>
      <NewUser/>
    </div>
  );
}

export default Admin;