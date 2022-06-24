import { Fragment, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/userSlice";
import AvatarLogo from "../../components/avatar/avatar.component";
import "./navbar.style.scss";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, data } = useSelector((state) => state.user);
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    if (dropdownToggle) setDropdownToggle(false);
    else setDropdownToggle(true);
  };

  return (
    <Fragment>
      <div className="navigation">
        <div className="nav-links-container">
          <Link className="logo-container" to="/">
            Personal Workout Tracker
          </Link>
          {/* <Link className="nav-link" to="/trainer">
            Trainer
          </Link>
          <Link className="nav-link" to="/workout">
            Workout
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link> */}
        </div>
        <div className="auth-links-container">
          {isLoggedIn ? (
            <div className="avatar">
              <AvatarLogo onClick={toggleDropdown} />
              {dropdownToggle ? (
                <div className="dropdown-menu">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                  <Link className="nav-link" to="/my-account">
                    My Account
                  </Link>
                  <span
                    className="nav-link"
                    onClick={() => {
                      dispatch(logoutUser(data.authToken));
                      setDropdownToggle(false);
                      navigate("/");
                    }}
                  >
                    Sign Out
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div>
              <Link className="nav-link sign-in" to="/sign-in">
                Sign In
              </Link>
              <Link className="nav-link register" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navbar;
